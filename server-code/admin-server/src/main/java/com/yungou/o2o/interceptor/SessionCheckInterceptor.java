package com.yungou.o2o.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.yungou.o2o.common.PublicConstans;

/**
 * 拦截session
 * 
 * @author username
 * @date 2014-5-23 上午8:55:20
 * @version 0.1.0 
 * @copyright yougou.com 
 */
public class SessionCheckInterceptor extends HandlerInterceptorAdapter {

	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		
		String noFilters ="toLogin;login;logout";
		String uri = request.getRequestURI();  
		String[] list = noFilters.split(";");
		for (String filter : list) {  
            if (uri.indexOf(filter) >0) {  
            	return true; 
            }  
        }  
		
		String path = "/admin/toLogin";
		String ajaxFlag = request.getHeader("x-requested-with");
		HttpSession session = request.getSession();
		Object tempObj = null;
		if (session != null) {
			tempObj = session.getAttribute(PublicConstans.SESSION_USER);
		}
		if (tempObj == null) {
			//如果是ajax请求头会有，x-requested-with
			if ("XMLHttpRequest".equalsIgnoreCase(ajaxFlag)) {
				response.setHeader("sessionTimeOutFlag", "true");//设置标志状态
			} else {
				response.sendRedirect(path);
			}
			response.flushBuffer();
			return false;
		}


		return super.preHandle(request, response, handler); 
	}

//	private boolean isIgnoreable(Object handler) {
//    	HandlerMethod method = (HandlerMethod) handler;
//    	IgnoredInterceptors ignored=method.getMethodAnnotation(IgnoredInterceptors.class);
//    	if(ignored==null){
//    		ignored = handler.getClass().getAnnotation(IgnoredInterceptors.class);
//    	}
//
//    	return (ignored == null)? false : true;
//    }
	
}
