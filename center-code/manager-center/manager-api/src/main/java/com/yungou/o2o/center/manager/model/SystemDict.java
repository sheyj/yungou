package com.yungou.o2o.center.manager.model;

import java.io.Serializable;

public class SystemDict implements Serializable{
    /**
	 * 
	 */
	private static final long serialVersionUID = -2762686628999362075L;

	private Integer id;

    private String codeType;

    private String codeName;

    private String codeValue;

    private String status;

    private String remark;

    private Long  sortValue;
    
    public Long getSortValue() {
		return sortValue;
	}

	public void setSortValue(Long sortValue) {
		this.sortValue = sortValue;
	}

	public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCodeType() {
        return codeType;
    }

    public void setCodeType(String codeType) {
        this.codeType = codeType == null ? null : codeType.trim();
    }

    public String getCodeName() {
        return codeName;
    }

    public void setCodeName(String codeName) {
        this.codeName = codeName == null ? null : codeName.trim();
    }

    public String getCodeValue() {
        return codeValue;
    }

    public void setCodeValue(String codeValue) {
        this.codeValue = codeValue == null ? null : codeValue.trim();
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status == null ? null : status.trim();
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark == null ? null : remark.trim();
    }
}