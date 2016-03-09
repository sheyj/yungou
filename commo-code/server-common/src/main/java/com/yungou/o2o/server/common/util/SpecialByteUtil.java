package com.yungou.o2o.server.common.util;

/**
 * 特殊字符处理工具
 * 
 * @author liang.q
 * 
 */
public class SpecialByteUtil {

	/**
	 * 判断当前字符是否是四字节的字符
	 * 
	 * @param str
	 * @return
	 */
	public static boolean isfourByte(char str) {
		byte[] oristr = null;
		try {
			oristr = String.valueOf(str).getBytes("UTF-8");
		} catch (Exception e) {
			return true;
		}
		for (int i = 0; i < oristr.length; i++) {
			if ((oristr[i] & 0xF8) == 0xF0) {
				return true;
			}
		}
		return false;
	}

	/**
	 * 过滤字符串中的四个字节的字符
	 * 
	 * @param str
	 * @return
	 */
	public static String fourByteFilter(String str) {
		if (null == str) {
			return str;
		}
		StringBuilder builder = new StringBuilder();
		for (int i = 0; i < str.length(); i++) {
			if (!isfourByte(str.charAt(i))) {
				builder.append(String.valueOf(str.charAt(i)));
			}
		}
		return builder.toString();
	}

	/**
	 * 过滤emoji表情
	 * 
	 * @param str
	 * @return
	 */
	public static String removeNonBmpUnicode(String str) {
		if (str == null) {
			return null;
		}
		str = str.replaceAll("[^\\u0000-\\uFFFF]", "");
		return str;
	}
}
