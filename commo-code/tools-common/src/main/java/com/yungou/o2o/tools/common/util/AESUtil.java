package com.yungou.o2o.tools.common.util;

import java.security.SecureRandom;

import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * @category 对称加密
 */
public class AESUtil
{
    private static final Logger LOG = LoggerFactory.getLogger(AESUtil.class);
    public static final String TOKEN = "Go fuck youself";
    
    /**
     * 加密 .
     */
    public static byte[] encrypt(String content, String password)
    {
        try
        {
            KeyGenerator kgen = KeyGenerator.getInstance("AES");
            SecureRandom random = SecureRandom.getInstance("SHA1PRNG");
            random.setSeed(password.getBytes());
            kgen.init(128, random);
            SecretKey secretKey = kgen.generateKey();
            byte[] enCodeFormat = secretKey.getEncoded();
            SecretKeySpec key = new SecretKeySpec(enCodeFormat, "AES");
            Cipher cipher = Cipher.getInstance("AES");// 创建密码器
            byte[] byteContent = content.getBytes("utf-8");
            cipher.init(Cipher.ENCRYPT_MODE, key);// 初始化
            byte[] result = cipher.doFinal(byteContent);
            return result; // 加密
        }
        catch (Exception e)
        {
            LOG.error("加密:{}抛出异常,", content, e);
        }
        return null;
    }
    
    /**
     * 解密
     */
    public static byte[] decrypt(byte[] content, String password)
    {
        try
        {
            KeyGenerator kgen = KeyGenerator.getInstance("AES");
            SecureRandom random = SecureRandom.getInstance("SHA1PRNG");
            random.setSeed(password.getBytes());
            kgen.init(128, random);
            SecretKey secretKey = kgen.generateKey();
            byte[] enCodeFormat = secretKey.getEncoded();
            SecretKeySpec key = new SecretKeySpec(enCodeFormat, "AES");
            Cipher cipher = Cipher.getInstance("AES");// 创建密码器
            cipher.init(Cipher.DECRYPT_MODE, key);// 初始化
            byte[] result = cipher.doFinal(content);
            return result; // 加密
        }
        catch (Exception e)
        {
            LOG.error("解密:{}抛出异常,", content, e);
        }
        return null;
    }
    
    /**
     * 将二进制转换成16进制
     */
    public static String parseByte2HexStr(byte buf[])
    {
        StringBuffer sb = new StringBuffer();
        for (byte element : buf)
        {
            String hex = Integer.toHexString(element & 0xFF);
            if (hex.length() == 1)
            {
                hex = '0' + hex;
            }
            sb.append(hex.toUpperCase());
        }
        return sb.toString();
    }
    
    /**
     * 将16进制转换为二进制
     */
    public static byte[] parseHexStr2Byte(String hexStr)
    {
        if (hexStr.length() < 1)
        {
            return null;
        }
        byte[] result = new byte[hexStr.length() / 2];
        for (int i = 0; i < (hexStr.length() / 2); i++)
        {
            int high = Integer.parseInt(hexStr.substring(i * 2, (i * 2) + 1), 16);
            int low = Integer.parseInt(hexStr.substring((i * 2) + 1, (i * 2) + 2), 16);
            result[i] = (byte) ((high * 16) + low);
        }
        return result;
    }
}
