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
import com.alibaba.fastjson.JSONObject;
import com.yungou.o2o.process.common.scheduling.LjobMonitor;
import com.yungou.o2o.process.common.scheduling.constant.LjobConstant;
import com.yungou.o2o.process.common.scheduling.model.LjobServer;

/**
 * 定时任务服务器在线更新线程
 * @author lin.zb
 */
public class LjobServerOnlineChecker extends Thread
{
    private static final Logger LOG = LoggerFactory.getLogger(LjobServerOnlineChecker.class);
    
    private DateFormat dateTimeFormat = new SimpleDateFormat("yyyyMMddHHmmss");
    
    private LjobMonitor ljobMonitor = null;
    
    private JedisPool jedisPool = null;
    
    private String ip = null;
    
    private LjobServer ljobServer = null;
    
    public LjobServerOnlineChecker(LjobMonitor ljobMonitor, JedisPool jedisPool, String ip)
    {
        this.ljobMonitor = ljobMonitor;
        this.jedisPool = jedisPool;
        this.ip = ip;
    }
    
    @Override
    public void run()
    {
        while (true && !ljobMonitor.isDestroy())
        {
            if (!ljobMonitor.isMainServer())
            {
                // 校验是否存在在线定时任务服务器
                if (!isLjobServerOnline())
                {
                    // 如果不存在，则启动本机为主监控服务器
                    ljobMonitor.startMainServerThreads();
                }
            }
            // 校验当前定时任务服务器是否是主服务器
            else if (!isStillMainLjobServer())
            {
                // 变更本机为从监控服务器
                ljobMonitor.stopMainServerThreads();
            }
            
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
     * 校验当前定时任务服务器是否是主服务器
     * @return boolean
     */
    public boolean isStillMainLjobServer()
    {
        Jedis jedis = null;
        String ljobServerJson = null;
        
        try
        {
            jedis = jedisPool.getResource();
            ljobServerJson = jedis.get(LjobConstant.LJOB_SERVER_ONLINE);
            if (null == ljobServerJson)
            {
                return false;
            }
            
            ljobServer = JSONObject.parseObject(ljobServerJson, LjobServer.class);
            if (ip.equals(ljobServer.getIp()))
            {
                return true;
            }
            
            return false;
        }
        catch (JedisConnectionException e)
        {
            LOG.error("校验当前定时任务服务器是否是主服务器异常：" + e.toString(), e);
            if (null != jedis)
            {
                jedisPool.returnBrokenResource(jedis);
                jedis = null;
            }
            return true;
        }
        catch (Exception e)
        {
            LOG.error("校验当前定时任务服务器是否是主服务器异常：" + e.toString(), e);
            return true;
        }
        finally
        {
            if (null != jedis)
            {
                jedisPool.returnResource(jedis);
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
                LOG.debug("已经有定时任务主监控服务器启动, 该服务器将不进行心跳统计, 当前在线定时任务服务器: " + ljobServer.toString());
                return true;
            }
            
            ljobServer = new LjobServer();
            ljobServer.setIp(ip);
            ljobServer.setLastOnlineTime(dateTimeFormat.format(new Date()));
            jedis.setex(LjobConstant.LJOB_SERVER_ONLINE, 10, JSON.toJSONString(ljobServer));
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
            return true;
        }
        catch (Exception e)
        {
            LOG.error("校验定时任务服务器是否在线异常：" + e.toString(), e);
            return true;
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
