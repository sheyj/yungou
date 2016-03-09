package com.yungou.o2o.process.common.scheduling.model;

import java.io.Serializable;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.LinkedList;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.yungou.o2o.process.common.scheduling.constant.LjobConstant;

/**
 * 定时任务心跳
 */
public class LjobHeartbeat implements Serializable
{
    private static final long serialVersionUID = -4447327129251463715L;

    private static final Logger LOG = LoggerFactory.getLogger(LjobHeartbeat.class);
    
    private DateFormat dateTimeFormat = new SimpleDateFormat("yyyyMMddHHmmss");
    
    private DateFormat dateTimeShowFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

    /**
     * 定时任务IP
     */
    private String ip = null;
    
    /**
     * 定时任务所有项目
     */
    private String projectName = null;
    
    /**
     * 定时任务名
     */
    private String jobName = null;
    
    /**
     * 心跳发送时间
     */
    private String sendTime = null;
    
    /**
     * 是否启动
     */
    private boolean isStartup = false;
    
    /**
     * 启动发送时间
     */
    private String startupSendTime = null;
    
    /**
     * 是否分布式
     */
    private boolean isDistributed = false;
    
    /**
     * 定时任务执行计划
     */
    private String jobCronExpression = null;
    
    /**
     * 是否支持即时执行请求
     */
    private boolean isSupportInstantRunReq = false;
    
    /**
     * 定时任务执行日志
     * 只记录最近5次定时任务
     */
    private LinkedList<LjobRunHistory> ljobRunHistorys = null;
    
    /**
     * 第一次接收到的心跳时间
     */
    private String firstSendTime = null;
    
    /**
     * 是否支持远程关闭定时任务
     */
    private boolean isSupportCloseJob = false;
    
    /**
     * 定时任务功能描述
     */
    private String description = null;

    public String getIp()
    {
        return ip;
    }

    public void setIp(String ip)
    {
        this.ip = ip;
    }

    public String getProjectName()
    {
        return projectName;
    }

    public void setProjectName(String projectName)
    {
        this.projectName = projectName;
    }

    public String getJobName()
    {
        return jobName;
    }

    public void setJobName(String jobName)
    {
        this.jobName = jobName;
    }
    
    public String getSendTime()
    {
        return sendTime;
    }
    
    public void setSendTime(String sendTime)
    {
        this.sendTime = sendTime;
    }

    /**
     * 设置心跳发送时间
     */
    public void setSendTime()
    {
        this.sendTime = dateTimeFormat.format(new Date());
    }

    public boolean isStartup()
    {
        return isStartup;
    }

    public void setStartup(boolean isStartup)
    {
        this.isStartup = isStartup;
    }
    
    public String getStartupSendTime()
    {
        return startupSendTime;
    }

    public void setStartupSendTime(String startupSendTime)
    {
        this.startupSendTime = startupSendTime;
    }

    public boolean isDistributed()
    {
        return isDistributed;
    }

    public void setDistributed(boolean isDistributed)
    {
        this.isDistributed = isDistributed;
    }
    
    public String getJobCronExpression()
    {
        return jobCronExpression;
    }

    public void setJobCronExpression(String jobCronExpression)
    {
        this.jobCronExpression = jobCronExpression;
    }

    public boolean isSupportInstantRunReq()
    {
        return isSupportInstantRunReq;
    }

    public void setSupportInstantRunReq(boolean isSupportInstantRunReq)
    {
        this.isSupportInstantRunReq = isSupportInstantRunReq;
    }

    public String getSendTimeShow()
    {
        Date sendTime = null;
        
        try
        {
            sendTime = dateTimeFormat.parse(this.sendTime);
            return dateTimeShowFormat.format(sendTime);
        }
        catch (Exception e)
        {
            return null;
        }
    }

    public LinkedList<LjobRunHistory> getLjobRunHistorys()
    {
        return ljobRunHistorys;
    }

