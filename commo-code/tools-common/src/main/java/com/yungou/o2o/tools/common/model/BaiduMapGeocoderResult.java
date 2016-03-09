package com.yungou.o2o.tools.common.model;

/**
 * 百度地图Geocoder服务结果
 */
public class BaiduMapGeocoderResult {
	/**
	 * 百度地图坐标
	 */
	private BaiduMapCoordinate location;

	/**
	 * 是否精确查找
	 * 1为精确查找，即准确打点；0为不精确，即模糊打点
	 */
	private String precise;

	/**
	 * 可信度，描述打点准确度
	 */
	private String confidence;

	/**
	 * 地址类型
	 */
	private String level;

	public BaiduMapCoordinate getLocation() {
		return location;
	}

	public void setLocation(BaiduMapCoordinate location) {
		this.location = location;
	}

	public String getPrecise() {
		return precise;
	}

	public void setPrecise(String precise) {
		this.precise = precise;
	}

	public String getConfidence() {
		return confidence;
	}

	public void setConfidence(String confidence) {
		this.confidence = confidence;
	}

	public String getLevel() {
		return level;
	}

	public void setLevel(String level) {
		this.level = level;
	}

	@Override
	public String toString() {
		return "BaiduMapGeocoderResult [location=" + location + ", precise=" + precise + ", confidence=" + confidence
				+ ", level=" + level + "]";
	}
}
