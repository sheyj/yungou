package com.yungou.o2o.process.common.scheduling.annotation;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * 注解定时任务
 * @author lin.zb
 */
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface LjobAnnotation
{
    /**
     * 是否分布式, 默认false
     * @return boolean
     */
    boolean distributed() default false;
    
    /**
     * 是否支持即时执行请求, 默认false
     * @return boolean
     */
    boolean supportInstantRunReq() default false;
    
    /**
     * 是否支持远程关闭定时任务, 默认false
     */
    boolean supportCloseJob() default false;
    
    /**
     * 定时任务功能描述
     * @return String
     */
    String description() default "";
}
