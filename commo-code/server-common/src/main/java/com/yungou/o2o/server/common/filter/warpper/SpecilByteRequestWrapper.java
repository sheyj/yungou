package com.yungou.o2o.server.common.filter.warpper;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;

import com.yungou.o2o.server.common.util.SpecialByteUtil;

/**
 * http请求装饰类
 * 
 */
public class SpecilByteRequestWrapper extends HttpServletRequestWrapper {

	public SpecilByteRequestWrapper(HttpServletRequest request) {
		super(request);
	}

	public String[] getParameterValues(String parameter) {
		String[] results = super.getParameterValues(parameter);
		if (results == null)
			return null;
		int count = results.length;
		String[] trimResults = new String[count];
		for (int i = 0; i < count; i++) {
			trimResults[i] = SpecialByteUtil.removeNonBmpUnicode(results[i]);
		}
		return trimResults;
	}

	public String getParameter(String name) {
		String result = super.getParameter(name);
		if (null == result) {
			return result;
		}
		return SpecialByteUtil.removeNonBmpUnicode(super.getParameter(name)
				.trim());
	}
}
