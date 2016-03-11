package com.yungou.o2o.util;

import java.util.UUID;

/**
 * TODO: 增加描述
 * 
 * @author username
 * @date 2014-5-20 下午1:51:37
 * @version 0.1.0 
 * @copyright yougou.com 
 */
public class UUIDUtil {

	/**
	 * 获取UUID
	 * @return
	 */
	public static String getUuid() {
		return UUID.randomUUID().toString().replace("-", "");
	}
}
