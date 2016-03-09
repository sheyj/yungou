package com.yungou.o2o.tools.common.db.interceptor;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.Locale;
import java.util.Map.Entry;
import java.util.Properties;

import org.apache.commons.jxpath.JXPathContext;
import org.apache.ibatis.executor.Executor;
import org.apache.ibatis.mapping.BoundSql;
import org.apache.ibatis.mapping.MappedStatement;
import org.apache.ibatis.mapping.MappedStatement.Builder;
import org.apache.ibatis.mapping.ParameterMapping;
import org.apache.ibatis.mapping.SqlSource;
import org.apache.ibatis.plugin.Interceptor;
import org.apache.ibatis.plugin.Intercepts;
import org.apache.ibatis.plugin.Invocation;
import org.apache.ibatis.plugin.Plugin;
import org.apache.ibatis.plugin.Signature;
import org.apache.ibatis.scripting.defaults.DefaultParameterHandler;
import org.apache.ibatis.session.ResultHandler;
import org.apache.ibatis.session.RowBounds;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * ibatis查询SQL分页拦截器
 * 用于计算查询总数和查询分页
 **/
@Intercepts({@Signature(type = Executor.class, method = "query", args = {MappedStatement.class, Object.class, RowBounds.class, ResultHandler.class})})
public class PageInterceptor implements Interceptor
{
    private static final Logger LOG = LoggerFactory.getLogger(PageInterceptor.class);
    
    /**
     * @category 拦截器处理
     */
    @Override
    public Object intercept(Invocation invocation) throws Throwable
    {
        // 当前环境 MappedStatement，BoundSql，及sql取得
        MappedStatement mappedStatement = (MappedStatement) invocation.getArgs()[0];
        Object parameter = invocation.getArgs()[1];
        BoundSql boundSql = mappedStatement.getBoundSql(parameter);
        Object parameterObject = boundSql.getParameterObject();
        
        // Page对象获取，“信使”到达拦截器！
        Page page = searchPageWithXpath(parameterObject, ".", "page", "*/page");
        
        if (page != null)
        {
            int totalRecords = page.getTotalRecord();
            String originalSql = boundSql.getSql().trim();
            if (totalRecords <= 0)
            {
                // Page对象存在的场合，开始分页处理
                String countSql = getCountSql(originalSql, page);
                LOG.debug("分页查询计算总数语句: " + countSql);
                
                Connection connection = null;
                PreparedStatement countStmt = null;
                BoundSql countBS = null;
                DefaultParameterHandler parameterHandler = null;
                ResultSet rs = null;
                try
                {
                    connection = mappedStatement.getConfiguration().getEnvironment().getDataSource().getConnection();
                    countStmt = connection.prepareStatement(countSql);
                    countBS = copyFromBoundSql(mappedStatement, boundSql, countSql);
                    parameterHandler = new DefaultParameterHandler(mappedStatement, parameterObject, countBS);
                    parameterHandler.setParameters(countStmt);
                    rs = countStmt.executeQuery();
                    if (rs.next())
                    {
                        totalRecords = rs.getInt(1);
                    }
                }
                catch (Exception e)
                {
                    LOG.error(e.toString(), e);
                    throw e;
                }
                finally
                {
                    if (rs != null)
                    {
                        try
                        {
                            rs.close();
                        }
                        catch (Exception e)
                        {
                            LOG.error(e.toString(), e);
                        }
                    }
                    if (countStmt != null)
                    {
                        try
                        {
                            countStmt.close();
                        }
                        catch (Exception e)
                        {
                            LOG.error(e.toString(), e);
                        }
                    }
                    if (connection != null)
                    {
                        try
                        {
                            connection.close();
                        }
                        catch (Exception e)
                        {
                            LOG.error(e.toString(), e);
                        }
                    }
                }
            }
            
            if (totalRecords <= 0)
            {
                return new ArrayList<Object>();
            }
            
            // 分页计算
            page.setTotalRecord(totalRecords);
            
            // 对原始Sql追加limit
            int offset = (page.getPageNo() - 1) * page.getPageSize();
            StringBuffer sb = new StringBuffer();
            sb.append(originalSql);
            if (null != page.getOrderMap())
            {
                // 有排序
                sb.append(" order by ");
                String key = null;
                String value = null;
                
                // 遍历Map
                for (Entry<String, String> entryMap : page.getOrderMap().entrySet())
                {
                    key = entryMap.getKey();
                    value = entryMap.getValue();
                    sb.append(key + " " + value + ",");
                }
                sb.deleteCharAt(sb.lastIndexOf(","));
            }
            sb.append(" limit ").append(offset).append(",").append(page.getPageSize());
            BoundSql newBoundSql = copyFromBoundSql(mappedStatement, boundSql, sb.toString());
            LOG.debug("分页查询语句: " + sb.toString());
            MappedStatement newMs = copyFromMappedStatement(mappedStatement, new BoundSqlSqlSource(newBoundSql));
            invocation.getArgs()[0] = newMs;
        }
        
        return invocation.proceed();
    }
    
