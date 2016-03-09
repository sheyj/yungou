package com.yungou.o2o.process.common.scheduling.runrequest;

import java.lang.reflect.Method;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.exceptions.JedisConnectionException;

import com.alibaba.fastjson.JSONObject;
import com.yungou.o2o.process.common.scheduling.LjobRunner;
import com.yungou.o2o.process.common.scheduling.LjobTrigger;
import com.yungou.o2o.process.common.scheduling.model.LjobRunRequest;

/**
 * 定时任务手动执行请求监听类
 * @author lin.zb
 */
public class LjobRunRequestListener extends Thread
{
    private static final Logger LOG = LoggerFactory.getLogger(LjobRunRequestListener.class);
    
    private LjobTrigger ljobTrigger = null;
    
    private JedisPool jedisPool = null;
    
    private String queueName = null;
    
    private Object targetJob = null;
    
    private Class<?> targetJobClass = null;
    
    private String targetJobMethod = null;
    
    private LjobRunRequest ljobRunRequest = null;
    
    private LjobRunner ljobRunner = null;
    
    public LjobRunRequestListener(LjobTrigger ljobTrigger)
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

    public void setTargetJob(Object targetJob)
    {
        this.targetJob = targetJob;
    }

    public Class<?> getTargetJobClass()
    {
        return targetJobClass;
    }

    public void setTargetJobClass(Class<?> targetJobClass)
    {
        this.targetJobClass = targetJobClass;
    }

    public void setTargetJobMethod(String targetJobMethod)
    {
        this.targetJobMethod = targetJobMethod;
    }

    public void setLjobRunner(LjobRunner ljobRunner)
    {
        this.ljobRunner = ljobRunner;
    }

    @Override
    public void run()
    {
        while (ljobRunner.isAlive() && !ljobTrigger.isDestroy())
        {
            // 如果定时任务正在运行
            while (ljobRunner.isRunning())
            {
                try
                {
                    Thread.sleep(1000);
                }
                catch (InterruptedException e)
                {
                    LOG.error(e.toString(), e);
                }
            }
            
            ljobRunRequest = getLjobRunRequest();
            if (null != ljobRunRequest)
            {
                LOG.info("接收到手动执行定时任务请求: " + ljobRunRequest.toString());
                if (ljobRunRequest.isValideRequest(ljobTrigger.getLjobServerTime()))
                {
                    doManualRunRequest();
                    LOG.info("手动执行定时任务成功: " + ljobRunRequest.toString());
                }
                else
                {
                    LOG.warn("手动执行定时任务请求失败，请求时间已经超过300秒，不再执行: " + ljobRunRequest.toString());
                }
            }
            
            try
            {
                Thread.sleep(10000);
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
    private LjobRunRequest getLjobRunRequest()
    {
        Jedis jedis = null;
        List<String> stringList = null;
        LjobRunRequest ljobRunRequest = null;
        
        try
        {
            // 从监听队列中获取定时任务手动执行请求
            jedis = jedisPool.getResource();
            stringList = jedis.brpop(1, queueName);
            if (null != stringList && stringList.size() == 2)
            {
                ljobRunRequest = JSONObject.parseObject(stringList.get(1), LjobRunRequest.class);
            }
            
            return ljobRunRequest;
        }
        catch (JedisConnectionException e)
        {
            LOG.error("从监听队列中获取定时任务手动执行请求异常：" + e.toString(), e);
            if (null != jedis)
            {
                jedisPool.returnBrokenResource(jedis);
                jedis = null;
            }
            
            return ljobRunRequest;
        }
        catch (Exception e)
        {
            LOG.error("从监听队列中获取定时任务手动执行请求异常：" + e.toString(), e);
            return ljobRunRequest;
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
     * 手动执行定时任务
     */
    private void doManualRunRequest()
    {
        Method method = null;
        
        try
        {
            method = LjobRunner.class.getDeclaredMethod(targetJobMethod);
            method.invoke(targetJob);
        }
        catch (Exception e)
        {
            LOG.error("手动执行定时任务失败: " + e.toString(), e);
        }
    }
}
