package com.yungou.o2o.web.vo;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

/**
 * 返回结果对象基类
 * 
 * @author she.yj
 * @date 2014-5-23 下午5:14:24
 * @version 0.1.0 
 * @copyright syj.com 
 */
public class BaseResult implements Serializable{

	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = -2240430782274260358L;
	
	//处理结果：  true  成功，  false  失败
	private String success = "true";

	//结果描述
	private String message = "成功！";
	
	//返回结果对象
	private  Map<String, Object> resultObj = new HashMap<String, Object>();

	public String getSuccess() {
		return success;
	}

	public void setSuccess(String success) {
		this.success = success;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public Map<String, Object> getResultObj() {
		return resultObj;
	}

	public void setResultObj(Map<String, Object> resultObj) {
		this.resultObj = resultObj;
	}
	
}
