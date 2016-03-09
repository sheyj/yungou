package com.yungou.o2o.tools.common.util;

import java.io.IOException;
import java.io.InputStream;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
import java.util.Map;
import java.util.Random;
import java.util.Set;
import java.util.StringTokenizer;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * @author yao.l
 */
public final class StringUtils {
	
	/** 数字验证 可以以负号、0开头 */
	public static Pattern pattern1 = Pattern.compile("^\\d+$|-\\d+$");

	/** 小数验证 可以以负号开头 */
	public static Pattern pattern2 = Pattern.compile("\\d+\\.\\d+$|-\\d+\\.\\d+$");
	
	private static final char[] HEXDUMP_TABLE = new char[256 * 4];
	
	static {
		final char[] DIGITS = "0123456789ABCDEF".toCharArray();
		for (int i = 0; i < 256; i++) {
			HEXDUMP_TABLE[i << 1] = DIGITS[i >>> 4 & 0x0F];
			HEXDUMP_TABLE[(i << 1) + 1] = DIGITS[i & 0x0F];
		}
	}


	private StringUtils() {
	}

	public static String getObjectToString(final Object obj) {
		return (null != obj ? obj.toString() : "");
	}

	public static String getStringValue(final String inStr) {
		return (isNullString(inStr)) ? "" : inStr;
	}

	public static String getObjectStringValue(final Object obj, final String defaultStr) {
		if (obj == null) {
			if (defaultStr != null) {
				return defaultStr;
			} else {
				return "";
			}
		} else {
			return String.valueOf(obj);
		}
	}

	public static String getObjectStringValue(final Object obj) {
		if (obj == null) {
			return "";
		} else {
			String value = String.valueOf(obj);
			if (isNullString(value) || "null".equalsIgnoreCase(value)) {
				return "";
			}
			return String.valueOf(obj);
		}
	}

	/**
	 * Check if the input string is null.
	 * 
	 * @param inStr
	 * @return boolean value indicating if the string is null
	 */
	public static boolean isNullString(final String inStr) {
		if ((inStr == null) || inStr.trim().equals("")) {
			return true;
		} else {
			return false;
		}
	}

	/**
	 * @Title: isNullObject
	 * @Description: 检查一个对象是否为空对象
	 * @return boolean 返回类型 true：空对象 false：非空对象
	 * @throws
	 */
	public static boolean isNullObject(final Object obj) {
		return isNullString(getObjectStringValue(obj));
	}

	/**
	 * Converts a hexadecimal string to a byte array.
	 * 
	 * @param hexStr Input hexadecimal string.
	 * @return Byte array.
	 * @throws Exception
	 */
	public static byte[] hexToBytes(String hexStr) throws Exception {
		if (hexStr == null) {
			return null;
		}
		if ((hexStr.length() % 2) != 0) {
			throw new Exception("Length of data is not equal to even number");
		}
		byte[] rtnBytes = new byte[hexStr.length() / 2];

		for (int i = 0; i < (hexStr.length() / 2); i++) {
			rtnBytes[i] = (byte) Integer.parseInt(hexStr.substring(i * 2, (i * 2) + 2), 16);
		}
		return rtnBytes;
	}

	/**
	 * Converts a byte array to string.
	 * 
	 * @param data Input byte array.
	 * @return String
	 */
	public static String hexToString(byte[] data) {
		int index = 0;
		int length = data.length;
		char[] buf = new char[length << 1];
		int dstIdx = 0;
		for (; index < length; index++, dstIdx += 2) {
			System.arraycopy(HEXDUMP_TABLE, (data[index] & 0XFF) << 1, buf, dstIdx, 2);
		}
		return new String(buf);
	}

	/**
	 * Parse a string into a series of string tokens using the specified
	 * delimiter.
	 * 
	 * @param str
	 * @param splitChar
	 * @return Array of string token
	 */
	public static String[] split(String str, char splitChar) {
		if (str == null) {
			return null;
		}
		if (str.trim().equals("")) {
			return new String[0];
		}
		if (str.indexOf(splitChar) == -1) {
			String[] strArray = new String[1];
			strArray[0] = str;
			return strArray;
		}

		ArrayList<String> list = new ArrayList<String>();
		int prevPos = 0;
		for (int pos = str.indexOf(splitChar); pos >= 0; pos = str.indexOf(splitChar, (prevPos = (pos + 1)))) {
			list.add(str.substring(prevPos, pos));
		}
		list.add(str.substring(prevPos, str.length()));

		return list.toArray(new String[list.size()]);
	}

