package com.yungou.o2o.interceptor;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * TODO: 增加描述
 * 
 * @author username
 * @date 2014-5-23 上午8:58:47
 * @version 0.1.0 
 * @copyright yougou.com 
 */
@Target({ElementType.METHOD,ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
public @interface IgnoredInterceptors {
}
