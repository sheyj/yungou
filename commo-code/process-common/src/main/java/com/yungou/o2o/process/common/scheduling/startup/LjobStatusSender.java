package com.yungou.o2o.process.common.scheduling.startup;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.exceptions.JedisConnectionException;

import com.alibaba.fastjson.JSON;
import com.yungou.o2o.process.common.scheduling.constant.LjobConstant;
import com.yungou.o2o.process.common.scheduling.model.LjobStartup;

/**
 * 定时任务状态更新发送类
 * @author lin.zb
 */
public class LjobStatusSender
{
    private static final Logger LOG = LoggerFactory.getLogger(LjobStatusSender.class);
    
    private Map<String, LjobStartup> changeLog = null;
    
    private JedisPool jedisPool = null;
    
    public JedisPool getJedisPool()
    {
        return jedisPool;
    }

    public void setJedisPool(JedisPool jedisPool)
    {
        this.jedisPool = jedisPool;
    }

    /**
     * 发送定时任务状态变更请求
     * @param ljobStartup
     */
    public synchronized String changeLjobStatus(LjobStartup ljobStartup, boolean isDistributed, String currentTime)
    {
        Jedis jedis = null;
        String queue = null;
        byte[] byteArray = null;
        LjobStartup change = null;
        
        try
        {
            jedis = jedisPool.getResource();
            
            if (!isDistributed && LjobConstant.STARTUP_STATUS.equals(ljobStartup.getRequestStatus()))
            {
                // 校验请求
                byteArray = jedis.get(LjobConstant.LJOB_STATUS_CHANGE_LOG.getBytes());
                changeLog = toChangeLog(byteArray);
                change = changeLog.get(ljobStartup.getRequestProject() + "_" + ljobStartup.getRequestJob());
                if (null != change)
                {
                    if (change.isValideRequest(currentTime))
                    {
                        LOG.warn("该定时任务已经启动, ljobStartup: " + change.toString());
                        return "该定时任务正在启动或已经启动, IP: " + change.getRequestProjectIP();
                    }
                }
                
                // 缓存请求
                changeLog.put(ljobStartup.getRequestProject() + "_" + ljobStartup.getRequestJob(), ljobStartup);
                jedis.set(LjobConstant.LJOB_STATUS_CHANGE_LOG.getBytes(), getChangeLogByte(changeLog));
            }
            
            // 发送请求
            queue = LjobConstant.LJOB_STARTUP_QUEUE_PREFIX + ljobStartup.getRequestProjectIP()
                    + "_" + ljobStartup.getRequestProject() + "_" + ljobStartup.getRequestJob();
            jedis.lpush(queue, JSON.toJSONString(ljobStartup));
            LOG.info("发送定时任务状态变更请求成功: " + JSON.toJSONString(ljobStartup));
            return null;
        }
        catch (JedisConnectionException e)
        {
            LOG.error("发送定时任务状态变更请求异常：" + e.toString(), e);
            if (null != jedis)
            {
                jedisPool.returnBrokenResource(jedis);
                jedis = null;
            }
            return "Exception";
        }
        catch (Exception e)
        {
            LOG.error("发送定时任务状态变更请求异常：" + e.toString(), e);
            return "Exception";
        }
        finally
        {
            if (null != jedis)
            {
                jedisPool.returnResource(jedis);
                jedis = null;
            }
        }
    }
    
    /**
     * 转换成Map<String, LjobStartup>
     * @param bytes
     * @return Map<String, LjobStartup>
     */
    @SuppressWarnings("unchecked")
    public static Map<String, LjobStartup> toChangeLog(byte[] bytes)
    {
        if (null == bytes)
        {
            return new HashMap<String, LjobStartup>();
        }
        
        Map<String, LjobStartup> obj = null;
        ByteArrayInputStream bis = null;
        ObjectInputStream ois = null;
        
        try
        {
            bis = new ByteArrayInputStream(bytes);
            ois = new ObjectInputStream(bis);
            obj = (Map<String, LjobStartup>) ois.readObject();
            return obj;
        }
        catch (Exception e)
        {
            LOG.error(e.toString(), e);
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
                    LOG.error(e.toString(), e);
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
                    LOG.error(e.toString(), e);
                }
            }
        }
    }
    
    /**
     * 转换成字节数组
     * @return byte[]
     */
    public static byte[] getChangeLogByte(Map<String, LjobStartup> changeLog)
    {
        ByteArrayOutputStream bos = null;
        ObjectOutputStream oos = null;
        
        try
        {
            bos = new ByteArrayOutputStream();
            oos = new ObjectOutputStream(bos);
            oos.writeObject(changeLog);
            oos.flush();
            return bos.toByteArray();
        }
        catch (Exception e)
        {
            LOG.error(e.toString(), e);
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
                    LOG.error(e.toString(), e);
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
                    LOG.error(e.toString(), e);
                }
            }
        }
    }
}
