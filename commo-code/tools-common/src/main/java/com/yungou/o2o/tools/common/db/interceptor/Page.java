package com.yungou.o2o.tools.common.db.interceptor;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

import org.codehaus.jackson.map.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.google.common.base.Joiner;
import com.google.common.collect.Lists;
import com.google.common.collect.Maps;

/**
 * @category 封装分页Page
 * @author yiz
 * @date 2014-8-15上午11:28:28
 * @copyright yougou.com
 */
public class Page implements Serializable
{
    private static final long serialVersionUID = -1047116892936418128L;
    private static final Logger logger = LoggerFactory.getLogger(Page.class);
    private static ObjectMapper mapper = new ObjectMapper();
    
    public static String DEFAULT_PAGESIZE = "10";
    private int pageNo; // 当前页码
    private int pageSize; // 每页行数
    private int totalRecord; // 总记录数
    private int totalPage; // 总页数
    private Map<String, String> params; // 查询条件
    private Map<String, List<String>> paramLists; // 数组查询条件
    private String searchUrl; // Url地址
    private String pageNoDisp; // 可以显示的页号(分隔符"|"，总页数变更时更新)
    private List<?> resultData;
    
    /**
     * 主键列
     */
    private String primaryKey;
    
    /**
     * @category 排序Map
     */
    private Map<String, String> orderMap;
    
    /**
     * 排序列
     */
    private String sortBy;
    
    /**
     * 升序asc 降序desc
     */
    private String sortType;
    
    public Page()
    {
        pageNo = 1;
        pageSize = Integer.valueOf(DEFAULT_PAGESIZE);
        totalRecord = 0;
        totalPage = 0;
        params = Maps.newHashMap();
        paramLists = Maps.newHashMap();
        searchUrl = "";
        pageNoDisp = "";
    }
    
    public static Page newBuilder(int pageNo, int pageSize, String url)
    {
        Page page = new Page();
        page.setPageNo(pageNo);
        page.setPageSize(pageSize);
        page.setSearchUrl(url);
        return page;
    }
    
    /**
     * 查询条件转JSON
     */
    public String getParaJson()
    {
        Map<String, Object> map = Maps.newHashMap();
        for (String key : params.keySet())
        {
            if (params.get(key) != null)
            {
                map.put(key, params.get(key));
            }
        }
        String json = "";
        try
        {
            json = mapper.writeValueAsString(map);
        }
        catch (Exception e)
        {
            logger.error("转换JSON失败", params, e);
        }
        return json;
    }
    
    /**
     * 数组查询条件转JSON
     */
    public String getParaListJson()
    {
        Map<String, Object> map = Maps.newHashMap();
        List<String> list = null;
        for (String key : paramLists.keySet())
        {
            list = paramLists.get(key);
            if ((list != null) && (list.size() > 0))
            {
                map.put(key, list);
            }
        }
        String json = "";
        try
        {
            json = mapper.writeValueAsString(map);
        }
        catch (Exception e)
        {
            logger.error("转换JSON失败", params, e);
        }
        return json;
    }
    
    /**
     * 总件数变化时，更新总页数并计算显示样式
     */
    private void refreshPage()
    {
        // 总页数计算
        totalPage = (totalRecord % pageSize) == 0 ? totalRecord / pageSize : ((totalRecord / pageSize) + 1);
        // 防止超出最末页（浏览途中数据被删除的情况）
        if ((pageNo > totalPage) && (totalPage != 0))
        {
            pageNo = totalPage;
        }
        pageNoDisp = computeDisplayStyleAndPage();
    }
    
