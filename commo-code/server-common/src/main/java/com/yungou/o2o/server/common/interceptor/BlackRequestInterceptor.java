package com.yungou.o2o.server.common.interceptor;

import java.lang.reflect.Method;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

/**
 * 黑名单拦截器
 * 
 * @author user
 * @date 2016-2-24 下午3:01:25
 * @version 1.0.0 
 * @copyright wonhigh.net.cn 
 */
public abstract class BlackRequestInterceptor extends HandlerInterceptorAdapter {
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		HandlerMethod method = (HandlerMethod) handler;
		Method requestMethod = method.getMethod();
		Permission permission = requestMethod.getAnnotation(Permission.class);
		// 值不为空且为true时才去对会员进行黑名单判断
		if (permission != null && permission.blackListValid()) {
			return this.processBlack(request);
		}
		return true;
	}

	/**
	 * 处理黑名单
	 * @param request HttpServletRequest
	 * @return boolean
	 */
	public abstract boolean processBlack(HttpServletRequest request);
}
