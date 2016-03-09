package com.yungou.o2o.tools.common.util;

import java.net.URLEncoder;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.alibaba.fastjson.JSON;
import com.yungou.o2o.tools.common.model.BaiduMapCoordinate;
import com.yungou.o2o.tools.common.model.BaiduMapGeocoderResponse;

/**
 * 百度地图API工具类
 */
public final class BaiduMapUtil {

	private static final Logger LOG = LoggerFactory.getLogger(BaiduMapUtil.class);

	/**
	 * 百度地图
	 */
	private static final String BAIDU_MAP_GEOCODER_API = "http://api.map.baidu.com/geocoder/v2/?output=json";

	/**
	 * 百度地图API Key
	 * 6lflb90XNFGG2VbAtLN7U1GE是申请的
	 * ZwEQnIpuAlh80kdK4GGcc3Lr是申请的
	 */
	private static final String[] BAIDU_MAP_API_KEY_DEFAULT_ARRAY = { "6lflb90XNFGG2VbAtLN7U1GE",
			"ZwEQnIpuAlh80kdK4GGcc3Lr" };

	/**
	 * 通过地址获取百度地图坐标
	 * @param apiKey 百度地图API密钥, 为空则使用默认密钥
	 * @param address 地址
	 * @param city 地址所在城市, 可以为空
	 * @return BaiduMapCoordinate
	 */
	public static BaiduMapCoordinate getCoordinateViaAddress(String apiKey, String address, String city) {
		if (StringUtils.isNullString(apiKey)) {
			return getCoordinateViaAddress(null, address, city, 0);
		}

		return getCoordinateViaAddress(apiKey, address, city, null);
	}

	private static BaiduMapCoordinate getCoordinateViaAddress(String apiKey, String address, String city,
			Integer defaultKeyIndex) {
		if (StringUtils.isNullString(apiKey)) {
			apiKey = BAIDU_MAP_API_KEY_DEFAULT_ARRAY[defaultKeyIndex];
		}

		if (StringUtils.isNullString(city)) {
			city = "";
		}

		if (StringUtils.isNullString(address)) {
			LOG.error("获取百度地图坐标失败, 地址不能为空.");
			return null;
		}

		String requestURL = null;
		try {
			requestURL = BAIDU_MAP_GEOCODER_API + "&ak=" + apiKey + "&address=" + URLEncoder.encode(address, "UTF-8")
					+ "&city=" + URLEncoder.encode(city, "UTF-8");
		}
		catch (Exception e) {
			LOG.error("encode地址参数异常, address: " + address + ", city: " + city + ", 异常: " + e.toString(), e);
			return null;
		}

		String result = null;
		BaiduMapGeocoderResponse response = null;

		try {
			result = HttpUtil.httpGet(requestURL);
			response = JSON.parseObject(result, BaiduMapGeocoderResponse.class);
			if ("0".equals(response.getStatus())) {
				return response.getResult().getLocation();
			}
			else {
				LOG.error("获取百度地图坐标失败, 返回码: " + response.getStatus() + ", 返回信息: " + response.getMsg() + ", 地址: "
						+ address + ", 城市: " + city);

				if (null != response.getStatus() && response.getStatus().length() == 3
						&& (response.getStatus().startsWith("3") || response.getStatus().startsWith("2"))) {
					if (null != defaultKeyIndex) {
						defaultKeyIndex = defaultKeyIndex + 1;
					}
					else {
						defaultKeyIndex = 0;
					}

					if (BAIDU_MAP_API_KEY_DEFAULT_ARRAY.length >= defaultKeyIndex + 1) {
						LOG.warn("调用百度地图API次数已经超过配额或无权限, 尝试使用其他API Key进行调用, 失败API Key: " + apiKey);
						getCoordinateViaAddress(null, address, city, defaultKeyIndex);
					}
				}

				return null;
			}
		}
		catch (Exception e) {
			LOG.error("获取百度地图坐标失败, 异常: " + e.toString() + ", 地址: " + address + ", 城市: " + city + ", result: " + result,
					e);
			return null;
		}
	}
}
