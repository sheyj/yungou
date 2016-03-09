package cn.wonhigh.o2o.hbase.common.logback.entity;

/**
 * Hbase Log Information
 * @author lin.zb
 */
public class HbaseLog
{
	private String logLevel;
		
	private String logTime;
	
	private String logThread;
	
	private String logger;
	
	private String logInfo;

	public String getLogLevel()
	{
		return logLevel;
	}

	public void setLogLevel(String logLevel)
	{
		this.logLevel = logLevel;
	}

	public String getLogTime()
	{
		return logTime;
	}

	public void setLogTime(String logTime)
	{
		this.logTime = logTime;
	}

	public String getLogThread()
	{
		return logThread;
	}

	public void setLogThread(String logThread)
	{
		this.logThread = logThread;
	}

	public String getLogger()
	{
		return logger;
	}

	public void setLogger(String logger)
	{
		this.logger = logger;
	}

	public String getLogInfo()
	{
		return logInfo;
	}

	public void setLogInfo(String logInfo)
	{
		this.logInfo = logInfo;
	}
}
