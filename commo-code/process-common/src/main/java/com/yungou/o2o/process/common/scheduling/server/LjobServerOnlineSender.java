package com.yungou.o2o.process.common.scheduling.server;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.exceptions.JedisConnectionException;

import com.alibaba.fastjson.JSON;
import com.yungou.o2o.process.common.scheduling.LjobMonitor;
import com.yungou.o2o.process.common.scheduling.constant.LjobConstant;
import com.yungou.o2o.process.common.scheduling.model.LjobServer;

/**
 * 定时任务服务器在线更新线程
 * @author lin.zb
 */
public class LjobServerOnlineSender extends Thread
{
    private static final Logger LOG = LoggerFactory.getLogger(LjobServerOnlineSender.class);
    
    private DateFormat dateTimeFormat = new SimpleDateFormat("yyyyMMddHHmmss");
    
    private LjobMonitor ljobMonitor = null;
    
    private JedisPool jedisPool = null;
    
    private String ip = null;
    
    private LjobServer ljobServer = null;
    
    public LjobServerOnlineSender(LjobMonitor ljobMonitor, JedisPool jedisPool, String ip)
    {
        this.ljobMonitor = ljobMonitor;
        this.jedisPool = jedisPool;
        this.ip = ip;
    }
    
    @Override
    public void run()
    {
        Jedis jedis = null;
        ljobServer = new LjobServer();
        ljobServer.setIp(ip);
        
        while (true && !ljobMonitor.isDestroy())
        {
            if (ljobMonitor.isMainServer())
            {
                try
                {
                    ljobServer.setLastOnlineTime(dateTimeFormat.format(new Date()));
                    jedis = jedisPool.getResource();
                    jedis.setex(LjobConstant.LJOB_SERVER_ONLINE, 10, JSON.toJSONString(ljobServer));
                }
                catch (JedisConnectionException e)
                {
                    LOG.error("更新定时任务服务器在线异常：" + e.toString(), e);
                    if (null != jedis)
                    {
                        jedisPool.returnBrokenResource(jedis);
                        jedis = null;
                    }
                }
                catch (Exception e)
                {
                    LOG.error("更新定时任务服务器在线异常：" + e.toString(), e);
                }
                finally
                {
                    if (null != jedis)
                    {
                        jedisPool.returnResource(jedis);
                    }
                }
            }
            
            try
            {
                Thread.sleep(1000);
            }
            catch (Exception e)
            {
                LOG.error(e.toString(), e);
            }
        }
    }
}
