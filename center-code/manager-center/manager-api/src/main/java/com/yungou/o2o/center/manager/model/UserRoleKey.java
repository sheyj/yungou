package com.yungou.o2o.center.manager.model;

import java.io.Serializable;

public class UserRoleKey implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = -2080561749643071864L;

	private String userId;

	private String roleId;

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId == null ? null : userId.trim();
	}

	public String getRoleId() {
		return roleId;
	}

	public void setRoleId(String roleId) {
		this.roleId = roleId == null ? null : roleId.trim();
	}
}