	/**
	 * Parse a string into a series of string tokens using the specified
	 * delimiter.
	 * 
	 * @param str Input string
	 * @param delim The string delimiter.
	 * @return Array of string tokens.
	 */
	public static String[] tokenize(String str, String delim) {
		String[] strs = null;
		if (str != null) {
			StringTokenizer tokens;
			if (delim == null) {
				tokens = new StringTokenizer(str);
			} else {
				tokens = new StringTokenizer(str, delim);
			}
			strs = new String[tokens.countTokens()];
			for (int i = 0; (i < strs.length) && tokens.hasMoreTokens(); i++) {
				strs[i] = tokens.nextToken();
			}
		}
		return strs;
	}

	/**
	 * Parse a string into a series of string tokens according to fixed length
	 * and return tokenized string array.
	 * 
	 * @param str Input string
	 * @param fixedLength The length at which the string is tokenized.
	 * @return Array of string tokens.
	 */
	public static String[] tokenize(String str, int fixedLength) {
		String[] strs = null;
		if ((str != null) && (fixedLength > 0)) {
			ArrayList<String> list = new ArrayList<String>();
			for (int i = 0; i < str.length(); i += fixedLength) {
				int next = i + fixedLength;
				if (next > str.length()) {
					next = str.length();
				}
				list.add(str.substring(i, next));
			}
			strs = list.toArray(new String[] {});
		}
		return strs;
	}

	/**
	 * Convert the input string to String encoded in UTF16LE format.
	 * 
	 * @param input
	 * @return String encoded in UTF16LE format
	 * @throws IOException
	 */
	public static String toUTF16LEString(String input) throws IOException {
		if ((input == null) || (input.length() == 0)) {
			return input;
		}

		byte[] b = input.getBytes("UTF-16LE");
		return hexToString(b);
	}

	/**
	 * Left padding the string with the specified padding character upto the
	 * specified length.
	 * @param inStr Input string
	 * @param length Padding length
	 * @param paddingChar Padding character
	 * @return Padding string
	 */
	public static String leftPad(String inStr, int length, char paddingChar) {
		if (inStr.length() == length) {
			return inStr;
		}

		StringBuffer outStr = new StringBuffer();
		for (int i = inStr.length(); i < length; i++) {
			outStr.append(paddingChar);
		}
		outStr.append(inStr);

		return outStr.toString();
	}

	/**
	 * Right padding the string with the specified padding character upto the
	 * specified length.
	 * @param inStr Input string
	 * @param length Padding length
	 * @param paddingChar Padding character
	 * @return Padding string
	 */
	public static String rightPad(String inStr, int length, char paddingChar) {
		if (inStr.length() == length) {
			return inStr;
		}

		StringBuffer outStr = new StringBuffer();
		outStr.append(inStr);

		for (int i = inStr.length(); i < length; i++) {
			outStr.append(paddingChar);
		}

		return outStr.toString();
	}

	/**
	 * Adds leading zeros to the given String to the specified length. Nothing
	 * will be done if the length of the given String is equal to or greater
	 * than the specified length.
	 * 
	 * @param s The source string.
	 * @param len The length of the target string.
	 * @return The String after adding leading zeros.
	 */
	public static String addLeadingZero(String s, int len) {
		return addLeadingCharacter(s, '0', len);
	}

	/**
	 * Adds leading spaces to the given String to the specified length. Nothing
	 * will be done if the length of the given String is equal to or greater
	 * than the specified length.
	 * 
	 * @param s The source string.
	 * @param len The length of the target string.
	 * @return The String after adding leading spaces.
	 */
	public static String addLeadingSpace(String s, int len) {
		return addLeadingCharacter(s, ' ', len);
	}

