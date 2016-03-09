package com.yungou.o2o.tools.common.util;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.lang.StringUtils;

import com.alibaba.fastjson.JSON;

/**
 * @category 自定义jstl标签
 * @author yiz
 * @date 2014-8-11下午2:38:18
 * @copyright yougou.com
 */
public class UFunction {
	/**
	 * 获取一个字符串的长度
	 * 
	 * @param str
	 * @return int
	 */
	public static int getLen(String str) {
		if (null == str) {
			return 0;
		}

		return str.length();
	}

	/**
	 * @category 带颜色的截取字符串
	 * @param sub
	 * @param str 传入的待处理字符串
	 * @param end
	 * @return
	 */
	public static String substr2(String sub, String str, int end) {
		String temp = "";
		if (str.length() > end) {
			temp = str.substring(0, end) + "...";
		}
		else {
			temp = str;
		}
		if (StringUtils.isNotBlank(sub)) {
			sub = valiSpecialSymbol(sub);
			String wordReg = "(?i)" + sub;// 用(?i)来忽略大小写
			StringBuffer sb = new StringBuffer();
			Matcher matcher = Pattern.compile(wordReg).matcher(temp);

			while (matcher.find()) {
				matcher.appendReplacement(sb, "<font color='red'>" + valiSpecialSymbol(matcher.group()) + "</font>");// 这样保证了原文的大小写没有发生变化
			}
			matcher.appendTail(sb);
			temp = sb.toString();
		}
		return temp;
	}

	/**
	 * @category 普通字符串截取
	 * @param str
	 * @param end
	 * @return
	 */
	public static String substr(String str, int end) {
		String temp = "";
		if (str.length() > end) {
			temp = str.substring(0, end) + "...";
			return temp;
		}
		else {
			return str;
		}
	}

	public static String substr1(String str, int end) {
		String[] tempArr = str.split("、");
		String result = "";
		for (int i = 0; i < end && i < tempArr.length; i++) {
			result += tempArr[i] + "、";
		}
		result = result.substring(0, result.lastIndexOf("、"));
		return result;
	}

	/**
	 * 两数相除获取整数结果
	 * 
	 * @param first
	 * @param second
	 * @return int
	 */
	public static int chufa(int first, int second) {
		return first / second;
	}

	/**
	 * 未全完成判断
	 * @category QQ表情字符替換成图片
	 * @param content
	 * @return
	 */
	public String isQqFace(String content) {
		// 判断QQ表情的正则表达式
		String qqfaceRegex = "/::\\)|/::~|/::B|/::\\||/:8-\\)|/::<|/::$|/::X|/::Z|/::'\\(|/::-\\||/::@|/::P|/::D|/::O|/::\\(|/::\\+|/:--b|/::Q|/::T|/:,@P|/:,@-D|/::d|/:,@o|/::g|/:\\|-\\)|/::!|/::L|/::>|/::,@|/:,@f|/::-S|/:\\?|/:,@x|/:,@@|/::8|/:,@!|/:!!!|/:xx|/:bye|/:wipe|/:dig|/:handclap|/:&-\\(|/:B-\\)|/:<@|/:@>|/::-O|/:>-\\||/:P-\\(|/::'\\||/:X-\\)|/::\\*|/:@x|/:8\\*|/:pd|/:<W>|/:beer|/:basketb|/:oo|/:coffee|/:eat|/:pig|/:rose|/:fade|/:showlove|/:heart|/:break|/:cake|/:li|/:bome|/:kn|/:footb|/:ladybug|/:shit|/:moon|/:sun|/:gift|/:hug|/:strong|/:weak|/:share|/:v|/:@\\)|/:jj|/:@@|/:bad|/:lvu|/:no|/:ok|/:love|/:<L>|/:jump|/:shake|/:<O>|/:circle|/:kotow|/:turn|/:skip|/:oY|/:#-0|/:hiphot|/:kiss|/:<&|/:&>";
		String temp = "";
		Pattern p = Pattern.compile(qqfaceRegex);
		StringBuffer sb = new StringBuffer();
		Matcher matcher = p.matcher(content);

		while (matcher.find()) {
			// 找到匹配的微信
			// 0
			if ("/::\\)".equals(matcher.group())) {
				matcher.appendReplacement(sb, "<img src='/portal/resources/images/qqFace/0.png' />");
			}
			// 1
			if ("/::~".equals(matcher.group())) {
				matcher.appendReplacement(sb, "<img src='/portal/resources/images/qqFace/1.png' />");
			}
			// 2
			if ("/::B".equals(matcher.group())) {
				matcher.appendReplacement(sb, "<img src='/portal/resources/images/qqFace/2.png' />");
			}

			// matcher.appendReplacement(sb,
			// "<font color='red'>" + matcher.group() + "</font>");//
			// 这样保证了原文的大小写没有发生变化
		}
		matcher.appendTail(sb);
		temp = sb.toString();
		return temp;
	}

