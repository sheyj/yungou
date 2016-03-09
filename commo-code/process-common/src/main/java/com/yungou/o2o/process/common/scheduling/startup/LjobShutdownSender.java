package com.yungou.o2o.process.common.scheduling.startup;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.exceptions.JedisConnectionException;

import com.alibaba.fastjson.JSON;
import com.yungou.o2o.process.common.scheduling.constant.LjobConstant;
import com.yungou.o2o.process.common.scheduling.model.LjobStartup;

/**
 * 定时任务关闭请求发送类
 * @author lin.zb
 */
public class LjobShutdownSender
{
    private static final Logger LOG = LoggerFactory.getLogger(LjobShutdownSender.class);
    
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
     * 发送定时任务启动请求
     * @param ljobRunRequest
     */
    public boolean shutdownLjob(LjobStartup ljobStartup)
    {
        Jedis jedis = null;
        String queue = null;
        
        try
        {
            queue = LjobConstant.LJOB_STARTUP_QUEUE_PREFIX + ljobStartup.getRequestProjectIP()
                    + "_" + ljobStartup.getRequestProject() + "_" + ljobStartup.getRequestJob();
            jedis = jedisPool.getResource();
            jedis.lpush(queue, JSON.toJSONString(ljobStartup));
            LOG.info("发送定时任务启动请求成功: " + JSON.toJSONString(ljobStartup));
            return true;
        }
        catch (JedisConnectionException e)
        {
            LOG.error("发送定时任务启动请求异常：" + e.toString(), e);
            if (null != jedis)
            {
                jedisPool.returnBrokenResource(jedis);
                jedis = null;
            }
            return false;
        }
        catch (Exception e)
        {
            LOG.error("发送定时任务启动请求异常：" + e.toString(), e);
            return false;
        }
        finally
        {
            if (null != jedis)
            {
                jedisPool.returnResource(jedis);
            }
        }
    }
}