	/**
	 * Adds specified leading characters to the specified length. Nothing will
	 * be done if the length of the given String is equal to or greater than the
	 * specified length.
	 * 
	 * @param s The source string.
	 * @param c The leading character(s) to be added.
	 * @param len The length of the target string.
	 * @return The String after adding the specified leading character(s).
	 */
	public static String addLeadingCharacter(String s, char c, int len) {
		if (s != null) {
			StringBuffer sb = new StringBuffer();
			int count = len - s.length();
			for (int i = 0; i < count; i++) {
				sb.append(c);
			}
			sb.append(s);
			return sb.toString();
		} else {
			return null;
		}
	}

	/**
	 * Removes leading zeros from the given String, if any.
	 * 
	 * @param s The source string.
	 * @return The String after removing leading zeros.
	 */
	public static String removeLeadingZero(String s) {
		return removeLeadingCharacter(s, '0');
	}

	/**
	 * Removes leading spaces from the given String, if any.
	 * 
	 * @param s The source string.
	 * @return The String after removing leading spaces.
	 */
	public static String removeLeadingSpace(String s) {
		return removeLeadingCharacter(s, ' ');
	}

	/**
	 * Removes specified leading characters from the given String, if any.
	 * 
	 * @param s The source string.
	 * @param c The leading character(s) to be removed.
	 * @return The String after removing the specified leading character(s).
	 */
	public static String removeLeadingCharacter(String s, char c) {
		if (s != null) {
			int len = s.length();
			int i = 0;
			for (i = 0; i < len; i++) {
				if (s.charAt(i) != c) {
					break;
				}
			}
			if (i > 0) {
				return s.substring(i);
			} else {
				return s;
			}
		} else {
			return null;
		}
	}

	/**
	 * Appends zeros to the given String to the specified length. Nothing will
	 * be done if the length of the given String is equal to or greater than the
	 * specified length.
	 * 
	 * @param s The source string.
	 * @param len The length of the target string.
	 * @return The String after appending zeros.
	 */
	public static String appendZero(String s, int len) {
		return appendCharacter(s, '0', len);
	}

	/**
	 * Appends spaces to the given String to the specified length. Nothing will
	 * be done if the length of the given String is equal to or greater than the
	 * specified length.
	 * 
	 * @param s The source string.
	 * @param len The length of the target string.
	 * @return The String after appending spaces.
	 */
	public static String appendSpace(String s, int len) {
		return appendCharacter(s, ' ', len);
	}

	/**
	 * Appends specified characters to the given String to the specified length.
	 * Nothing will be done if the length of the given String is equal to or
	 * greater than the specified length.
	 * 
	 * @param s The source string.
	 * @param c The character(s) to be appended.
	 * @param len The length of the target string.
	 * @return The String after appending the specified character(s).
	 */
	public static String appendCharacter(String s, char c, int len) {
		if (s != null) {
			StringBuffer sb = new StringBuffer().append(s);
			while (sb.length() < len) {
				sb.append(c);
			}
			return sb.toString();
		} else {
			return null;
		}
	}

	/**
	 * Replaces all the occurences of a search string in a given String with a
	 * specified substitution.
	 * 
	 * @param text The String to be searched.
	 * @param src The search String.
	 * @param tar The replacement String.
	 * @return The result String after replacing.
	 */
	public static String replace(String text, String src, String tar) {
		StringBuffer sb = new StringBuffer();

		if ((text == null) || (src == null) || (tar == null)) {
			return text;
		} else {
			int size = text.length();
			int gap = src.length();

			for (int start = 0; (start >= 0) && (start < size);) {
				int i = text.indexOf(src, start);
				if (i == -1) {
					sb.append(text.substring(start));
					start = -1;
				} else {
					sb.append(text.substring(start, i)).append(tar);
					start = i + gap;
				}
			}
			return sb.toString();
		}
	}

	/**
	 * Converting object to String
	 * 
	 * @param obj the converting object
	 * @return
	 */
	public static String toString(Object obj) {
		if (null == obj) {
			return null;
		} else {
			return obj.toString();
		}
	}

