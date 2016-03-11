package com.yungou.o2o.center.manager.model;

import java.io.Serializable;

public class RoleMenuKey implements Serializable{
    /**
	 * 
	 */
	private static final long serialVersionUID = 7033240540003930745L;

	private String roleId;

    private String menuId;

    public String getRoleId() {
        return roleId;
    }

    public void setRoleId(String roleId) {
        this.roleId = roleId == null ? null : roleId.trim();
    }

    public String getMenuId() {
        return menuId;
    }

    public void setMenuId(String menuId) {
        this.menuId = menuId == null ? null : menuId.trim();
    }
}