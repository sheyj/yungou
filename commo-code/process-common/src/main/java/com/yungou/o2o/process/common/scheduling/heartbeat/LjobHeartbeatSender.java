package com.yungou.o2o.process.common.scheduling.heartbeat;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.exceptions.JedisConnectionException;

import com.alibaba.fastjson.JSON;
import com.yungou.o2o.process.common.scheduling.LjobRunner;
import com.yungou.o2o.process.common.scheduling.LjobTrigger;
import com.yungou.o2o.process.common.scheduling.constant.LjobConstant;
import com.yungou.o2o.process.common.scheduling.model.LjobHeartbeat;

/**
 * 定时任务心跳推送类
 * @author lin.zb
 */
public class LjobHeartbeatSender extends Thread
{
    private static final Logger LOG = LoggerFactory.getLogger(LjobHeartbeatSender.class);
    
    private LjobTrigger ljobTrigger = null;
    
    private JedisPool jedisPool = null;
    
    private LjobHeartbeat ljobHeartbeat = null;
    
    private LjobRunner ljobRunner = null;
    
    public LjobHeartbeatSender(LjobTrigger ljobTrigger)
    {
        this.ljobTrigger = ljobTrigger;
    }

    public void setJedisPool(JedisPool jedisPool)
    {
        this.jedisPool = jedisPool;
    }

    public void setLjobHeartbeat(LjobHeartbeat ljobHeartbeat)
    {
        this.ljobHeartbeat = ljobHeartbeat;
    }

    public void setLjobRunner(LjobRunner ljobRunner)
    {
        this.ljobRunner = ljobRunner;
    }

    @Override
    public void run()
    {
        // 每10秒钟发送一次心跳
        while (ljobRunner.isAlive() && !ljobTrigger.isDestroy())
        {
            if (ljobTrigger.isLjobServerOnline())
            {
                sendRedisHeartbeat(ljobHeartbeat);
                
                try
                {
                    Thread.sleep(10000);
                }
                catch (InterruptedException e)
                {
                    LOG.error(e.toString(), e);
                }
            }
            else
            {
                try
                {
                    Thread.sleep(5000);
                }
                catch (InterruptedException e)
                {
                    LOG.error(e.toString(), e);
                }
            }
        }
    }
    
    /**
     * 推送redis定时任务心跳
     * @param byteContent
     */
    private void sendRedisHeartbeat(LjobHeartbeat ljobHeartbeat)
    {
        Jedis jedis = null;
        try
        {
            jedis = jedisPool.getResource();
            ljobHeartbeat.setSendTime(ljobTrigger.getLjobServerTime());
            ljobHeartbeat.setStartup(ljobRunner.isStartup());
            ljobHeartbeat.setLjobRunHistorys(ljobRunner.getLjobRunHistorys());
            jedis.lpush(LjobConstant.LJOB_HEARTBEAT_QUEUE, JSON.toJSONString(ljobHeartbeat));
            LOG.debug("推送定时任务心跳成功: " + JSON.toJSONString(ljobHeartbeat));
        }
        catch (JedisConnectionException e)
        {
            LOG.error("推送定时任务心跳异常：" + e.toString(), e);
            if (null != jedis)
            {
                jedisPool.returnBrokenResource(jedis);
                jedis = null;
            }
        }
        catch (Exception e)
        {
            LOG.error("推送定时任务心跳异常：" + e.toString(), e);
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