	/**
	 * Calculate the MD5 checksum of the input string
	 * @param inString Input string
	 * @return MD5 checksum of the input string in hexadecimal value
	 */
	public static String md5sum(String inString) {
		MessageDigest algorithm = null;

		try {
			algorithm = MessageDigest.getInstance("MD5");
		} catch (NoSuchAlgorithmException nsae) {
			System.err.println("Cannot find digest algorithm");
			return null;
		}

		byte[] defaultBytes = inString.getBytes();
		algorithm.reset();
		algorithm.update(defaultBytes);
		byte messageDigest[] = algorithm.digest();
		return hexToString(messageDigest);
	}

	public static boolean isNotEmpty(String outstr) {
		if ((outstr != null) && (outstr.trim().length() > 0)) {
			return true;
		}
		return false;
	}

	public static String inputStream2String(InputStream in) throws IOException {
		StringBuffer out = new StringBuffer();
		byte[] b = new byte[4096];
		for (int n; (n = in.read(b)) != -1;) {
			out.append(new String(b, 0, n));
		}
		return out.toString();
	}

	public static boolean isNullMap(Map<?, ?> map) {
		Set<?> set = map.keySet();
		Iterator<?> iterable = set.iterator();
		while (iterable.hasNext()) {
			Object obj = map.get(iterable.next());
			if ((null == obj) || obj.equals(null)) {
				return false;
			}
		}
		return true;
	}

	public static boolean isEmpty(Object obj) {
		if (obj == null) {
			return true;
		}
		if (obj instanceof Collection<?>) {
			if (((Collection<?>) obj).isEmpty()) {
				return true;
			}
		} else if (obj instanceof Map<?, ?>) {
			if (((Map<?, ?>) obj).isEmpty()) {
				return true;
			}
		} else {
			String str = obj.toString();
			if ((str == null) || str.trim().equals("")) {
				return true;
			}
		}
		return false;
	}

	/**
	 * 生成随机数字和字母,
	 * @param length
	 * @return
	 */
	public static String getStringRandom(int length) {

		String val = "";
		Random random = new Random();

		// 参数length，表示生成几位随机数
		for (int i = 0; i < length; i++) {

			String charOrNum = (random.nextInt(2) % 2) == 0 ? "char" : "num";
			// 输出字母还是数字
			if ("char".equalsIgnoreCase(charOrNum)) {
				// 输出是大写字母还是小写字母
				int temp = (random.nextInt(2) % 2) == 0 ? 65 : 97;
				val += (char) (random.nextInt(26) + temp);
			} else if ("num".equalsIgnoreCase(charOrNum)) {
				val += String.valueOf(random.nextInt(10));
			}
		}
		return val;
	}

	/**
	 * 生成指定长度的随机字母字符串
	 * @param length 指定长度
	 * @return
	 */
	public static String getLetterStringRandom(int length) {

		String val = "";
		Random random = new Random();

		// 参数length，表示生成几位随机数
		for (int i = 0; i < length; i++) {
			// 输出是大写字母还是小写字母
			int temp = (random.nextInt(2) % 2) == 0 ? 65 : 97;
			val += (char) (random.nextInt(26) + temp);
		}
		return val;
	}

	public static String getValidStoreNos(String sortNos) {
		if (sortNos == null) {
			return null;
		}
		if (sortNos.startsWith(",")) {
			sortNos = sortNos.substring(1, sortNos.length());
		}
		if (sortNos.endsWith(",")) {
			sortNos = sortNos.substring(0, sortNos.length() - 1);
		}
		return sortNos;
	}

	public static boolean matches(String str, Pattern pattern) {
		Matcher is = pattern.matcher(str);
		return is.matches();
	}

	public static boolean isNumeric(String agr) {
		Matcher is = pattern1.matcher(agr);
		Matcher is2 = pattern2.matcher(agr);
		return is.matches() || is2.matches();
	}

	/**
	 * 截取最后一个指定字符串到结尾
	 * @param strs 原字符串
	 * @param str  指定字符
	 */
	public static String subEndByStr(String strs, String str) {
		if (null == strs || null == str) {
			return "";
		}
		
		int strIndex = strs.lastIndexOf(str);
		if (strIndex != -1) {
			return strs.substring(strIndex + 1);
		}
		return "";
	}
}
