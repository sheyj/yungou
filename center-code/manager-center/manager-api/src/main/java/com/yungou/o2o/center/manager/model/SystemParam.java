package com.yungou.o2o.center.manager.model;

import java.io.Serializable;

public class SystemParam implements Serializable{
    /**
	 * 
	 */
	private static final long serialVersionUID = 7711343916821609700L;

	private Integer id;

    private String paramName;

    private String paramValue;

    private Short status;

    private String remark;

    /**
     * 参数类型
     */
    private Integer paramType;
    
    
    public Integer getParamType() {
		return paramType;
	}

	public void setParamType(Integer paramType) {
		this.paramType = paramType;
	}

	public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getParamName() {
        return paramName;
    }

    public void setParamName(String paramName) {
        this.paramName = paramName == null ? null : paramName.trim();
    }

    public String getParamValue() {
        return paramValue;
    }

    public void setParamValue(String paramValue) {
        this.paramValue = paramValue == null ? null : paramValue.trim();
    }

    public Short getStatus() {
        return status;
    }

    public void setStatus(Short status) {
        this.status = status;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark == null ? null : remark.trim();
    }
}