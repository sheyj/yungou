package com.yungou.o2o.process.common.scheduling.server;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.exceptions.JedisConnectionException;

import com.alibaba.fastjson.JSONObject;
import com.yungou.o2o.process.common.scheduling.LjobTrigger;
import com.yungou.o2o.process.common.scheduling.constant.LjobConstant;
import com.yungou.o2o.process.common.scheduling.model.LjobServer;

/**
 * 定时任务服务器在线客户端监测线程
 * @author lin.zb
 */
public class LjobServerClientChecker extends Thread
{
    private static final Logger LOG = LoggerFactory.getLogger(LjobServerClientChecker.class);
    
    private LjobTrigger ljobTrigger = null;
    
    private JedisPool jedisPool = null;
    
    private LjobServer ljobServer = null;
    
    public LjobServerClientChecker(LjobTrigger ljobTrigger, JedisPool jedisPool)
    {
        this.ljobTrigger = ljobTrigger;
        this.jedisPool = jedisPool;
    }
    
    @Override
    public void run()
    {
        while (true && !ljobTrigger.isDestroy())
        {
            ljobTrigger.setLjobServerOnline(this.isLjobServerOnline());
            
            try
            {
                Thread.sleep(5000);
            }
            catch (Exception e)
            {
                LOG.error(e.toString(), e);
            }
        }
    }
    
    /**
     * 校验当前定时任务服务器是否在线
     * @return boolean
     * @throws Exception
     */
    public boolean isLjobServerOnline()
    {
        Jedis jedis = null;
        String ljobServerJson = null;
        
        try
        {
            jedis = jedisPool.getResource();
            ljobServerJson = jedis.get(LjobConstant.LJOB_SERVER_ONLINE);
            if (null != ljobServerJson)
            {
                ljobServer = JSONObject.parseObject(ljobServerJson, LjobServer.class);
                LOG.debug("当前在线定时任务服务器: " + ljobServer.toString());
                return true;
            }
            
            return false;
        }
        catch (JedisConnectionException e)
        {
            LOG.error("校验定时任务服务器是否在线异常：" + e.toString(), e);
            if (null != jedis)
            {
                jedisPool.returnBrokenResource(jedis);
                jedis = null;
            }
            return false;
        }
        catch (Exception e)
        {
            LOG.error("校验定时任务服务器是否在线异常：" + e.toString(), e);
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
