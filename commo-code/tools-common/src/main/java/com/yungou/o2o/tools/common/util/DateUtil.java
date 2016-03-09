package com.yungou.o2o.tools.common.util;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.TimeZone;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public final class DateUtil
{
    private static final Logger LOG = LoggerFactory.getLogger(DateUtil.class);
    
    // 默认显示日期的格式
    public static final String DATE_FORMATDATE = "yyyy-MM";
    
    public static final String DATE_FORMAT = "yyyy-MM-dd";
    
    public static final String TIMEF_FORMAT = "yyyy-MM-dd HH:mm:ss";
    
    public static final String TIMEF_FORMAT24 = "yyyy-MM-dd HH24:mm:ss";
    
    // 默认显示日期时间毫秒格式
    public static final String MSEL_FORMAT = "yyyy-MM-dd HH:mm:ss.SSS";
    
    // 默认显示简体中文日期的格式
    public static final String ZHCN_DATE_FORMAT = "yyyy年MM月dd日";
    
    // 默认显示简体中文日期时间的格式
    public static final String ZHCN_TIME_FORMAT = "yyyy年MM月dd日HH时mm分ss秒";
    
    // 默认显示简体中文日期时间毫秒格式
    public static final String ZHCN_MSEL_FORMAT = "yyyy年MM月dd日HH时mm分ss秒SSS毫秒";
    
    // 获取日期串格式
    public static final String DATE_STR_FORMAT = "yyyyMMdd";
    
    // 获取日期串格式
    public static final String DATE_STR_HOUR_FORMAT = "yyyy-MM-dd HH:mm";
    
    // 获取日期时间串格式
    public static final String TIME_STR_FORMAT = "yyyyMMddHHmmss";
    
    // 获取日期时间无分串格式
    public static final String TIME_STR_WITHOU_SECOND_FORMAT = "yyyy-MM-dd HH:mm";
    
    // 获取日期时间毫秒串格式
    public static final String MSEL_STR_FORMAT = "yyyyMMddHHmmssSSS";
    
    private static DateFormat getDateFormat(String formatStr)
    {
        return new SimpleDateFormat(formatStr);
    }
    
    public static String dateToDateString(Date date, String formatStr)
    {
        DateFormat df = getDateFormat(formatStr);
        if (null == date)
        {
            return "";
        }

        return df.format(date);
    }
    
    public static String getCurrentStringDate(String strFormat)
    {
        Calendar cal = Calendar.getInstance();
        SimpleDateFormat format = new SimpleDateFormat(strFormat);
        return format.format(cal.getTime());
    }
    
    public static Date getDateByStr(String dateStr)
    {
        if (null == dateStr || "".equals(dateStr.trim()))
        {
            return null;
        }
        
        Date d = null;
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        
        try
        {
            d = sdf.parse(dateStr);
        }
        catch (ParseException e)
        {
            LOG.error(e.toString(), e);
        }
        return d;
    }
    
    public static Date getDateByFormatStr(String dateStr, String format)
    {
        if (null == dateStr || "".equals(dateStr.trim()) || null == format || "".equals(format.trim()))
        {
            return null;
        }
        
        Date d = null;
        SimpleDateFormat sdf = new SimpleDateFormat(format);
        try
        {
            d = sdf.parse(dateStr);
        }
        catch (ParseException e)
        {
            LOG.error(e.toString(), e);
        }
        return d;
    }
    
    /**
     * 获得当前月及当前月前11个月的数据
     * 
     * @return map
     */
    public static List<Map<String, String>> getLast12Month()
    {
        LinkedHashMap<String, String> retMap;
        List<Map<String, String>> retList = new ArrayList<Map<String, String>>();
        Calendar now = Calendar.getInstance(TimeZone.getDefault());
        String DATE_FORMAT = "yyyyMM";
        java.text.SimpleDateFormat sdf = new java.text.SimpleDateFormat(DATE_FORMAT);
        String yearOfMonth = null;
        String year = null;
        String month = null;
        now.add(Calendar.MONTH, 1);
        for (int i = 0; i < 12; i++)
        {
            retMap = new LinkedHashMap<String, String>();
            now.add(Calendar.MONTH, -1);
            yearOfMonth = sdf.format(now.getTime());
            year = yearOfMonth.substring(0, 4);
            month = yearOfMonth.substring(4, 6);
            retMap.put("encodeKey", yearOfMonth);
            retMap.put("encodeValue", year + "年" + month + "月");
            retList.add(retMap);
        }
        return retList;
    }
    
    /**
     * 获取当前季度和之前的三个季度
     * 
     * @return map
     */
    public static List<Map<String, String>> getLast4Quarter()
    {
        LinkedHashMap<String, String> retMap;
        List<Map<String, String>> retList = new ArrayList<Map<String, String>>();
        int year = Calendar.getInstance().get(Calendar.YEAR);
        int month = Calendar.getInstance().get(Calendar.MONTH) + 1;
        if (month <= 3)
        {
            retMap = new LinkedHashMap<String, String>();
            retMap.put("encodeKey", year + "1");
            retMap.put("encodeValue", year + "年第一季度");
            retList.add(retMap);
            retMap = new LinkedHashMap<String, String>();
            retMap.put("encodeKey", (year - 1) + "4");
            retMap.put("encodeValue", (year - 1) + "年第四季度");
            retList.add(retMap);
            retMap = new LinkedHashMap<String, String>();
            retMap.put("encodeKey", (year - 1) + "3");
            retMap.put("encodeValue", (year - 1) + "年第三季度");
            retList.add(retMap);
            retMap = new LinkedHashMap<String, String>();
            retMap.put("encodeKey", (year - 1) + "2");
            retMap.put("encodeValue", (year - 1) + "年第二季度");
            retList.add(retMap);
        }
        else if ((month > 3) && (month <= 6))
        {
            retMap = new LinkedHashMap<String, String>();
            retMap.put("encodeKey", year + "2");
            retMap.put("encodeValue", year + "年第二季度");
            retList.add(retMap);
            retMap = new LinkedHashMap<String, String>();
            retMap.put("encodeKey", year + "1");
            retMap.put("encodeValue", year + "年第一季度");
            retList.add(retMap);
            retMap = new LinkedHashMap<String, String>();
            retMap.put("encodeKey", (year - 1) + "4");
            retMap.put("encodeValue", (year - 1) + "年第四季度");
            retList.add(retMap);
            retMap = new LinkedHashMap<String, String>();
            retMap.put("encodeKey", (year - 1) + "3");
            retMap.put("encodeValue", (year - 1) + "年第三季度");
            retList.add(retMap);
        }
        else if ((month > 6) && (month <= 9))
        {
            retMap = new LinkedHashMap<String, String>();
            retMap.put("encodeKey", year + "3");
            retMap.put("encodeValue", year + "年第三季度");
            retList.add(retMap);
            retMap = new LinkedHashMap<String, String>();
            retMap.put("encodeKey", year + "2");
            retMap.put("encodeValue", year + "年第二季度");
            retList.add(retMap);
            retMap = new LinkedHashMap<String, String>();
            retMap.put("encodeKey", year + "1");
            retMap.put("encodeValue", year + "年第一季度");
            retList.add(retMap);
            retMap = new LinkedHashMap<String, String>();
            retMap.put("encodeKey", (year - 1) + "4");
            retMap.put("encodeValue", (year - 1) + "年第四季度");
            retList.add(retMap);
        }
        else
        {
            retMap = new LinkedHashMap<String, String>();
            retMap.put("encodeKey", year + "4");
            retMap.put("encodeValue", year + "年第四季度");
            retList.add(retMap);
            retMap = new LinkedHashMap<String, String>();
            retMap.put("encodeKey", year + "3");
            retMap.put("encodeValue", year + "年第三季度");
            retList.add(retMap);
            retMap = new LinkedHashMap<String, String>();
            retMap.put("encodeKey", year + "2");
            retMap.put("encodeValue", year + "年第二季度");
            retList.add(retMap);
            retMap = new LinkedHashMap<String, String>();
            retMap.put("encodeKey", year + "1");
            retMap.put("encodeValue", year + "年第一季度");
            retList.add(retMap);
        }
        return retList;
    }
    
    public static Date getNextDay()
    {
        Calendar cal = Calendar.getInstance();
        Date date = new Date();
        cal.setTime(date);
        cal.add(5, 1);
        return cal.getTime();
    }
    
    public static Date getNextStartDay()
    {
        Calendar cal = Calendar.getInstance();
        Date date = new Date();
        cal.setTime(date);
        cal.add(5, 1);
        cal.set(Calendar.HOUR_OF_DAY, 0);
        cal.set(Calendar.MINUTE, 0);
        cal.set(Calendar.SECOND, 0);
        cal.set(Calendar.MILLISECOND, 0);
        return cal.getTime();
    }
    
    public static Date getNextDay(Date date, int day)
    {
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        cal.add(5, day);
        return cal.getTime();
    }
    
    public static Date getLastMonth(Date date, int month)
    {
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        cal.add(Calendar.MONTH, -month);
        return cal.getTime();
    }
    
    public static String getWeek(Date date, int day, int n)
    {
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        cal.setFirstDayOfWeek(Calendar.MONDAY);
        cal.add(Calendar.DATE, n * 7);
        cal.set(Calendar.DAY_OF_WEEK, day);
        return new SimpleDateFormat("yyyy-MM-dd").format(cal.getTime());
        
    }
    
    public static Date getNextYear(Date date, int year)
    {
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        cal.add(Calendar.YEAR, year);
        return cal.getTime();
    }
    
    public static Date getNextMinute(Date date, int minute)
    {
        return new Date(date.getTime() + (minute * 60L * 1000L));
    }
    
    public static Date getNextMonthFirstDay()
    {
        Calendar cal = Calendar.getInstance();
        Date date = new Date();
        cal.setTime(date);
        cal.add(2, 1);
        cal.set(5, 1);
        return cal.getTime();
    }
    
    public static String getCurMonthFirstDay(Date date)
    {
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        cal.add(2, 0);
        cal.set(5, 1);
        return new SimpleDateFormat("yyyy-MM-dd").format(cal.getTime());
    }
    
    /**
     * 获取当月的第一天
     * @return
     */
    public static String getFirstDayOfMonth()
    {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        Calendar c = Calendar.getInstance();
        c.add(Calendar.MONTH, 0);
        c.set(Calendar.DAY_OF_MONTH, 1);// 设置为1号,当前日期既为本月第一天
        String first = format.format(c.getTime());
        return first;
    }
    
    /**
     * 获取当月的最后一天
     * @return
     */
    public static String getLastDayOfMonth()
    {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        Calendar ca = Calendar.getInstance();
        ca.set(Calendar.DAY_OF_MONTH, ca.getActualMaximum(Calendar.DAY_OF_MONTH));
        String last = format.format(ca.getTime());
        return last;
    }
    
    /**
     * java Date 转sql Date
     * @param javaDate
     * @return
     */
    public static java.sql.Date getSqlDateByJavaDate(java.util.Date javaDate)
    {
        if (null == javaDate)
        {
            return null;
        }
        java.sql.Date sqlDate = new java.sql.Date(javaDate.getTime());
        return sqlDate;
    }
    
    public static Date getValidTimeDate()
    {
        String dataString = dateToDateString(new Date(), DATE_FORMAT);
        String timeString = "00:00:00";
        return getDateByFormatStr(dataString + timeString, TIMEF_FORMAT24);
    }
}