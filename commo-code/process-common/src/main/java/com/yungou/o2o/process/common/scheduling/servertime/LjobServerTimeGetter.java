package com.yungou.o2o.process.common.scheduling.servertime;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.exceptions.JedisConnectionException;

import com.yungou.o2o.process.common.scheduling.constant.LjobConstant;

/**
 * 定时任务服务器时间获取者
 * @author lin.zb
 */
public class LjobServerTimeGetter
{
    private static final Logger LOG = LoggerFactory.getLogger(LjobServerTimeGetter.class);
    
    private JedisPool jedisPool = null;
    
    public LjobServerTimeGetter()
    {
    }
    
    public LjobServerTimeGetter(JedisPool jedisPool)
    {
        this.jedisPool = jedisPool;
    }
    
    public JedisPool getJedisPool()
    {
        return jedisPool;
    }

    public void setJedisPool(JedisPool jedisPool)
    {
        this.jedisPool = jedisPool;
    }

    /**
     * 获取定时任务服务器时间
     * @return String 格式：yyyyMMddHHmmss
     */
    public String getLjobServerTime()
    {
        Jedis jedis = null;
        String serverTime = null;
        
        try
        {
            jedis = jedisPool.getResource();
            serverTime = jedis.get(LjobConstant.LJOB_SERVER_TIME);
        }
        catch (JedisConnectionException e)
        {
            LOG.error("获取服务端时间异常：" + e.toString(), e);
            if (null != jedis)
            {
                jedisPool.returnBrokenResource(jedis);
                jedis = null;
            }
        }
        catch (Exception e)
        {
            LOG.error("获取服务端时间异常：" + e.toString(), e);
        }
        finally
        {
            if (null != jedis)
            {
                jedisPool.returnResource(jedis);
            }
        }
        
        DateFormat dateTimeFormat = new SimpleDateFormat("yyyyMMddHHmmss");
        if (null == serverTime)
        {
            serverTime = dateTimeFormat.format(new Date());
        }
        else
        {
            try
            {
                dateTimeFormat.parse(serverTime);
            }
            catch (Exception e)
            {
                LOG.error("获取服务端时间异常：" + e.toString(), e);
                serverTime = dateTimeFormat.format(new Date());
            }
        }
        
        return serverTime;
    }
}
