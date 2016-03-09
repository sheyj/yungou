package com.yungou.o2o.server.common.interceptor;

import java.io.IOException;
import java.lang.reflect.Method;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.StringUtils;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

/**
 * Controllers拦截器 1. 校验是否有登录 2. 校验是否有模块访问权限
 * 
 * @author wangc
 * 
 */
public abstract class ControllersInterceptor extends HandlerInterceptorAdapter {
	private static final Logger logger = LoggerFactory.getLogger(ControllersInterceptor.class);

	/** 请求验证参数名称 */
	public final static String appToken = "Session";

	/** redis存放app验证参数数据的key */
	public final static String redisTokenKey = "app_session_";

	/** appSession过期时间 */
	public final static int redisTokenTimeout = 60 * 60;// 10分钟

	public final static String companyUserStatuskey = "companyUserStatuskey";

	public static long moduleRolesUpdateTime = 0;

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		
		this.initUserLoginDTO(request);
		HandlerMethod method = (HandlerMethod) handler;
		Method requestMethod = method.getMethod();
		Permission permission = requestMethod.getAnnotation(Permission.class);
		if (permission == null || permission.login()) {
			// 验证是否需要登录
			if (this.filterCurrUrl(request)) {
				// 未登录
				logger.warn("没有登录，需要重新登录");
				return this.redirectLogin(request, response);
			}
		}

		// 校验当前用户是否有权限访问该模块
		if (!this.isUserLoginDTONull()) {
			String currentUrl = request.getServletPath();
			if (!this.isModuleRolesMapNull()) {
				if (!this.isModuleRolesNull(currentUrl)) {
					// 如果用户角色没有访问当前模块权限
					String roleCodes = this.getModuleRolesCodes(currentUrl);
					if (null != roleCodes && !"".equals(roleCodes) && !roleCodes.contains(getUserRoleCode())) {
						logger.warn("当前角色没有该模块访问权限, 当前角色: " + this.getUserRoleCode() + ", 当前访问模块: " + currentUrl
								+ ", 有权限访问的角色: " + roleCodes);
						return this.redirectLogin(request, response);
					}
				}
			}
		}

		return true;
	}

	// 返回是不是需要转发地址
	public boolean filterCurrUrl(HttpServletRequest res) {
		String token = res.getParameter(appToken);
		if (!StringUtils.isEmpty(token)) {
			// app
			String redisToken = this.getCachedToken(token);
			if (StringUtils.isEmpty(redisToken)) {
				return true;
			}
			return !redisToken.equals(token);
		}

		// web
		if (this.isUserLoginDTONull()) {
			return true;
		}

		if (this.getUserState().equals("2")) {
			// 账号已禁用
			return true;
		}

		if (!this.isCachedUserMapNull()) {
			if (!this.isCachedUserNull()) {
				if (this.getCachedUserState().equals("2")) {// 账号已禁用
					return true;
				}
			}
		}
		return false;
	}

	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
		if (modelAndView == null) {
			return;
		}

		if (this.isUserLoginDTONull()) {
			return;
		}

		Object buttons = request.getSession().getAttribute("buttonNos");
		if (buttons == null) {
			String buttonNos = this.getUserButtonNos();
			if (null != buttonNos) {
				request.getSession().setAttribute("buttonNos", buttonNos);
			}
		}
	}

	@Override
	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
			throws Exception {
	}

	private boolean redirectLogin(HttpServletRequest request, HttpServletResponse response) throws IOException {
		// app
		if (!StringUtils.isEmpty(request.getParameter(appToken))) {
			this.outPutJSONResult(response);
			return false;
		}

		// web
		response.sendRedirect(this.getRedirectUrl(request));
		return false;
	}

	/**
	 * 初始化userLoginDTO
	 * 
	 * @return
	 */
	public abstract void initUserLoginDTO(HttpServletRequest request);

	/**
	 * 获取用户角色代码
	 * 
	 * @return
	 */
	public abstract String getUserRoleCode();

	/**
	 * 获取用户状态
	 * 
	 * @return
	 */
	public abstract String getUserState();
	
	/**
	 * 获取缓存用户状态
	 * 
	 * @return
	 */
	public abstract String getCachedUserState();

	/**
	 * 获取缓存token
	 * 
	 * @return
	 */
	public abstract String getCachedToken(String token);

	/**
	 * UserLoginDTO 是否为空，为空返回true，否则返回false
	 * 
	 * @return
	 */
	public abstract boolean isUserLoginDTONull();

	/**
	 * Map<String, CompanyUser> 是否为空，为空返回true，否则返回false
	 * 
	 * @return
	 */
	public abstract boolean isCachedUserMapNull();

	/**
	 * CompanyUser 是否为空，为空返回true，否则返回false
	 * 
	 * @return
	 */
	public abstract boolean isCachedUserNull();

	/**
	 * moduleRolesMap 是否为空，为空返回true，否则返回false
	 * 
	 * @return
	 */
	public abstract boolean isModuleRolesMapNull();

	/**
	 * ModuleRoles 是否为空，为空返回true，否则返回false
	 * 
	 * @param currentUrl
	 * 
	 * @return
	 */
	public abstract boolean isModuleRolesNull(String currentUrl);

	/**
	 * 获取当前模块的角色代码
	 * 
	 * @param currentUrl
	 * 
	 * @return
	 */
	public abstract String getModuleRolesCodes(String currentUrl);

	/**
	 * 获取当前用户按钮代码
	 * 
	 * @return
	 */
	public abstract String getUserButtonNos();

	/**
	 * 输出JSON结果
	 * 
	 * @response
	 * 
	 * @return
	 */
	public abstract void outPutJSONResult(HttpServletResponse response) throws IOException;

	/**
	 * 获取重定向url
	 * 
	 * @return
	 */
	public abstract String getRedirectUrl(HttpServletRequest request);
}