    /**
     * @category 根据给定的xpath查询Page对象
     */
    private Page searchPageWithXpath(Object o, String... xpaths)
    {
        JXPathContext context = JXPathContext.newContext(o);
        Object result;
        for (String xpath : xpaths)
        {
            try
            {
                result = context.selectSingleNode(xpath);
            }
            catch (Exception e)
            {
                continue;
            }
            
            if (result instanceof Page)
            {
                return (Page) result;
            }
        }
        return null;
    }
    
    /**
     * @category 复制MappedStatement对象
     */
    private MappedStatement copyFromMappedStatement(MappedStatement ms, SqlSource newSqlSource)
    {
        Builder builder = new Builder(ms.getConfiguration(), ms.getId(), newSqlSource, ms.getSqlCommandType());
        
        builder.resource(ms.getResource());
        builder.fetchSize(ms.getFetchSize());
        builder.statementType(ms.getStatementType());
        builder.keyGenerator(ms.getKeyGenerator());
        // Mybatis3.0版本不同而是直接getKeyProperty
        String[] s = ms.getKeyProperties();
        if (s == null)
        {
            builder.keyProperty(null);
        }
        else
        {
            builder.keyProperty(s[0]);
        }
        builder.timeout(ms.getTimeout());
        builder.parameterMap(ms.getParameterMap());
        builder.resultMaps(ms.getResultMaps());
        builder.resultSetType(ms.getResultSetType());
        builder.cache(ms.getCache());
        builder.flushCacheRequired(ms.isFlushCacheRequired());
        builder.useCache(ms.isUseCache());
        
        return builder.build();
    }
    
    /**
     * @category 复制BoundSql对象
     */
    private BoundSql copyFromBoundSql(MappedStatement ms, BoundSql boundSql, String sql)
    {
        BoundSql newBoundSql = new BoundSql(ms.getConfiguration(), sql, boundSql.getParameterMappings(), boundSql.getParameterObject());
        String prop = null;
        
        for (ParameterMapping mapping : boundSql.getParameterMappings())
        {
            prop = mapping.getProperty();
            if (boundSql.hasAdditionalParameter(prop))
            {
                newBoundSql.setAdditionalParameter(prop, boundSql.getAdditionalParameter(prop));
            }
        }
        return newBoundSql;
    }
    
    /**
     * @category 根据原Sql语句获取对应的查询总记录数的Sql语句
     */
    private static String getCountSql(String sql, Page page)
    {
        String primaryKey = page.getPrimaryKey();
        String tmpSql = null;
        
        if (null != sql)
        {
            tmpSql = sql.toUpperCase(Locale.getDefault());
        }
        
        int index = tmpSql.indexOf("ORDER ");
        if (index != -1)
        {
            String tmp = tmpSql.substring(index + 6).trim();
            if (tmp.startsWith("BY"))
            {
                return "SELECT COUNT(*) FROM (" + sql + ") t";
            }
        }
        
        index = tmpSql.indexOf("GROUP ");
        if (index != -1)
        {
            String tmp = tmpSql.substring(index + 6).trim();
            if (tmp.startsWith("BY"))
            {
                return "SELECT COUNT(*) FROM (" + sql + ") t";
            }
        }
        
        index = tmpSql.indexOf("DISTINCT");
        if (index != -1)
        {
            return "SELECT COUNT(*) FROM (" + sql + ") t";
        }
        
        index = tmpSql.indexOf("FROM");
        int lastIndex = tmpSql.lastIndexOf("FROM");
        if (index != lastIndex)
        {
            return "SELECT COUNT(*) FROM (" + sql + ") t";
        }
        
        if (null != primaryKey && !"".equals(primaryKey.trim()))
        {
            return "SELECT COUNT(" + primaryKey + ") " + sql.substring(index);
        }
        
        return "SELECT COUNT(*) " + sql.substring(index);
    }
    
    public class BoundSqlSqlSource implements SqlSource
    {
        BoundSql boundSql;
        
        public BoundSqlSqlSource(BoundSql boundSql)
        {
            this.boundSql = boundSql;
        }
        
        @Override
        public BoundSql getBoundSql(Object parameterObject)
        {
            return boundSql;
        }
    }
    
    @Override
    public Object plugin(Object arg0)
    {
        return Plugin.wrap(arg0, this);
    }
    
    @Override
    public void setProperties(Properties props)
    {
        // Nothing
    }
    
    public static void main(String[] args)
    {
        String sql = "select memberId,asdf,asdf,asdf,group_concat()   from t where `register_type` = '02' group by a";
        Page page = new Page();
        //page.setPrimaryKey("m.id");
        String test = getCountSql(sql, page);
        System.out.println(test);
    }
}