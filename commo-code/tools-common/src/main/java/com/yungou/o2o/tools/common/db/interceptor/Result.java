package com.yungou.o2o.tools.common.db.interceptor;

import java.io.Serializable;

import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;

/**
 * 
 * @author yao.l
 *
 */
public class Result implements Serializable
{
    private static final long serialVersionUID = -6076532821862639330L;

    /**
     * 是否成功 1:成功 0：失败
     */
    private String success;
    
    /**
     * 返回的错误码
     */
    private String errorCode;
    
    /**
     * 返回的错误消息
     */
    private String errorMessage;
    
    /**
     * 返回的数据
     */
    private Object data;
    
    /**
     * Page页面对象 用于列表分页
     */
    private Page page = null;
    
    public Result()
    {
        
    }
    
    public Result(String success, String errorCode, String errorMessage)
    {
        this.success = success;
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
    }
    
    public Result(String success, Object data)
    {
        this.success = success;
        this.data = data;
    }
    
    public Result(String success, Object data, Page page)
    {
        this(success, data);
        this.page = page;
    }
    
    public Result(String success, String errorCode, String errorMessage, Object data)
    {
        this(success, errorCode, errorMessage);
        this.data = data;
    }
    
    public String getSuccess()
    {
        return success;
    }
    
    public String isSuccess()
    {
        return success;
    }
    
    public void setSuccess(String success)
    {
        this.success = success;
    }
    
    public String getErrorCode()
    {
        return errorCode;
    }
    
    public void setErrorCode(String errorCode)
    {
        this.errorCode = errorCode;
    }
    
    public Object getData()
    {
        return data;
    }
    
    public void setData(Object data)
    {
        this.data = data;
    }
    
    public String getErrorMessage()
    {
        return errorMessage;
    }
    
    public void setErrorMessage(String errorMessage)
    {
        this.errorMessage = errorMessage;
    }
    
    public Page getPage()
    {
        return page;
    }
    
    public void setPage(Page page)
    {
        this.page = page;
    }
    
    @Override
    public String toString()
    {
        return ToStringBuilder.reflectionToString(this, ToStringStyle.SHORT_PREFIX_STYLE);
    }
}
