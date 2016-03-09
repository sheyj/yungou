package com.yungou.o2o.process.common.scheduling.model;

import org.quartz.Trigger;

/**
 * 定时任务
 */
public class Ljob
{
    /**
     * 定时任务名
     */
    private String jobName = null;
    
    /**
     * 定时任务对象
     */
    private Object targetJob = null;
    
    /**
     * 定时任务类
     */
    private Class<?> targetJobClass = null;
    
    /**
     * 定时任务执行方法名
     */
    private String targetJobMethod = null;
    
    /**
     * 定时任务Trigger
     */
    private Trigger targetTrigger = null;
    
    /**
     * 是否分布式
     */
    private boolean isDistributed = false;
    
    /**
     * 是否已经启动
     */
    private boolean isStartup = false;
    
    /**
     * 定时任务执行计划
     */
    private String jobCronExpression = null;
    
    /**
     * 是否支持即时执行请求
     */
    private boolean isSupportInstantRunReq = false;
    
    /**
     * 是否支持远程关闭定时任务
     */
    private boolean isSupportCloseJob = false;
    
    /**
     * 定时任务功能描述
     */
    private String description = null;

    public String getJobName()
    {
        return jobName;
    }

    public void setJobName(String jobName)
    {
        this.jobName = jobName;
    }

    public Object getTargetJob()
    {
        return targetJob;
    }

    public void setTargetJob(Object targetJob)
    {
        this.targetJob = targetJob;
        this.targetJobClass = this.targetJob.getClass();
    }

    public Class<?> getTargetJobClass()
    {
        return targetJobClass;
    }

    public void setTargetJobClass(Class<?> targetJobClass)
    {
        this.targetJobClass = targetJobClass;
    }

    public String getTargetJobMethod()
    {
        return targetJobMethod;
    }

    public void setTargetJobMethod(String targetJobMethod)
    {
        this.targetJobMethod = targetJobMethod;
    }

    public Trigger getTargetTrigger()
    {
        return targetTrigger;
    }

    public void setTargetTrigger(Trigger targetTrigger)
    {
        this.targetTrigger = targetTrigger;
    }

    public boolean isDistributed()
    {
        return isDistributed;
    }

    public void setDistributed(String isDistributed)
    {
        if ("true".equals(isDistributed))
        {
            this.isDistributed = true;
        }
    }

    public boolean isStartup()
    {
        return isStartup;
    }

    public void setStartup(boolean isStartup)
    {
        this.isStartup = isStartup;
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

    public void setSupportInstantRunReq(String isSupportInstantRunReq)
    {
        if ("true".equals(isSupportInstantRunReq))
        {
            this.isSupportInstantRunReq = true;
        }
    }

    public boolean isSupportCloseJob()
    {
        return isSupportCloseJob;
    }

    public void setSupportCloseJob(String isSupportCloseJob)
    {
        if ("true".equals(isSupportCloseJob))
        {
            this.isSupportCloseJob = true;
        }
    }

    public String getDescription()
    {
        return description;
    }

    public void setDescription(String description)
    {
        this.description = description;
    }
}
