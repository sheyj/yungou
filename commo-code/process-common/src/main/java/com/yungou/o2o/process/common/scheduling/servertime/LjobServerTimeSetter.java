package com.yungou.o2o.process.common.scheduling.servertime;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.exceptions.JedisConnectionException;

import com.yungou.o2o.process.common.scheduling.LjobMonitor;
import com.yungou.o2o.process.common.scheduling.constant.LjobConstant;

/**
 * 定时任务服务器时间更新线程
 * @author lin.zb
 */
public class LjobServerTimeSetter extends Thread
{
    private static final Logger LOG = LoggerFactory.getLogger(LjobServerTimeSetter.class);
    
    private DateFormat dateTimeFormat = new SimpleDateFormat("yyyyMMddHHmmss");
    
    private LjobMonitor ljobMonitor = null;
    
    private JedisPool jedisPool = null;
    
    public LjobServerTimeSetter(LjobMonitor ljobMonitor, JedisPool jedisPool)
    {
        this.ljobMonitor = ljobMonitor;
        this.jedisPool = jedisPool;
    }
    
    @Override
    public void run()
    {
        Jedis jedis = null;
        
        while (true && !ljobMonitor.isDestroy())
        {
            if (ljobMonitor.isMainServer())
            {
                try
                {
                    jedis = jedisPool.getResource();
                    jedis.setex(LjobConstant.LJOB_SERVER_TIME, LjobConstant.SERVER_TIME_TIMEOUT_SECONDS, dateTimeFormat.format(new Date()));
                }
                catch (JedisConnectionException e)
                {
                    LOG.error("更新服务端时间异常：" + e.toString(), e);
                    if (null != jedis)
                    {
                        jedisPool.returnBrokenResource(jedis);
                        jedis = null;
                    }
                }
                catch (Exception e)
                {
                    LOG.error("更新服务端时间异常：" + e.toString(), e);
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
