package com.yungou.o2o.tools.common.util;

import com.yungou.o2o.tools.common.model.LatLon;

/**
 * 坐标测距工具类.
 * 
 * @author yu.jz
 * @date 2014-7-4 15:06:34
 * @version 0.1.0
 * @copyright yougou.com
 */
public class DistanceUtil
{
    private static double DEF_PI = Math.PI; // PI
    private static double DEF_2PI = Math.PI * 2; // 2*PI
    private static double DEF_PI180 = Math.PI / 180; // PI/180.0
    private static double DEF_R = 6370997; // radius of earth
    
    /**
     * 根据勾股定理获取坐标间距离
     * 
     * @return double 坐标间距离
     */
    public static double GetShortDistance(LatLon l_1, LatLon l_2)
    {
        double ew1, ns1, ew2, ns2;
        double dx, dy, dew;
        double distance;
        // 角度转换为弧度
        ew1 = l_1.getLon() * DEF_PI180;
        ns1 = l_1.getLat() * DEF_PI180;
        ew2 = l_2.getLon() * DEF_PI180;
        ns2 = l_2.getLat() * DEF_PI180;
        // 经度差
        dew = ew1 - ew2;
        // 若跨东经和西经180 度，进行调整
        if (dew > DEF_PI)
        {
            dew = DEF_2PI - dew;
        }
        else if (dew < -DEF_PI)
        {
            dew = DEF_2PI + dew;
        }
        dx = DEF_R * Math.cos(ns1) * dew; // 东西方向长度(在纬度圈上的投影长度)
        dy = DEF_R * (ns1 - ns2); // 南北方向长度(在经度圈上的投影长度)
        // 勾股定理求斜边长
        distance = Math.sqrt((dx * dx) + (dy * dy));
        return distance;
    }
    
    /**
     * 根据圆弧获取坐标间距离
     * 
     * @return double 坐标间距离
     */
    public static double GetLongDistance(LatLon l_1, LatLon l_2)
    {
        double ew1, ns1, ew2, ns2;
        double distance;
        // 角度转换为弧度
        ew1 = l_1.getLon() * DEF_PI180;
        ns1 = l_1.getLat() * DEF_PI180;
        ew2 = l_2.getLon() * DEF_PI180;
        ns2 = l_2.getLat() * DEF_PI180;
        // 求大圆劣弧与球心所夹的角(弧度)
        distance = (Math.sin(ns1) * Math.sin(ns2)) + (Math.cos(ns1) * Math.cos(ns2) * Math.cos(ew1 - ew2));
        // 调整到[-1..1]范围内，避免溢出
        if (distance > 1.0)
        {
            distance = 1.0;
        }
        else if (distance < -1.0)
        {
            distance = -1.0;
        }
        // 求大圆劣弧长度
        distance = DEF_R * Math.acos(distance);
        return distance;
    }
    
}
