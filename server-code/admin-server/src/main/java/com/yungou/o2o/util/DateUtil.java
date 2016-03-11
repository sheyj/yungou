package com.yungou.o2o.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

/**
 * 
 * 日期时间工具类
 * 
 * @author xian.yq
 * @date 2013-8-7 上午10:26:41
 * @version 0.1.0 
 * @copyright yougou.com
 */
public class DateUtil {
	
    public String formatDate(java.util.Date date) {
        return formatDateByFormat(date, "yyyy-MM-dd");
    }

    public static String formatDateByFormat(java.util.Date date, String format) {
        String result = "";
        if (date != null) {
            try {
                SimpleDateFormat sdf = new SimpleDateFormat(format);
                result = sdf.format(date);
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }
        return result;
    }

    public static java.util.Date parseDate(java.sql.Date date) {
        return date;
    }

    public static java.sql.Date parseSqlDate(java.util.Date date) {
        if (date != null) {
            return new java.sql.Date(date.getTime());
        } else {
            return null;
        }
    }

    public static String format(java.util.Date date, String format) {
        String result = "";
        try {
            if (date != null) {
                java.text.DateFormat df = new java.text.SimpleDateFormat(format);
                result = df.format(date);
            }
        } catch (Exception e) {
        }
        return result;
    }

    public static String format(java.util.Date date) {
        return format(date, "yyyy/MM/dd");
    }

    public static String format1(java.util.Date date) {
        return format(date, "yyyy-MM-dd");
    }
    public static String formatYYMM(java.util.Date date) {
        return format(date, "yyyy-MM");
    }
    public static int getYear(java.util.Date date) {
        java.util.Calendar c = java.util.Calendar.getInstance();
        c.setTime(date);
        return c.get(java.util.Calendar.YEAR);
    }

    public static int getMonth(java.util.Date date) {
        java.util.Calendar c = java.util.Calendar.getInstance();
        c.setTime(date);
        return c.get(java.util.Calendar.MONTH) + 1;
    }

    public static int getDay(java.util.Date date) {
        java.util.Calendar c = java.util.Calendar.getInstance();
        c.setTime(date);
        return c.get(java.util.Calendar.DAY_OF_MONTH);
    }

    public static int getHour(java.util.Date date) {
        java.util.Calendar c = java.util.Calendar.getInstance();
        c.setTime(date);
        return c.get(java.util.Calendar.HOUR_OF_DAY);
    }

    public static int getMinute(java.util.Date date) {
        java.util.Calendar c = java.util.Calendar.getInstance();
        c.setTime(date);
        return c.get(java.util.Calendar.MINUTE);
    }

    public static int getSecond(java.util.Date date) {
        java.util.Calendar c = java.util.Calendar.getInstance();
        c.setTime(date);
        return c.get(java.util.Calendar.SECOND);
    }

    public static long getMillis(java.util.Date date) {
        java.util.Calendar c = java.util.Calendar.getInstance();
        c.setTime(date);
        return c.getTimeInMillis();
    }

    public static int getWeek(java.util.Date date) {
        java.util.Calendar c = java.util.Calendar.getInstance();
        c.setTime(date);
        int dayOfWeek = c.get(java.util.Calendar.DAY_OF_WEEK);
        dayOfWeek = dayOfWeek - 1;
        if (dayOfWeek == 0) {
            dayOfWeek = 7;
        }
        return dayOfWeek;
    }

    public static String getDate(java.util.Date date) {
        return format(date, "yyyy/MM/dd");
    }

    public static String getDate(java.util.Date date,String formatStr) {
        return format(date, formatStr);
    }


    public static String getTime(java.util.Date date) {
        return format(date, "HH:mm:ss");
    }

    public static String getDateTime(java.util.Date date) {
        return format(date, "yyyy-MM-dd HH:mm:ss");
    }
    
    
    /**
     * 日期相加
     * @param date Date
     * @param day int
     * @return Date
     */
    public static java.util.Date addDate(java.util.Date date, int day) {
        java.util.Calendar c = java.util.Calendar.getInstance();
        c.setTimeInMillis(getMillis(date) + ((long) day) * 24 * 3600 * 1000);
        return c.getTime();
    }

    /**
     * 日期相减
     * @param date Date
     * @param date1 Date
     * @return int
     */
    public static int diffDate(java.util.Date date, java.util.Date date1) {
        return (int) ((getMillis(date) - getMillis(date1)) / (24 * 3600 * 1000));
    }
    
    /**
     * 日期相减(返回秒值)
     * @param date Date
     * @param date1 Date
     * @return int
     * @author 
     */
    public static Long diffDateTime(java.util.Date date, java.util.Date date1) {
        return (Long) ((getMillis(date) - getMillis(date1))/1000);
    }

    public static java.util.Date getdate(String date) throws Exception {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        return sdf.parse(date);
    }

    public static java.util.Date getdate1(String date) throws Exception {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        return sdf.parse(date);
    }
    
    public static java.util.Date getMaxTimeByStringDate(String date) throws Exception {
    	String maxTime = date + " 23:59:59";
    	SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    	return sdf.parse(maxTime);
    }
    /**
     * 获得当前时间
     * @return
     */
    public static Date getCurrentDateTime()
    {
    	Date date=new Date();
    	SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");    	
        String result = DateUtil.getDateTime(date);
    	try {
			return sdf.parse(result);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
    	
    }
    
    public static String getCurrentDateTimeToStr() {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
		return sdf.format(getCurrentDateTime());
	}
    
    public static String getCurrentDateToStr() {
    	Date date=new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
		return sdf.format(date);
	}
    
    public static String getCurrentDateTimeToStr2() {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		return sdf.format(getCurrentDateTime());
	}

    public static Long getWmsupdateDateTime() {
		Calendar cl=Calendar.getInstance();
		
		return cl.getTimeInMillis();
	}
    
    public static Integer getLeftSeconds(String date)throws Exception{
    	SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    	Date condition = sdf.parse(date);
    	long n = condition.getTime();
    	long s = sdf.parse(getCurrentDateTimeToStr2()).getTime();
//    	System.out.println("开始时间:"+date+"-->"+(int)((s-n)/1000));
    	return (int)((s-n)/1000);
    }
    
    /**
     * 获得时间戳
     * @return
     * @throws Exception
     */
    public static String getTime(){
    	Date date=new Date();
    	return String.valueOf(date.getTime());
    }
    
    public static void main(String[] args) {
        try {
        	System.out.println(getLeftSeconds("2011-12-29 23:33:09"));
        	System.out.println(Math.abs(-1110));
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }
    
    
}
