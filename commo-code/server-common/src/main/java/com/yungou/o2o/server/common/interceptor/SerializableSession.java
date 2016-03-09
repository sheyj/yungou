package com.yungou.o2o.server.common.interceptor;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.Serializable;
import java.util.Enumeration;
import java.util.Locale;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.exceptions.JedisConnectionException;

import com.yungou.o2o.server.common.constant.ServerConstant;

/**
 * SerializableSession
 * @author lin.zb
 */
public class SerializableSession implements Serializable
{
    private static final Logger logger = LoggerFactory.getLogger(SerializableSession.class);
    
    private static final long serialVersionUID = 7047555077510695927L;
    
    private static final int SESSION_TIME_OUT = 1800;
    
    public ConcurrentHashMap<String, Object> concurrentHashMap = new ConcurrentHashMap<String, Object>();
    
    /**
     * 构造方法
     * @param httpSession HttpSession
     */
    @SuppressWarnings("unchecked")
    public SerializableSession(HttpSession httpSession)
    {
        String attributeName = null;
        Object attributeValue = null;
        Enumeration<String> attributeNames = httpSession.getAttributeNames();
        
        if (null != attributeNames)
        {
            while (attributeNames.hasMoreElements())
            {
                attributeName = attributeNames.nextElement();
                attributeValue = httpSession.getAttribute(attributeName);
                concurrentHashMap.put(attributeName, attributeValue);
            }
        }
    }
    
    /**
     * 更新SerializableSession
     * @param httpSession HttpSession
     */
    @SuppressWarnings("unchecked")
    public static void updateSerializableSession(HttpServletRequest request, JedisPool redisPool, boolean isCreateSession)
    {
        String attributeName = null;
        Object attributeValue = null;
        HttpSession httpSession = request.getSession();
        Enumeration<String> attributeNames = httpSession.getAttributeNames();
        
        if (null != attributeNames)
        {
            Jedis jedis = null;
            SerializableSession serializableSession = null;
            String key = null;
            
            try
            {
                // 获取SerializableSession
                key = getSessionKey(request);
                if (null == key)
                {
                    return;
                }
                
                jedis = redisPool.getResource();
                serializableSession = SerializableSession.toSerializableSession(jedis.get(key.getBytes()));
                if (null == serializableSession)
                {
                    if (!isCreateSession)
                    {
                        return;
                    }
                    
                    logger.info("创建SerializableSession, key: " + key);
                    serializableSession = new SerializableSession(request.getSession());
                }
                else
                {
                    // 更新SerializableSession
                    while (attributeNames.hasMoreElements())
                    {
                        attributeName = attributeNames.nextElement();
                        attributeValue = httpSession.getAttribute(attributeName);
                        serializableSession.concurrentHashMap.put(attributeName, attributeValue);
                    }
                }
                
                jedis.setex(key.getBytes(), SESSION_TIME_OUT, serializableSession.toByte());
            }
            catch (JedisConnectionException e)
            {
                if (null != jedis)
                {
                    redisPool.returnBrokenResource(jedis);
                    jedis = null;
                }
                
                logger.error("更新SerializableSession异常：" + e.toString(), e);
            }
            catch (Exception e)
            {
                logger.error("更新SerializableSession异常：" + e.toString(), e);
            }
            finally
            {
                if (null != jedis)
                {
                    try
                    {
                        redisPool.returnResource(jedis);
                    }
                    catch (Exception e)
                    {
                        logger.error(e.toString(), e);
                    }
                }
            }
        }
    }
    
    /**
     * 获取HttpSession
     * @param request HttpServletRequest
     * @param redisPool JedisPool
     * @return HttpSession
     */
    public static HttpSession getHttpSession(HttpServletRequest request, JedisPool redisPool)
    {
        HttpSession httpSession = request.getSession();
        SerializableSession serializableSession = SerializableSession.getSerializableSession(request, redisPool);
        if (null != serializableSession)
        {
            // 更新HttpSession
            Set<String> keys = serializableSession.concurrentHashMap.keySet();
            if (null != keys)
            {
                for (String key : keys)
                {
                    try
                    {
                        httpSession.setAttribute(key, serializableSession.concurrentHashMap.get(key));
                    }
                    catch (Exception e)
                    {
                        logger.error(e.toString(), e);
                    }
                }
            }
        }
        else
        {
            logger.warn("无法获取到该共享session, key: " + getSessionKey(request));
            @SuppressWarnings("unchecked")
            Enumeration<String> attributeNames = httpSession.getAttributeNames();
            if (null != attributeNames)
            {
                String attributeName = null;
                while (attributeNames.hasMoreElements())
                {
                    attributeName = attributeNames.nextElement();
                    httpSession.removeAttribute(attributeName);
                }
            }
        }
        
        return httpSession;
    }
    
    /**
     * 转换成字节数组
     * @return byte[]
     */
    public byte[] toByte()
    {
        ByteArrayOutputStream bos = null;
        ObjectOutputStream oos = null;
        
        try
        {
            bos = new ByteArrayOutputStream();
            oos = new ObjectOutputStream(bos);
            oos.writeObject(this);
            oos.flush();
            return bos.toByteArray();
        }
        catch (Exception e)
        {
            logger.error(e.toString(), e);
            return null;
        }
        finally
        {
            if (null != oos)
            {
                try
                {
                    oos.close();
                }
                catch (IOException e)
                {
                    logger.error(e.toString(), e);
                }
            }
            
            if (null != bos)
            {
                try
                {
                    bos.close();
                }
                catch (IOException e)
                {
                    logger.error(e.toString(), e);
                }
            }
        }
    }
    
