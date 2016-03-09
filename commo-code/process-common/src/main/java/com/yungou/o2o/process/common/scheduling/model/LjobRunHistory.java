package com.yungou.o2o.process.common.scheduling.model;

import java.io.Serializable;

/**
 * 定时任务执行历史
 * @author lin.zb
 */
public class LjobRunHistory implements Serializable
{
    private static final long serialVersionUID = 1105106751599836402L;

    /**
     * 开始时间
     */
    private String startTime = null;
    
    /**
     * 结束时间
     */
    private String endTime = null;

    public String getStartTime()
    {
        return startTime;
    }

    public void setStartTime(String startTime)
    {
        this.startTime = startTime;
    }

    public String getEndTime()
    {
        return endTime;
    }

    public void setEndTime(String endTime)
    {
        this.endTime = endTime;
    }
    
    public LjobRunHistory()
    {
        
    }
    
    public LjobRunHistory(String startTime, String endTime)
    {
        this.startTime = startTime;
        this.endTime = endTime;
    }

    @Override
    public String toString()
    {
        return "LjobRunHistory [startTime=" + startTime + ", endTime=" + endTime + "]";
    }
}
