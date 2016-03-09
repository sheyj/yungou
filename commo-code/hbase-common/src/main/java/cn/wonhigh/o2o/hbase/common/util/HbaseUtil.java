package cn.wonhigh.o2o.hbase.common.util;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.hbase.TableName;
import org.springframework.data.hadoop.hbase.HbaseTemplate;

/**
 * HbaseUtil
 * @author lin.zb
 */
public class HbaseUtil
{
	private static ThreadLocal<HbaseTemplate> threadLocal = new ThreadLocal<HbaseTemplate>();
	
    private static TableName nginxLogTable = null;
    
    private static TableName businessLogTable = null;
    
    private static String nginxLogTableName = null;
    
    private static String bizLogTableName = null;
    
    private Configuration configuration = null;
    
    private String hbaseSiteFilePath = null;
    
    public HbaseTemplate getHbaseTemplate()
    {
    	HbaseTemplate hbaseTemplate = threadLocal.get();
        if (null == hbaseTemplate)
        {
        	configuration = HBaseConfiguration.create(hbaseSiteFilePath);
            hbaseTemplate = new HbaseTemplate(configuration);
            threadLocal.set(hbaseTemplate);
        }
        
        return hbaseTemplate;
    }
    
    public void closeHbaseTemplate()
    {
    	threadLocal.set(null);
    }

    public String getHbaseSiteFilePath()
    {
        return hbaseSiteFilePath;
    }

    public void setHbaseSiteFilePath(String hbaseSiteFilePath)
    {
        this.hbaseSiteFilePath = hbaseSiteFilePath;
    }

    public TableName getNginxLogTableName()
    {
        return nginxLogTable;
    }
    
    public String getNginxLogTableNameString()
    {
        return nginxLogTableName;
    }

    public void setNginxLogTableName(String nginxLogTableName)
    {
        HbaseUtil.nginxLogTableName = nginxLogTableName;
        nginxLogTable = TableName.valueOf(HbaseUtil.nginxLogTableName);
    }

    public TableName getBizLogTableName()
    {
        return businessLogTable;
    }
    
    public String getBizLogTableNameString()
    {
        return bizLogTableName;
    }

    public void setBizLogTableName(String bizLogTableName)
    {
        HbaseUtil.bizLogTableName = bizLogTableName;
        businessLogTable = TableName.valueOf(HbaseUtil.bizLogTableName);
    }
}