    /**
     * 转换成SerializableSession
     * @param bytes 字节数组
     * @return SerializableSession
     */
    public static SerializableSession toSerializableSession(byte[] bytes)
    {
        if (null == bytes)
        {
            return null;
        }
        
        SerializableSession obj = null;
        ByteArrayInputStream bis = null;
        ObjectInputStream ois = null;
        
        try
        {
            bis = new ByteArrayInputStream(bytes);
            ois = new ObjectInputStream(bis);
            obj = (SerializableSession) ois.readObject();
            return obj;
        }
        catch (Exception e)
        {
            logger.error(e.toString(), e);
            return null;
        }
        finally
        {
            if (null != ois)
            {
                try
                {
                    ois.close();
                }
                catch (IOException e)
                {
                    logger.error(e.toString(), e);
                }
            }
            
            if (null != bis)
            {
                try
                {
                    bis.close();
                }
                catch (IOException e)
                {
                    logger.error(e.toString(), e);
                }
            }
        }
    }
    
    /**
     * 获取SerializableSession
     * @param request HttpServletRequest
     * @param redisPool JedisPool
     * @return
     */
    public static SerializableSession getSerializableSession(HttpServletRequest request, JedisPool redisPool)
    {
        Jedis jedis = null;
        String key = null;
        
        try
        {
            jedis = redisPool.getResource();
            key = getSessionKey(request);
            if (null == key)
            {
                return null;
            }
            
            return SerializableSession.toSerializableSession(jedis.get(key.getBytes()));
        }
        catch (JedisConnectionException e)
        {
            if (null != jedis)
            {
                redisPool.returnBrokenResource(jedis);
                jedis = null;
            }
            
            logger.error("获取SerializableSession异常：" + e.toString(), e);
            return null;
        }
        catch (Exception e)
        {
            logger.error("获取SerializableSession异常：" + e.toString(), e);
            return null;
        }
        finally
        {
            if (null != jedis)
            {
                try
                {
                    redisPool.returnResource(jedis);
                }
                catch (Exception e)
                {
                    logger.error(e.toString(), e);
                }
            }
        }
    }
    
    /**
     * 获取SerializableSession主键
     * @param request
     * @return
     */
    public static String getSessionKey(HttpServletRequest request)
    {
        String currentUser = (String) request.getAttribute(ServerConstant.CURRENT_USER);
        if (null == currentUser)
        {
            currentUser = request.getParameter(ServerConstant.CURRENT_USER);
            if (null == currentUser)
            {
                logger.info("HttpServletRequest中currentUser参数为空, 无法获取共享session key.");
                return null;
            }
        }
        
        String userAgent = request.getHeader("User-Agent");
        if (null != userAgent)
        {
            userAgent = userAgent.toLowerCase(Locale.getDefault());
            if (userAgent.indexOf("firefox") != -1)
            {
                userAgent = "firefox";
            }
            else if (userAgent.indexOf("chrome") != -1)
            {
                userAgent = "chorme";
            }
            else if (userAgent.indexOf("android") != -1)
            {
                userAgent = "android";
            }
            else if (userAgent.indexOf("apple") != -1)
            {
                userAgent = "apple";
            }
            else
            {
                userAgent = "others";
            }
        }
        else
        {
            userAgent = "others";
        }
        
        // return getIpAddr(request) + "_" + userAgent + "_" + currentUser + "_session";
        return userAgent + "_" + currentUser + "_session";
    }
    
    /**
     * 删除SerializableSession
     * @param request HttpServletRequest
     * @param redisPool JedisPool
     */
    public static void removeSerializableSession(HttpServletRequest request, JedisPool redisPool)
    {
        Jedis jedis = null;
        String key = null;
        
        try
        {
            jedis = redisPool.getResource();
            key = getSessionKey(request);
            
            if (null != key)
            {
                logger.info("删除SerializableSession, key: " + key);
                jedis.del(key.getBytes());
            }
        }
        catch (JedisConnectionException e)
        {
            if (null != jedis)
            {
                redisPool.returnBrokenResource(jedis);
                jedis = null;
            }
            
            logger.error("删除SerializableSession异常：" + e.toString(), e);
        }
        catch (Exception e)
        {
            logger.error("删除SerializableSession异常：" + e.toString(), e);
        }
        finally
        {
            if (null != jedis)
            {
                try
                {
                    redisPool.returnResource(jedis);
                }
                catch (Exception e)
                {
                    logger.error(e.toString(), e);
                }
            }
        }
    }
    
    /**
     * 获取真实IP地址
     * @param request HttpServletRequest
     * @return String IP地址
     */
    public static String getIpAddr(HttpServletRequest request)
    {
        String ip = request.getHeader("x-forwarded-for");
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip))
        {
            ip = request.getHeader("Proxy-Client-IP");
        }
        
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip))
        {
            ip = request.getHeader("WL-Proxy-Client-IP");
        }
        
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip))
        {
            ip = request.getRemoteAddr();
        }
        
        return ip;
    }
}
