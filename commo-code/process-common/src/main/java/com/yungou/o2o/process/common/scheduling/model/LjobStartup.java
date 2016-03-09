package com.yungou.o2o.process.common.scheduling.model;

import java.io.Serializable;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.yungou.o2o.process.common.scheduling.constant.LjobConstant;

/**
 * 定时任务启动请求
 */
public class LjobStartup implements Serializable
{
    private static final long serialVersionUID = 8790088275041500046L;

    private static final Logger LOG = LoggerFactory.getLogger(LjobStartup.class);
    
    private DateFormat dateTimeFormat = new SimpleDateFormat("yyyyMMddHHmmss");
    
    private String requestID = null;
    
    private String requestIP = null;
    
    private String requestUser = null;
    
    private String requestTime = null;
    
    private String requestProject = null;
    
    private String requestJob = null;
    
    private String requestProjectIP = null;
    
    private String requestStatus = null;

    public String getRequestID()
    {
        return requestID;
    }

    public void setRequestID(String requestID)
    {
        this.requestID = requestID;
    }

    public String getRequestIP()
    {
        return requestIP;
    }

    public void setRequestIP(String requestIP)
    {
        this.requestIP = requestIP;
    }

    public String getRequestUser()
    {
        return requestUser;
    }

    public void setRequestUser(String requestUser)
    {
        this.requestUser = requestUser;
    }

    public String getRequestTime()
    {
        return requestTime;
    }
    
    public void setRequestTime(String requestTime)
    {
        this.requestTime = requestTime;
    }

    /**
     * 设置请求时间
     */
    public void setRequestTime()
    {
        this.requestTime = dateTimeFormat.format(new Date());
    }

    public String getRequestProject()
    {
        return requestProject;
    }

    public void setRequestProject(String requestProject)
    {
        this.requestProject = requestProject;
    }

    public String getRequestJob()
    {
        return requestJob;
    }

    public void setRequestJob(String requestJob)
    {
        this.requestJob = requestJob;
    }

    public String getRequestProjectIP()
    {
        return requestProjectIP;
    }

    public void setRequestProjectIP(String requestProjectIP)
    {
        this.requestProjectIP = requestProjectIP;
    }
    
    public String getRequestStatus()
    {
        return requestStatus;
    }

    public void setRequestStatus(String requestStatus)
    {
        this.requestStatus = requestStatus;
    }

    @Override
    public String toString()
    {
        return "LjobStartup [requestID=" + requestID + ", requestIP=" + requestIP + ", requestUser=" + requestUser + ", requestTime="
                + requestTime + ", requestProject=" + requestProject + ", requestJob=" + requestJob + ", requestProjectIP="
                + requestProjectIP + ", requestStatus=" + requestStatus + "]";
    }

    /**
     * 校验当前请求是否有效，超过120秒的请求则不算有效请求
     * @return boolean
     */
    public boolean isValideRequest(String ljobServerTime)
    {
        if (null == this.requestTime)
        {
            return false;
        }
        
        Long requestTimeInteger = null;
        Long currentTimeInteger = null;
        
        try
        {
            dateTimeFormat.parse(this.requestTime);
            dateTimeFormat.parse(ljobServerTime);
            requestTimeInteger = Long.valueOf(this.requestTime);
            currentTimeInteger = Long.valueOf(ljobServerTime);
        }
        catch (Exception e)
        {
            LOG.error(e.toString());
            return false;
        }
        
        if (currentTimeInteger - requestTimeInteger > LjobConstant.STARTUP_VALIDATE_SECONDS)
        {
            return false;
        }
        
        return true;
    }
}
