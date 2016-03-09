package com.yungou.o2o.center.base;

/**
 * TODO: 增加描述
 * 
 * @author username
 * @date 2014-5-19 下午4:15:08
 * @version 0.1.0 
 * @copyright yougou.com 
 */
public class ServiceException extends Exception {
	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = -2233476096265552245L;
	private int errorCode;

	public ServiceException() {
	}

	public ServiceException(String msg) {
		super(msg);
	}

	public ServiceException(Throwable cause) {
		super(cause);
	}

	public ServiceException(String msg, Throwable cause) {
		super(msg, cause);
	}

	public ServiceException(int code, String msg) {
		super(msg);
		this.errorCode = code;
	}

	public ServiceException(int code, String msg, Throwable cause) {
		super(code + ":" + msg, cause);
		this.errorCode = code;
	}

	public int getErrorCode() {
		return errorCode;
	}
}
