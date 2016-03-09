package com.yungou.o2o.process.common.util;

import java.security.MessageDigest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * MD5工具类
 * @author lin.zb
 */
public final class MD5Util
{
    private static final Logger LOG = LoggerFactory.getLogger(MD5Util.class);
    
    /**
     * 对字符串进行MD5加密
     * 
     * @param plainText String
     * @return String
     */
    public static String md5(String plainText)
    {
        MessageDigest md = null;
        byte[] byteArray = null;
        int i = 0;
        StringBuffer buf = null;
        
        try
        {
            md = MessageDigest.getInstance("MD5");
            md.update(plainText.getBytes());
            byteArray = md.digest();
            buf = new StringBuffer("");
            for (byte element : byteArray)
            {
                i = element;
                if (i < 0)
                {
                    i += 256;
                }
                if (i < 16)
                {
                    buf.append("0");
                }
                buf.append(Integer.toHexString(i));
            }
            return buf.toString();
        }
        catch (Exception e)
        {
            LOG.error(e.toString(), e);
            return "";
        }
    }
}
