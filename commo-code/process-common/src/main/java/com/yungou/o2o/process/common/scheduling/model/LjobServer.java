package com.yungou.o2o.process.common.scheduling.model;

/**
 * 定时任务服务器
 */
public class LjobServer
{
    private String ip = null;
    
    private String lastOnlineTime = null;

    public String getIp()
    {
        return ip;
    }

    public void setIp(String ip)
    {
        this.ip = ip;
    }

    public String getLastOnlineTime()
    {
        return lastOnlineTime;
    }

    public void setLastOnlineTime(String lastOnlineTime)
    {
        this.lastOnlineTime = lastOnlineTime;
    }

    @Override
    public String toString()
    {
        return "LjobServer [ip=" + ip + ", lastOnlineTime=" + lastOnlineTime + "]";
    }
}