	/**
	 * @category 机构编码字符串前缀截取
	 * @param str
	 * @param orgCode
	 * @return
	 */
	public static String subOrgCode(String str, String orgCode) {
		String result = "";
		int index = orgCode.indexOf(str);
		if (index == -1) {
			return orgCode;
		}
		else {
			result = orgCode.substring(index + 1);
			return result;
		}
	}

	/**
	 * @category param sub 带颜色的截取字符串
	 * @param str
	 * @param orgCode
	 * @return
	 */
	public static String subOrgCodeHightLight(String sub, String str, String orgCode) {
		String result = "";
		int index = orgCode.indexOf(str);
		if (index == -1) {
			result = orgCode;
		}
		else {
			result = orgCode.substring(index + 1);
		}
		if (StringUtils.isNotBlank(sub)) {
			sub = valiSpecialSymbol(sub);
			String wordReg = "(?i)" + sub;// 用(?i)来忽略大小写
			StringBuffer sb = new StringBuffer();
			Matcher matcher = Pattern.compile(wordReg).matcher(result);

			while (matcher.find()) {
				matcher.appendReplacement(sb, "<font color='red'>" + valiSpecialSymbol(matcher.group()) + "</font>");// 这样保证了原文的大小写没有发生变化
			}
			matcher.appendTail(sb);
			result = sb.toString();
		}
		return result;
	}

	/**
	 * @category 截取前后
	 * @return
	 */
	public static String subFirstEnd(String str) {
		if (StringUtils.isBlank(str) || "null".equals(str)) {
			return null;
		}
		else {
			@SuppressWarnings("unchecked")
			List<String> list = JSON.parseObject(str, List.class);
			if (list == null) {
				return null;
			}
			StringBuffer sbf = new StringBuffer();
			for (String s : list) {
				sbf.append(s).append(",");
			}
			String result = null;
			if (sbf.length() > 0 && sbf.indexOf(",") > 0) {
				result = sbf.substring(0, sbf.length() - 1);
			}
			return result;
		}
	}

	/**
	 * @category 截取前后
	 * @return
	 */
	public static String subFirstEndBR(String str) {
		if (StringUtils.isBlank(str) || "null".equals(str)) {
			return null;
		}
		else {
			@SuppressWarnings("unchecked")
			List<String> list = JSON.parseObject(str, List.class);
			if (list == null) {
				return null;
			}
			StringBuffer sbf = new StringBuffer();
			int i = 0;
			for (String s : list) {
				i++;
				sbf.append(s).append(",");
				if (i % 3 == 0) {
					sbf.append("<br>");
				}
			}
			String result = null;
			if (sbf.length() > 0 && sbf.indexOf(",") > 0) {
				result = sbf.substring(0, sbf.lastIndexOf(","));
			}
			return result;
		}
	}

	/**
	 * @category 截取前后
	 * @return
	 */
	public static String subFirstEndKeyWords(String keywords, String str, int len) {
		if (StringUtils.isBlank(str) || "null".equals(str)) {
			return "所有商品";
		}
		else {
			@SuppressWarnings("unchecked")
			List<String> list = JSON.parseObject(str, List.class);
			if (list == null) {
				return null;
			}
			StringBuffer sbf = new StringBuffer();
			if (len >= list.size()) {
				len = list.size();
			}
			for (int i = 0; i < len; i++) {
				String l = list.get(i);
				if (keywords.equals(l)) {
					sbf.insert(0, "<font color='red'>" + l + "</font>,");
				}
				else {
					sbf.append(l).append(",");
				}
			}
			String result = null;
			if (sbf.length() > 0 && sbf.indexOf(",") > 0) {
				result = sbf.substring(0, sbf.length() - 1);
			}

			if (list.size() > 2) {
				result += "...";
			}
			return result;
		}
	}

	/**
	 * 校验特殊符号
	 * @param sub
	 * @return
	 */
	private static String valiSpecialSymbol(String sub) {
		if (null == sub || sub.length() < 1) {
			return sub;
		}

		Pattern pattern = Pattern.compile("[^a-zA-Z0-9]");
		StringBuffer tmpBuffer = new StringBuffer();
		String tmpString = null;
		for (int i = 0; i < sub.length(); i++) {
			tmpString = sub.substring(i, i + 1);
			if (pattern.matcher(tmpString).find()) {
				tmpString = "\\" + tmpString;
			}

			tmpBuffer.append(tmpString);
		}

		return tmpBuffer.toString();
	}
}
