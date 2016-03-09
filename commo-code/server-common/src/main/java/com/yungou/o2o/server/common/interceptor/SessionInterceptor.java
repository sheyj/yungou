package com.yungou.o2o.server.common.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import redis.clients.jedis.JedisPool;

import com.yungou.o2o.server.common.constant.ServerConstant;

/**
 * Session共享拦截器
 * @author lin.zb
 */
public abstract class SessionInterceptor extends HandlerInterceptorAdapter
{
    /**
     * 获取JedisPool
     * @return JedisPool
     */
	public abstract JedisPool getJedisPool();
	
	/**
	 * 获取共享Session key
	 * @return String
	 */
	public abstract String getSharedKey(HttpServletRequest request, HttpServletResponse response);
	
	/**
	 * 是否创建session当查询不到session时
	 * @return boolean
	 */
	public abstract boolean isCreateWhenSessionNotfound();
	
	/**
	 * 判断是否删除共享Session
	 * 当返回true时，会删除共享Session
	 * @return boolean
	 */
	public abstract boolean isClearSession(HttpServletRequest request);
	
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception
	{
	    // 设置允许跨域
	    response.setHeader("Access-Control-Allow-Origin", "*");
	    
	    String shareKey = getSharedKey(request, response);
	    if (null != shareKey)
	    {
	        // 获取共享HttpSession
	        request.setAttribute(ServerConstant.CURRENT_USER, shareKey);
	        SerializableSession.getHttpSession(request, getJedisPool());
	    }
	    else
	    {
	        request.getSession(true);
	    }
	    
		return true;
	}
	
	@Override
	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception
	{
	    // 如果是登出
	    if (isClearSession(request))
	    {
	        // 删除SerializableSession
            request.setAttribute(ServerConstant.CURRENT_USER, getSharedKey(request, response));
	        SerializableSession.removeSerializableSession(request, getJedisPool());
	    }
	    else
	    {
	        // 更新SerializableSession
	        request.setAttribute(ServerConstant.CURRENT_USER, getSharedKey(request, response));
	        SerializableSession.updateSerializableSession(request, getJedisPool(), isCreateWhenSessionNotfound());
	    }
	}
}
