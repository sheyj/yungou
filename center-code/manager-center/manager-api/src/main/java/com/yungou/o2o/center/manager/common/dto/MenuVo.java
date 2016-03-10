package com.yungou.o2o.center.manager.common.dto;

import java.io.Serializable;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.codehaus.jackson.annotate.JsonProperty;


/**
 * TODO: 增加描述
 * 
 * @author username
 * @date 2014-5-21 下午2:04:45
 * @version 0.1.0 
 * @copyright yougou.com 
 */
public class MenuVo implements Serializable{
	
	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = -7672121061505743536L;

	private Map<String,String> attributes=new HashMap<String,String>(1);
	
	private List<MenuVo> menuVoList;
	
	private String id;
	
	private String text;
	
	private String isLeaf;
	
	private String parentId;
	
	public String getParentId() {
		return parentId;
	}

	public void setParentId(String parentId) {
		this.parentId = parentId;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public String getIsLeaf() {
		return isLeaf;
	}

	public void setIsLeaf(String isLeaf) {
		this.isLeaf = isLeaf;
	}

	public Map<String, String> getAttributes() {
		return attributes;
	}

	public void setAttributes(Map<String, String> attributes) {
		this.attributes = attributes;
	}
	
	@JsonProperty(value="children")
	public List<MenuVo> getMenuVoList() {
		return menuVoList;
	}

	public void setMenuVoList(List<MenuVo> menuVoList) {
		this.menuVoList = menuVoList;
	}
	
	
	
}
