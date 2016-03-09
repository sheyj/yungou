package com.yungou.o2o.tools.common.model;

/**
 * 坐标对象.
 */
public class LatLon {
	@SuppressWarnings("unused")
	private LatLon() {
	}

	public LatLon(double lat, double lon) {
		this.lat = lat;
		this.lon = lon;
	}

	/**
	 * 纬度
	 */
	double lat;

	/**
	 * 经度
	 */
	double lon;

	public double getLat() {
		return lat;
	}

	public void setLat(double lat) {
		this.lat = lat;
	}

	public double getLon() {
		return lon;
	}

	public void setLon(double lon) {
		this.lon = lon;
	}
}
