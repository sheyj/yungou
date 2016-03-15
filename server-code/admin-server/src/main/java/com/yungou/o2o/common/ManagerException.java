package com.yungou.o2o.common;

public class ManagerException extends Exception{
	  /**
	 * 
	 */
	private static final long serialVersionUID = -8225504109686094345L;
	private int errorCode;

	  public ManagerException()
	  {
	  }

	  public ManagerException(String msg)
	  {
	    super(msg);
	  }

	  public ManagerException(Throwable cause) {
	    super(cause);
	  }

	  public ManagerException(String msg, Throwable cause) {
	    super(msg, cause);
	  }

	  public ManagerException(int code, String msg) {
	    super(msg);
	    this.errorCode = code;
	  }

	  public ManagerException(int code, String msg, Throwable cause) {
	    super(msg, cause);
	    this.errorCode = code;
	  }

	  public int getErrorCode() {
	    return this.errorCode;
	  }
}
