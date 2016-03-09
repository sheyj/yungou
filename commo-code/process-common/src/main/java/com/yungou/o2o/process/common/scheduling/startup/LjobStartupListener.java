package com.yungou.o2o.process.common.scheduling.startup;

import java.util.List;

import org.quartz.Trigger;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.exceptions.JedisConnectionException;

import com.alibaba.fastjson.JSONObject;
import com.yungou.o2o.process.common.scheduling.LjobRunner;
import com.yungou.o2o.process.common.scheduling.LjobSchedulerFactory;
import com.yungou.o2o.process.common.scheduling.LjobTrigger;
import com.yungou.o2o.process.common.scheduling.constant.LjobConstant;
import com.yungou.o2o.process.common.scheduling.model.LjobStartup;

/**
 * 定时任务启动请求监听类
 * @author lin.zb
 */
public class LjobStartupListener extends Thread
{
    private static final Logger LOG = LoggerFactory.getLogger(LjobStartupListener.class);
    
    private LjobTrigger ljobTrigger = null;
    
    private LjobSchedulerFactory ljobSchedulerFactory = null;
    
    /**
     * 定时任务Trigger
     */
    private Trigger targetTrigger = null;
    
    private JedisPool jedisPool = null;
    
    private String queueName = null;
    
    private LjobRunner ljobRunner = null;
    
    public LjobStartupListener(LjobTrigger ljobTrigger)
    {
        this.ljobTrigger = ljobTrigger;
    }
    
    public void setJedisPool(JedisPool jedisPool)
    {
        this.jedisPool = jedisPool;
    }

    public void setQueueName(String queueName)
    {
        this.queueName = queueName;
    }

    public void setLjobRunner(LjobRunner ljobRunner)
    {
        this.ljobRunner = ljobRunner;
    }

    public void setLjobSchedulerFactory(LjobSchedulerFactory ljobSchedulerFactory)
    {
        this.ljobSchedulerFactory = ljobSchedulerFactory;
    }

    public void setTargetTrigger(Trigger targetTrigger)
    {
        this.targetTrigger = targetTrigger;
    }

    @Override
    public void run()
    {
        while (ljobRunner.isAlive() && !ljobTrigger.isDestroy())
        {
            getLjobStartupRequest();
            
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
    
    /**
     * 获取手动执行定时任务请求
     * @return LjobRunRequest
     */
    private void getLjobStartupRequest()
    {
        Jedis jedis = null;
        List<String> stringList = null;
        LjobStartup ljobStartup = null;
        
        try
        {
            // 从监听队列中获取定时任务手动执行请求
            jedis = jedisPool.getResource();
            stringList = jedis.brpop(1, queueName);
            if (null != stringList && stringList.size() == 2)
            {
                ljobStartup = JSONObject.parseObject(stringList.get(1), LjobStartup.class);
                LOG.info("从监听队列中获取到定时任务启动请求: " + ljobStartup.toString());
                if (ljobStartup.isValideRequest(ljobTrigger.getLjobServerTime()))
                {
                    // 启动请求
                    if (LjobConstant.STARTUP_STATUS.equals(ljobStartup.getRequestStatus()) && !ljobRunner.isStartup())
                    {
                        if (ljobSchedulerFactory.addTriggerToScheduler(targetTrigger))
                        {
                            ljobRunner.startup();
                        }
                    }
                    
                    // 关闭请求
                    if (LjobConstant.SHUTDOWN_STATUS.equals(ljobStartup.getRequestStatus()) && ljobRunner.isStartup())
                    {
                        if (ljobSchedulerFactory.deleteScheduleJob(targetTrigger))
                        {
                            ljobRunner.shutdown();
                        }
                    }
                }
            }
        }
        catch (JedisConnectionException e)
        {
            LOG.error("从监听队列中获取定时任务启动请求异常：" + e.toString(), e);
            if (null != jedis)
            {
                jedisPool.returnBrokenResource(jedis);
                jedis = null;
            }
        }
        catch (Exception e)
        {
            LOG.error("从监听队列中获取定时任务启动请求异常：" + e.toString(), e);
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
