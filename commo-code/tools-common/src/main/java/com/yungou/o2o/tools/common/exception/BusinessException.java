package com.yungou.o2o.tools.common.exception;

public class BusinessException extends RuntimeException
{
    private String code;
    
    public BusinessException(String msg)
    {
        super(msg);
    }
    
    public BusinessException(String code, String msg)
    {
        super(msg);
        this.code = code;
    }
    
    public BusinessException(String msg, Throwable t)
    {
        super(msg, t);
        setStackTrace(t.getStackTrace());
    }
    
    private static final long serialVersionUID = 1L;
    
    public String getCode()
    {
        return code;
    }
    
    public void setCode(String code)
    {
        this.code = code;
    }
}