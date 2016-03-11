package com.yungou.o2o.web.vo;

import java.io.Serializable;

/**
 * 数据字典	vo
 * 
 * @author username
 * @date 2014-5-22 上午11:30:02
 * @version 0.1.0 
 * @copyright yougou.com 
 */
public class CodeDict implements Serializable {

	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = -8177800320415893486L;

	private String codeName;

	private String codeValue;

	public String getCodeName() {
		return codeName;
	}

	public void setCodeName(String codeName) {
		this.codeName = codeName;
	}

	public String getCodeValue() {
		return codeValue;
	}

	public void setCodeValue(String codeValue) {
		this.codeValue = codeValue;
	}
	
}
