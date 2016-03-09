package com.yungou.o2o.tools.common.model;

/**
 * 百度地图Geocoder服务响应
 * 
 * @author lin.zb
 * @date 2016年2月17日 下午4:48:28
 * @version 1.0.0 
 * @copyright wonhigh.net.cn 
 */
public class BaiduMapGeocoderResponse {

	/**
	 * 响应状态
	 * 0表示成功
	 */
	private String status;

	/**
	 * 返回消息
	 */
	private String msg;

	/**
	 * 百度地图Geocoder服务结果
	 */
	private BaiduMapGeocoderResult result;

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public BaiduMapGeocoderResult getResult() {
		return result;
	}

	public void setResult(BaiduMapGeocoderResult result) {
		this.result = result;
	}

	@Override
	public String toString() {
		return "BaiduMapGeocoderResponse [status=" + status + ", msg=" + msg + ", result=" + result + "]";
	}
}
