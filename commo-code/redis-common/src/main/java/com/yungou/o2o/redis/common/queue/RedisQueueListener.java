package com.yungou.o2o.redis.common.queue;

import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.exceptions.JedisConnectionException;

/**
 * Redis队列监听器. 传输序列化对象
 * @author liang.q
 * @version 0.1.0
 */
public class RedisQueueListener
{
    private static final Logger LOG = LoggerFactory.getLogger(RedisQueueListener.class);
    
    private final ExecutorService executorService = Executors.newCachedThreadPool();
    
    private JedisPool redisPool;
    
    private List<String> queueNames;
    
    private RedisProcesser processer;
    
    /** 监听器监听间隔 默认0 */
    private long sleepTime = 0;
    
    public void setRedisPool(JedisPool redisPool)
    {
        this.redisPool = redisPool;
    }
    
    public void setQueueNames(List<String> queueNames)
    {
        this.queueNames = queueNames;
    }
    
    public void setProcesser(RedisProcesser processer)
    {
        this.processer = processer;
    }
    
    public void init()
    {
		LOG.info("监听器已经启动");
        for (String queueName : queueNames)
        {
            LOG.info("队列名称为：{}", queueName);
            Worker worker = new Worker(queueName.getBytes());
            executorService.execute(worker);
        }
    }
    
    public void destroy()
    {
        shutdownAndAwaitTermination(executorService);
    }
    
    private class Worker implements Runnable
    {
        private final byte[] queueName;
        
        public Worker(byte[] queueName)
        {
            this.queueName = queueName;
        }
        
        @Override
        public void run()
        {
            Jedis jedis = null;
            List<byte[]> datas = null;
            byte[] name = null;
            byte[] content = null;
            boolean isJedisException = false;
            
            while (!Thread.currentThread().isInterrupted())
            {
                try
                {
                    if (null == jedis)
                    {
                        jedis = redisPool.getResource();
                    }
                    
                    datas = jedis.brpop(1, queueName);
                    if ((datas != null) && (datas.size() == 2))
                    {
                        try
                        {
                            name = datas.get(0);
                            content = datas.get(1);
                            LOG.info("从redis队列中取到的数据为：queueName={}, content={}", new String(name), content);
                            processer.doProcess(new String(name), RedisMessage.unserialize(content));
                        }
                        catch (Exception e)
                        {
                            LOG.error("从redis队列处理消息出现异常, queueName: " + new String(datas.get(0)) + ", content: " + new String(datas.get(0)) 
                                    + ", 异常: " + e.toString(), e);
                        }
                    }
                    
                    if (sleepTime != 0)
                    {
                        Thread.sleep(sleepTime);
                    }
                }
                catch (JedisConnectionException e)
                {
                    isJedisException = true;
                    LOG.error(e.toString(), e);
                    if (null != jedis)
                    {
                        redisPool.returnBrokenResource(jedis);
                        jedis = null;
                    }
                }
                catch (Exception e)
                {
                    isJedisException = true;
                    LOG.error(e.toString(), e);
                    if (null != jedis)
                    {
                        redisPool.returnResource(jedis);
                        jedis = null;
                    }
                }
                
                // 如果Redis发生了异常，则休眠3秒
                if (isJedisException)
                {
                    try
                    {
                        LOG.error("Redis监听器异常, 监听器将休眠3秒之后再重试...");
                        Thread.sleep(3000);
                    }
                    catch (Exception e)
                    {
                        LOG.error(e.toString(), e);
                    }
                    
                    isJedisException = false;
                }
            }
        }
    }
    
    public long getSleepTime()
    {
        return sleepTime;
    }
    
    public void setSleepTime(String sleepTime)
    {
        try
        {
            this.sleepTime = Long.parseLong(sleepTime);
        }
        catch (Exception e)
        {
            LOG.warn("设置任务处理器间隔时间异常：" + e.toString(), e);
            this.sleepTime = 0;
        }
    }
    
	
	private void shutdownAndAwaitTermination(ExecutorService pool)
    {
        pool.shutdown();
        try
        {
            if (!pool.awaitTermination(60, TimeUnit.SECONDS))
            {
                pool.shutdownNow();
                if (!pool.awaitTermination(60, TimeUnit.SECONDS))
                {
                    LOG.error("Pool did not terminate");
                }
            }
        }
        catch (InterruptedException ie)
        {
            pool.shutdownNow();
            Thread.currentThread().interrupt();
        }
        catch (Exception e)
        {
            pool.shutdownNow();
            Thread.currentThread().interrupt();
        }
    }
}
