package com.yungou.o2o.process.common.util;

import java.net.Inet4Address;
import java.net.InetAddress;
import java.net.NetworkInterface;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 工具类
 * @author lin.zb
 */
public final class CommonUtil
{
    private static final Logger LOG = LoggerFactory.getLogger(CommonUtil.class);
    
    /**
     * 获取本地IP
     * @return
     */
    public static String getLocalIP()
    {
        List<String> ipList = getLocalIPList();
        if (null == ipList || ipList.size() == 0)
        {
            return null;
        }
        
        if (ipList.size() == 1)
        {
            return ipList.get(0);
        }
        
        for (String ip : ipList)
        {
            if (!"127.0.0.1".equals(ip))
            {
                return ip;
            }
        }
        
        return ipList.get(0);
    }
    
    /**
     * 获取本地IP列表
     * @return
     */
    public static List<String> getLocalIPList()
    {
        List<String> ipList = new ArrayList<String>();
        Enumeration<NetworkInterface> networkInterfaces = null;
        NetworkInterface networkInterface = null;
        Enumeration<InetAddress> inetAddresses = null;
        InetAddress inetAddress = null;
        String ip = null;
        
        try
        {
            networkInterfaces = NetworkInterface.getNetworkInterfaces();
            while (networkInterfaces.hasMoreElements())
            {
                networkInterface = networkInterfaces.nextElement();
                inetAddresses = networkInterface.getInetAddresses();
                while (inetAddresses.hasMoreElements())
                {
                    inetAddress = inetAddresses.nextElement();
                    if (inetAddress != null && inetAddress instanceof Inet4Address)
                    { 
                        // IPV4
                        ip = inetAddress.getHostAddress();
                        ipList.add(ip);
                    }
                }
            }
        }
        catch (Exception e)
        {
            LOG.error(e.toString(), e);
        }
        
        return ipList;
    }
}
