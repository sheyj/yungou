package com.yungou.o2o.common;

/**
 * TODO: 增加描述
 * 
 * @author username
 * @date 2014-5-19 下午5:10:04
 * @version 0.1.0 
 * @copyright yougou.com 
 */
public class ResultVo {
	private int errorCode = 0;

	private String errorMessage = "";

	private Object data;

	private String errorDetail;

	public String getErrorDetail() {
		return errorDetail;
	}

	public void setErrorDetail(String errorDetail) {
		this.errorDetail = errorDetail;
	}

	public int getErrorCode() {
		return errorCode;
	}

	public Object getData() {
		return data;
	}

	public void setData(Object data) {
		this.data = data;
	}

	public void setErrorCode(int errorCode) {
		this.errorCode = errorCode;
	}

	public String getErrorMessage() {
		return errorMessage;
	}

	public void setErrorMessage(String errorMessage) {
		this.errorMessage = errorMessage;
	}
}