    /**
     * 计算页号显示样式 这里实现以下的分页样式("[]"代表当前页号)，可根据项目需求调整 &nbsp;&nbsp; *&nbsp;&nbsp;
     * [1],2,3,4,5,6,7,8..12,13 &nbsp;&nbsp; *&nbsp;&nbsp;
     * 1,2..5,6,[7],8,9..12,13 &nbsp;&nbsp; *&nbsp;&nbsp;
     * 1,2..6,7,8,9,10,11,12,[13]
     */
    private String computeDisplayStyleAndPage()
    {
        List<Integer> pageDisplays = Lists.newArrayList();
        if (totalPage <= 11)
        {
            for (int i = 1; i <= totalPage; i++)
            {
                pageDisplays.add(i);
            }
        }
        else if (pageNo < 7)
        {
            for (int i = 1; i <= 8; i++)
            {
                pageDisplays.add(i);
            }
            pageDisplays.add(0);// 0 表示 省略部分(下同)
            pageDisplays.add(totalPage - 1);
            pageDisplays.add(totalPage);
        }
        else if (pageNo > (totalPage - 6))
        {
            pageDisplays.add(1);
            pageDisplays.add(2);
            pageDisplays.add(0);
            for (int i = totalPage - 7; i <= totalPage; i++)
            {
                pageDisplays.add(i);
            }
        }
        else
        {
            pageDisplays.add(1);
            pageDisplays.add(2);
            pageDisplays.add(0);
            for (int i = pageNo - 2; i <= (pageNo + 2); i++)
            {
                pageDisplays.add(i);
            }
            pageDisplays.add(0);
            pageDisplays.add(totalPage - 1);
            pageDisplays.add(totalPage);
        }
        return Joiner.on("|").join(pageDisplays.toArray());
    }
    
    public int getPageNo()
    {
        return pageNo;
    }
    
    public void setPageNo(int pageNo)
    {
        this.pageNo = pageNo;
    }
    
    public int getPageSize()
    {
        return pageSize;
    }
    
    public void setPageSize(int pageSize)
    {
        this.pageSize = pageSize;
    }
    
    public int getTotalRecord()
    {
        return totalRecord;
    }
    
    public void setTotalRecord(int totalRecord)
    {
        this.totalRecord = totalRecord;
        refreshPage();
    }
    
    public int getTotalPage()
    {
        return totalPage;
    }
    
    public void setTotalPage(int totalPage)
    {
        this.totalPage = totalPage;
    }
    
    public Map<String, String> getParams()
    {
        return params;
    }
    
    public void setParams(Map<String, String> params)
    {
        this.params = params;
    }
    
    public Map<String, List<String>> getParamLists()
    {
        return paramLists;
    }
    
    public void setParamLists(Map<String, List<String>> paramLists)
    {
        this.paramLists = paramLists;
    }
    
    public String getSearchUrl()
    {
        return searchUrl;
    }
    
    public void setSearchUrl(String searchUrl)
    {
        this.searchUrl = searchUrl;
    }
    
    public String getPageNoDisp()
    {
        return pageNoDisp;
    }
    
    public void setPageNoDisp(String pageNoDisp)
    {
        this.pageNoDisp = pageNoDisp;
    }
    
    public int getStartRec()
    {
        return ((pageNo - 1) * pageSize) + 1;
    }
    
    public List<?> getResultData()
    {
        return resultData;
    }
    
    public void setResultData(List<?> resultData)
    {
        this.resultData = resultData;
    }
    
    /**
     * 主键列
     */
    public String getPrimaryKey()
    {
        return primaryKey;
    }
    
    /**
     * 主键列
     */
    public void setPrimaryKey(String primaryKey)
    {
        this.primaryKey = primaryKey;
    }
    
    /**
     * 排序列
     */
    public String getSortBy()
    {
        return sortBy;
    }
    
    /**
     * 排序列
     */
    public void setSortBy(String sortBy)
    {
        this.sortBy = sortBy;
    }
    
    /**
     * 升序asc 降序desc
     */
    public String getSortType()
    {
        return sortType;
    }
    
    /**
     * 升序asc 降序desc
     */
    public void setSortType(String sortType)
    {
        this.sortType = sortType;
    }
    
    public Map<String, String> getOrderMap()
    {
        return orderMap;
    }
    
    public void setOrderMap(Map<String, String> orderMap)
    {
        this.orderMap = orderMap;
    }
    
    /**
     * 开放给外部使用，使用前要先设置 totalRecord，pageSize，pageNo
     * @author: chen.jb
     * @time:2014-12-3 上午10:19:03
     */
    public void refreshPageCount()
    {
        // 总页数计算
        totalPage = (totalRecord % pageSize) == 0 ? totalRecord / pageSize : ((totalRecord / pageSize) + 1);
        // 防止超出最末页（浏览途中数据被删除的情况）
        if ((pageNo > totalPage) && (totalPage != 0))
        {
            pageNo = totalPage;
        }
        pageNoDisp = computeDisplayStyleAndPage();
    }
    
}