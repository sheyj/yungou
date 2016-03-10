package com.yungou.o2o.center.manager.model;

import java.io.Serializable;

public class Role implements Serializable{
    /**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = 3302890454499820138L;

	private String roleId;

    private String roleName;

    private String roleRemark;

    public String getRoleId() {
        return roleId;
    }

    public void setRoleId(String roleId) {
        this.roleId = roleId == null ? null : roleId.trim();
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName == null ? null : roleName.trim();
    }

    public String getRoleRemark() {
        return roleRemark;
    }

    public void setRoleRemark(String roleRemark) {
        this.roleRemark = roleRemark == null ? null : roleRemark.trim();
    }
}