    public void setLjobRunHistorys(LinkedList<LjobRunHistory> ljobRunHistorys)
    {
        this.ljobRunHistorys = ljobRunHistorys;
    }

    public String getFirstSendTime()
    {
        return firstSendTime;
    }

    public void setFirstSendTime(String firstSendTime)
    {
        this.firstSendTime = firstSendTime;
    }

    public boolean isSupportCloseJob()
    {
        return isSupportCloseJob;
    }

    public void setSupportCloseJob(boolean isSupportCloseJob)
    {
        this.isSupportCloseJob = isSupportCloseJob;
    }

    public String getDescription()
    {
        return description;
    }

    public void setDescription(String description)
    {
        this.description = description;
    }

    @Override
    public String toString()
    {
        return "LjobHeartbeat [ip=" + ip + ", projectName=" + projectName + ", jobName=" + jobName + ", sendTime=" + sendTime
                + ", isStartup=" + isStartup + ", startupSendTime=" + startupSendTime + ", isDistributed=" + isDistributed
                + ", jobCronExpression=" + jobCronExpression + ", isSupportInstantRunReq=" + isSupportInstantRunReq + ", ljobRunHistorys="
                + ljobRunHistorys + ", firstSendTime=" + firstSendTime + ", isSupportCloseJob=" + isSupportCloseJob + ", description="
                + description + "]";
    }

    /**
     * 启动时间是否已经超时
     * @return boolean
     */
    public boolean isStartupTimeout(String ljobServerTime)
    {
        if (null == this.startupSendTime)
        {
            return true;
        }
        
        Long startupSendTimeInteger = null;
        Long currentTimeInteger = null;
        
        try
        {
            dateTimeFormat.parse(this.startupSendTime);
            dateTimeFormat.parse(ljobServerTime);
            startupSendTimeInteger = Long.valueOf(this.startupSendTime);
            currentTimeInteger = Long.valueOf(ljobServerTime);
        }
        catch (Exception e)
        {
            LOG.error(e.toString());
            return false;
        }
        
        if (currentTimeInteger - startupSendTimeInteger > LjobConstant.STARTUP_VALIDATE_SECONDS)
        {
            return true;
        }
        
        return false;
    }

    /**
     * 校验当前心跳是否有效，超过120秒的心跳则不算有效心跳
     * @return boolean
     */
    public boolean isValideHeartbeat(String ljobServerTime)
    {
        if (null == this.sendTime)
        {
            return false;
        }
        
        Long sendTimeInteger = null;
        Long currentTimeInteger = null;
        
        try
        {
            dateTimeFormat.parse(this.sendTime);
            dateTimeFormat.parse(ljobServerTime);
            sendTimeInteger = Long.valueOf(this.sendTime);
            currentTimeInteger = Long.valueOf(ljobServerTime);
        }
        catch (Exception e)
        {
            LOG.error(e.toString());
            return false;
        }
        
        if (currentTimeInteger - sendTimeInteger > LjobConstant.HEARTBEAT_VALIDATE_SECONDS)
        {
            return false;
        }
        
        return true;
    }
    
    /**
     * 校验接收到的心跳是否已经超时
     * @param ljobServerTime
     * @return boolean
     */
    public boolean isFirstHeartbeatTimeout(String ljobServerTime)
    {
        if (null == this.firstSendTime)
        {
            return false;
        }
        
        Long sendTimeInteger = null;
        Long currentTimeInteger = null;
        
        try
        {
            dateTimeFormat.parse(this.firstSendTime);
            dateTimeFormat.parse(ljobServerTime);
            sendTimeInteger = Long.valueOf(this.firstSendTime);
            currentTimeInteger = Long.valueOf(ljobServerTime);
        }
        catch (Exception e)
        {
            LOG.error(e.toString());
            return false;
        }
        
        if (currentTimeInteger - sendTimeInteger > LjobConstant.FIRST_HEARTBEAT_TIMEOUT_SECONDS)
        {
            return true;
        }
        
        return false;
    }
}
