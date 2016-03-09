package com.yungou.o2o.process.common.scheduling.runrequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.exceptions.JedisConnectionException;

import com.alibaba.fastjson.JSON;
import com.yungou.o2o.process.common.scheduling.constant.LjobConstant;
import com.yungou.o2o.process.common.scheduling.model.LjobRunRequest;

/**
 * 定时任务手动执行请求发送类
 * @author lin.zb
 */
public class LjobRunRequestSender
{
    private static final Logger LOG = LoggerFactory.getLogger(LjobRunRequestSender.class);
    
    private JedisPool jedisPool = null;

    public void setJedisPool(JedisPool jedisPool)
    {
        this.jedisPool = jedisPool;
    }
    
    /**
     * 发送定时任务手动执行请求
     * @param ljobRunRequest
     */
    public void sendLjobRunRequest(LjobRunRequest ljobRunRequest)
    {
        Jedis jedis = null;
        String queue = null;
        
        try
        {
            queue = LjobConstant.LJOB_MANUAL_RUN_REQUEST_QUEUE_PREFIX + ljobRunRequest.getRequestProjectIP()
                    + "_" + ljobRunRequest.getRequestProject() + "_" + ljobRunRequest.getRequestJob();
            jedis = jedisPool.getResource();
            jedis.lpush(queue, JSON.toJSONString(ljobRunRequest));
            LOG.info("发送定时任务手动执行请求成功: " + JSON.toJSONString(ljobRunRequest));
        }
        catch (JedisConnectionException e)
        {
            LOG.error("发送定时任务手动执行请求异常：" + e.toString(), e);
            if (null != jedis)
            {
                jedisPool.returnBrokenResource(jedis);
                jedis = null;
            }
        }
        catch (Exception e)
        {
            LOG.error("发送定时任务手动执行请求异常：" + e.toString(), e);
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
