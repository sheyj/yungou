package com.yungou.o2o.center.manager.model;

import java.io.Serializable;

public class Menu implements Serializable{
	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = -9020374624477161273L;

	private String menuId;

	private String menuName;

	private String parentId;

	//菜单类型  0 导航  1菜单
	private Short menuType;

	private String menuUrl;

	private Integer menuSort;

	//菜单标记    0 无效  1有效
	private Short menuFlag;

	private String menuRemark;

	public String getMenuId() {
		return menuId;
	}

	public void setMenuId(String menuId) {
		this.menuId = menuId == null ? null : menuId.trim();
	}

	public String getMenuName() {
		return menuName;
	}

	public void setMenuName(String menuName) {
		this.menuName = menuName == null ? null : menuName.trim();
	}

	public String getParentId() {
		return parentId;
	}

	public void setParentId(String parentId) {
		this.parentId = parentId == null ? null : parentId.trim();
	}

	public Short getMenuType() {
		return menuType;
	}

	public void setMenuType(Short menuType) {
		this.menuType = menuType;
	}

	public String getMenuUrl() {
		return menuUrl;
	}

	public void setMenuUrl(String menuUrl) {
		this.menuUrl = menuUrl == null ? null : menuUrl.trim();
	}

	public Integer getMenuSort() {
		return menuSort;
	}

	public void setMenuSort(Integer menuSort) {
		this.menuSort = menuSort;
	}

	public Short getMenuFlag() {
		return menuFlag;
	}

	public void setMenuFlag(Short menuFlag) {
		this.menuFlag = menuFlag;
	}

	public String getMenuRemark() {
		return menuRemark;
	}

	public void setMenuRemark(String menuRemark) {
		this.menuRemark = menuRemark == null ? null : menuRemark.trim();
	}
}