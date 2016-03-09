package com.yungou.o2o.center.base;

/**
 * TODO: 增加描述
 * 
 * @author username
 * @date 2014-5-19 下午4:29:30
 * @version 0.1.0 
 * @copyright yougou.com 
 */
public enum CommonOperatorEnum {
	DELETED("deleted"), UPDATED("updated"), INSERTED("inserted");

	private String operator;

	CommonOperatorEnum(String operator) {
		this.operator = operator;
	}

	public String getOperator() {
		return operator;
	}
}
