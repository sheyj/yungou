package com.yungou.o2o.tools.common.util;

import com.yungou.o2o.tools.common.model.LatLon;

/**
 * 坐标转换器.
 * 
 * @author yu.jz
 * @date 2014-7-7 16:28:27
 * @version 0.1.0
 * @copyright yougou.com
 */
public final class CoordinateConvert
{
    private static final double X_PI = (Math.PI * 3000.0) / 180.0;
    
    /**
     * 中国正常坐标系GCJ02协议的坐标，转到 百度地图对应的 BD09 协议坐标
     * 
     * @param double lat 维度
     * @param double lon 经度
     * */
    public static LatLon Convert_GCJ02_To_BD09(LatLon l)
    {
        double x = l.getLon(), y = l.getLat();
        double z = Math.sqrt((x * x) + (y * y)) + (0.00002 * Math.sin(y * X_PI));
        double theta = Math.atan2(y, x) + (0.000003 * Math.cos(x * X_PI));
        
        return new LatLon((z * Math.sin(theta)) + 0.006, (z * Math.cos(theta)) + 0.0065);
    }
    
    /**
     * 百度地图对应的 BD09 协议坐标，转到 中国正常坐标系GCJ02协议的坐标
     * 
     * @param double lat 维度
     * @param double lon 经度
     * */
    public static LatLon Convert_BD09_To_GCJ02(LatLon l)
    {
        double x = l.getLon() - 0.0065, y = l.getLat() - 0.006;
        double z = Math.sqrt((x * x) + (y * y)) - (0.00002 * Math.sin(y * X_PI));
        double theta = Math.atan2(y, x) - (0.000003 * Math.cos(x * X_PI));
        
        return new LatLon(z * Math.sin(theta), z * Math.cos(theta));
    }
    
}
