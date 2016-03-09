package com.yungou.o2o.tools.common.model;

/**
 * 百度地图坐标
 * 
 * @author lin.zb
 * @date 2016年2月17日 下午4:21:49
 * @version 1.0.0 
 * @copyright wonhigh.net.cn 
 */
public class BaiduMapCoordinate {
	/**
	 * 经度
	 */
	private float lng;

	/**
	 * 纬度
	 */
	private float lat;

	public float getLng() {
		return lng;
	}

	public void setLng(float lng) {
		this.lng = lng;
	}

	public float getLat() {
		return lat;
	}

	public void setLat(float lat) {
		this.lat = lat;
	}

	@Override
	public String toString() {
		return "BaiduMapCoordinate [lng=" + lng + ", lat=" + lat + "]";
	}
}
