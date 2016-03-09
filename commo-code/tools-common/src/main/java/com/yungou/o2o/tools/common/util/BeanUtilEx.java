package com.yungou.o2o.tools.common.util;

import java.lang.reflect.InvocationTargetException;
import java.math.BigDecimal;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.beanutils.ConvertUtils;
import org.apache.commons.beanutils.converters.BigDecimalConverter;
import org.apache.commons.beanutils.converters.IntegerConverter;
import org.apache.commons.beanutils.converters.LongConverter;
import org.apache.commons.beanutils.converters.SqlDateConverter;
import org.apache.commons.beanutils.converters.SqlTimeConverter;
import org.apache.commons.beanutils.converters.SqlTimestampConverter;

/**
 * 
 * @author yao.l
 *
 */
public class BeanUtilEx extends BeanUtils
{
    private BeanUtilEx() {}
    
    static
    {
        ConvertUtils.register(new IntegerConverter(null), Integer.class);
        ConvertUtils.register(new LongConverter(null), Long.class);
        ConvertUtils.register(new SqlDateConverter(null), java.sql.Date.class);
        ConvertUtils.register(new SqlTimestampConverter(null), java.sql.Timestamp.class);
        ConvertUtils.register(new SqlTimeConverter(null), java.sql.Time.class);
        ConvertUtils.register(new SqlTimeConverter(null), java.sql.Time.class);
        ConvertUtils.register(new BigDecimalConverter(null), BigDecimal.class);
    }
    
    public static void copyProperties(Object target, Object source) throws IllegalAccessException, InvocationTargetException
    {
        new BeanUtilEx();
        BeanUtils.copyProperties(target, source);
    }
    
}
