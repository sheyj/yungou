package cn.wonhigh.o2o.hbase.common.logback.appender;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;

import ch.qos.logback.classic.spi.ILoggingEvent;
import ch.qos.logback.core.UnsynchronizedAppenderBase;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.hbase.HColumnDescriptor;
import org.apache.hadoop.hbase.HTableDescriptor;
import org.apache.hadoop.hbase.TableName;
import org.apache.hadoop.hbase.client.HBaseAdmin;
import org.apache.hadoop.hbase.client.HTableInterface;
import org.apache.hadoop.hbase.client.Put;
import org.apache.hadoop.hbase.util.Bytes;
import org.springframework.data.hadoop.hbase.HbaseTemplate;
import org.springframework.data.hadoop.hbase.TableCallback;

import cn.wonhigh.o2o.hbase.common.logback.entity.HbaseLog;
import cn.wonhigh.o2o.hbase.common.util.HBaseConfiguration;

import com.alibaba.fastjson.JSON;

/**
 * Hbase logback appender
 * @author lin.zb
 */
@SuppressWarnings("deprecation")
public class HbaseAppender extends UnsynchronizedAppenderBase<ILoggingEvent>
{
	private static final SimpleDateFormat DATE_FORMAT = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss SSS");
	
	/**
	 * hbase log table
	 */
	private String hbaseTable;
	
	/**
	 * hbase log table family
	 */
	private String hbaseFamily;
	
	private static TableName HBASE_NAME;
	
	private static byte[] HBASE_FRAMILY;
	
	/**
	 * hbase configuration
	 */
	private Configuration configuration;
	
	private HbaseTemplate hbaseTemplate;
	
	private boolean isAutoCreateTable = false;
	
	private Random random = new Random();
	
	private String hbaseSiteFilePath;
	
	/**
	 * 重新启动的时间戳间隔，单位：毫秒
	 */
	private long reinitTime = 10000;
	
	/**
	 * 上一次启动失败的时间戳
	 */
	private long lastFailedTime = 0;
	
	/**
	 * 生成日志内容数据
	 * @param event ILoggingEvent
	 * @return String
	 */
	protected String generatedValue(ILoggingEvent event)
	{
		HbaseLog hbaseLog = new HbaseLog();
		hbaseLog.setLogLevel(event.getLevel().levelStr);
		hbaseLog.setLogTime(DATE_FORMAT.format(new Date(event.getTimeStamp())));
		hbaseLog.setLogThread(event.getThreadName());
		hbaseLog.setLogger(event.getLoggerName());
		hbaseLog.setLogInfo(event.getFormattedMessage());
		return JSON.toJSONString(hbaseLog);
	}
	
	/**
	 * 存储日志
	 * @param eventObject ILoggingEvent
	 */
	@Override
	protected void append(ILoggingEvent event)
	{
		if (!isStarted())
		{
			reinit();
		}
		
		if (!isStarted())
		{
			System.err.println("写入Hbase日志失败，HbaseAppender未能正常启动");
			return;
		}
		
		final String logLevel = event.getLevel().levelStr;
		
		// 使用3次单位随机数防止同时间同key覆盖问题
		final byte[] bKey = Bytes.toBytes(event.getTimeStamp() + "_" + random.nextInt(9) + random.nextInt(9) + random.nextInt(9));
	    final byte[] bValue = Bytes.toBytes(generatedValue(event));

	    try
	    {
	    	// 保存到hbase
			hbaseTemplate.execute(HBASE_NAME.getNameAsString(), new TableCallback<Object>()
			{
                public Object doInTable(HTableInterface table) throws Throwable
                {
                    Put p = new Put(bKey);
                    p.addColumn(HBASE_FRAMILY, Bytes.toBytes(logLevel), bValue);
                    table.put(p);
                    return null;
                }
				
			});
	    }
	    catch (Exception e)
	    {
	    	System.err.println("写入Hbase日志异常：" + e.toString());
	    }
	}
	
	/**
	 * 重新初始化HbaseApender
	 */
	public synchronized void reinit()
	{
		if (System.currentTimeMillis() - lastFailedTime > reinitTime)
		{
			start();
		}
	}
	
	/**
	 * 初始化HbaseApender
	 */
	@Override
	public void start()
	{
		System.out.println("初始化HbaseAppender...");
		
		// 读取hbase-site.xml，初始化hbase配置
		configuration = HBaseConfiguration.create(hbaseSiteFilePath);
		
		hbaseTemplate = new HbaseTemplate(configuration);
		HBASE_NAME = TableName.valueOf(hbaseTable);
		HBASE_FRAMILY = Bytes.toBytes(hbaseFamily);
		
		System.out.println("正在启动HbaseAppender...");
		
		// 检查数据库表是否存在
		HBaseAdmin admin = null;
		try
		{
			admin = new HBaseAdmin(hbaseTemplate.getConfiguration());
			if (!admin.tableExists(HBASE_NAME))
			{
				if (isAutoCreateTable)
				{
					System.out.println("创建Hbase日志表, 表名: " + hbaseTable + ", 列族: " + hbaseFamily);
					HTableDescriptor tableDescriptor = new HTableDescriptor(HBASE_NAME);
					HColumnDescriptor columnDescriptor = new HColumnDescriptor(HBASE_FRAMILY);
					tableDescriptor.addFamily(columnDescriptor);
					admin.createTable(tableDescriptor);
					super.start();
				}
				else
				{
					System.err.println("Hbase日志表不存在, 表名: " + hbaseTable + ", 列族: " + hbaseFamily);
					lastFailedTime = System.currentTimeMillis();
				}
			}
			else
			{
				super.start();
			}
		}
		catch (Exception e)
		{
			System.err.println("检查Hbase日志表异常, 表名: " + hbaseTable + ", 列族: " + hbaseFamily);
			e.printStackTrace();
			lastFailedTime = System.currentTimeMillis();
		}
		finally
		{
			if (null != admin)
			{
				try
				{
					admin.close();
				}
				catch (IOException e)
				{
					e.printStackTrace();
				}
			}
		}
		
		if (isStarted())
		{
			System.out.println("启动HbaseAppender成功...");
		}
		else
		{
			System.err.println("启动HbaseAppender失败...");
			lastFailedTime = System.currentTimeMillis();
		}
	}
	
	@Override
	public void stop()
	{
		super.stop();
	}

	public void setHbaseTable(String hbaseTable)
	{
		this.hbaseTable = hbaseTable;
	}

	public void setHbaseFamily(String hbaseFamily)
	{
		this.hbaseFamily = hbaseFamily;
	}

	public void setAutoCreateTable(String isAutoCreateTable)
	{
		if ("true".equals(isAutoCreateTable))
		{
			this.isAutoCreateTable = true;
		}
	}

	public void setHbaseSiteFilePath(String hbaseSiteFilePath)
	{
		this.hbaseSiteFilePath = hbaseSiteFilePath;
	}
}
