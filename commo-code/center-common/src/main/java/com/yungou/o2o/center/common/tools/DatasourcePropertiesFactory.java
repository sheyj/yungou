package com.yungou.o2o.center.common.tools;

import java.math.BigInteger;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.spec.SecretKeySpec;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 数据源用户名/密码加解密工厂类.
 * @version 0.1.0
 */
public class DatasourcePropertiesFactory
{
    private static final Logger LOG = LoggerFactory.getLogger(DatasourcePropertiesFactory.class);
    private static final String PRODUCTION_MODE = "true";
    private static final String DEFAULT_SECURE_KEY = "5c66d4f345d1762a";
    private static final String ALGORITHM = "Blowfish";
    
    public static String getPassword(String pwd, String production) throws Exception
    {
        if (PRODUCTION_MODE.equalsIgnoreCase(production != null ? production.trim() : ""))
        {
            try
            {
                return decode(pwd);
            }
            catch (Exception e)
            {
                LOG.error("数据库密码解析异常: " + e.toString(), e);
                throw e;
            }
        }
        else
        {
            return pwd;
        }
    }
    
    public static String encode(String secret) throws NoSuchAlgorithmException, NoSuchPaddingException, InvalidKeyException,
            IllegalBlockSizeException, BadPaddingException
    {
        byte[] kbytes = DEFAULT_SECURE_KEY.getBytes();
        SecretKeySpec key = new SecretKeySpec(kbytes, ALGORITHM);
        
        Cipher cipher = Cipher.getInstance(ALGORITHM);
        cipher.init(Cipher.ENCRYPT_MODE, key);
        byte[] encoding = cipher.doFinal(secret.getBytes());
        BigInteger n = new BigInteger(encoding);
        return n.toString(16);
    }
    
    public static String decode(String secret) throws NoSuchAlgorithmException, NoSuchPaddingException, InvalidKeyException,
            IllegalBlockSizeException, BadPaddingException
    {
        byte[] kbytes = DEFAULT_SECURE_KEY.getBytes();
        SecretKeySpec key = new SecretKeySpec(kbytes, ALGORITHM);
        
        BigInteger n = new BigInteger(secret, 16);
        byte[] encoding = n.toByteArray();
        Cipher cipher = Cipher.getInstance(ALGORITHM);
        cipher.init(Cipher.DECRYPT_MODE, key);
        byte[] decode = cipher.doFinal(encoding);
        return new String(decode);
    }
    
}
