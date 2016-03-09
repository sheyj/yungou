package com.yungou.o2o.tools.common.util;

import java.util.Iterator;
import java.util.Map.Entry;
import java.util.SortedMap;

/**
 * @category 接口对接签名
 * @date 2015-12-1下午10:16:59
 * @author yi.z
 */
public class SignUtil {
	public static String createSign(SortedMap<String, String> packageParams, String key) {
		StringBuffer sb = new StringBuffer();
		if (null != packageParams) {
			Iterator<Entry<String, String>> it = packageParams.entrySet().iterator();
			Entry<String, String> entry = null;
			String k = null;
			String v = null;
			while (it.hasNext()) {
				entry = it.next();
				k = (String) entry.getKey();
				v = (String) entry.getValue();
				if (null != v && !"".equals(v) && !"sign".equals(k) && !"key".equals(k)) {
					sb.append(k + "=" + v + "&");
				}
			}
		}
		sb.append("key=" + key);
		String sign = MD5Util.md5(sb.toString()).toUpperCase();
		return sign;
	}

	//对称加密解密
	public static String decryptAes(String hexStr) {
		byte[] decryptResult = AESUtil.parseHexStr2Byte(hexStr);
		String result = new String(AESUtil.decrypt(decryptResult, AESUtil.TOKEN));
		return result;
	}

	public static String encryptAes(String hexStr) {
		byte[] encryptResult = AESUtil.encrypt(hexStr, AESUtil.TOKEN);
		String encryptStr = AESUtil.parseByte2HexStr(encryptResult);
		return encryptStr;
	}
}
