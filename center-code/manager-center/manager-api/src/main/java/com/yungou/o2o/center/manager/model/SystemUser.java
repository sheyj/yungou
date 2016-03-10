package com.yungou.o2o.center.manager.model;

import java.io.Serializable;
import java.util.Date;

import org.apache.commons.lang.StringUtils;

/**
 * 系统用户表
 * 
 * @author username
 * @date 2014-5-20 上午10:56:29
 * @version 0.1.0 
 * @copyright yougou.com
 */
public class SystemUser implements Serializable{
	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = -4108726119404834603L;

	private String userid;

	//用户名称
	private String username;
    //登录用户名
	private String loginName;
    //登录用户密码
	private String loginPassword;
	//确认登录用户密码
	private String reLoginPassword;
    //联系电话
	private String mobilePhone;
	
	//状态  1=正常2=锁定
	private String status;

	private String statusName;
	
	private Date createTime;
	private Date updateTime;

	private String remark;

	public String getUserid() {
		return userid;
	}

	public void setUserid(String userid) {
		this.userid = userid == null ? null : userid.trim();
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username == null ? null : username.trim();
	}

	public String getLoginName() {
		return loginName;
	}

	public void setLoginName(String loginName) {
		this.loginName = loginName == null ? null : loginName.trim();
	}

	public String getLoginPassword() {
		return loginPassword;
	}

	public void setLoginPassword(String loginPassword) {
		this.loginPassword = loginPassword == null ? null : loginPassword.trim();
	}

	public String getMobilePhone() {
		return mobilePhone;
	}

	public void setMobilePhone(String mobilePhone) {
		this.mobilePhone = mobilePhone == null ? null : mobilePhone.trim();
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status == null ? null : status.trim();
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public Date getUpdateTime() {
		return updateTime;
	}

	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark == null ? null : remark.trim();
	}

	public String getReLoginPassword() {
		return reLoginPassword;
	}

	public void setReLoginPassword(String reLoginPassword) {
		this.reLoginPassword = reLoginPassword;
	}

	public String getStatusName() {
		String statusName = "";
		if(StringUtils.isNotBlank(status)){
			if("1".equals(status)){
				statusName = "正常";
			}else if("2".equals(status)){
				statusName = "锁定";
			}else{
				statusName = "其它";
			}
		}
		return statusName;
	}
	
	
}