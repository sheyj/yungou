package com.yungou.o2o.server.common.interceptor;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import org.springframework.web.bind.annotation.Mapping;

/**
 * 登录验证
 **/
@Target({ ElementType.METHOD, ElementType.TYPE })
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Mapping
public @interface Permission {
	/** true为需要登录验证 */
	public boolean login() default true;

	/** true为需要黑名单会员验证 */
	public boolean blackListValid() default false;
}
