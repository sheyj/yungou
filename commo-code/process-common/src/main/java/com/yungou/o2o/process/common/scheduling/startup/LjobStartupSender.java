package com.yungou.o2o.process.common.scheduling.startup;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.exceptions.JedisConnectionException;

import com.alibaba.fastjson.JSON;
import com.yungou.o2o.process.common.scheduling.LjobMonitor;
import com.yungou.o2o.process.common.scheduling.constant.LjobConstant;
import com.yungou.o2o.process.common.scheduling.heartbeat.LjobHeartbeatListener;
import com.yungou.o2o.process.common.scheduling.model.LjobHeartbeat;
import com.yungou.o2o.process.common.scheduling.model.LjobStartup;
import com.yungou.o2o.process.common.util.CommonUtil;
import com.yungou.o2o.process.common.util.UUIDHexGenerator;

/**
 * 定时任务启动监测及发送线程
 * @author lin.zb
 */
public class LjobStartupSender extends Thread
{
    private static final Logger LOG = LoggerFactory.getLogger(LjobStartupSender.class);
    
    private LjobMonitor ljobMonitor = null;
    
    private JedisPool jedisPool = null;
    
    private String ip = null;
    
    public LjobStartupSender(LjobMonitor ljobMonitor)
    {
        this.ljobMonitor = ljobMonitor;
    }

    public void setJedisPool(JedisPool jedisPool)
    {
        this.jedisPool = jedisPool;
    }
    
    @Override
    public void run()
    {
        Map<String, List<LjobHeartbeat>> targetLjobMap = null;
        Map<String, List<LjobHeartbeat>> onlineLjobMap = null;
        Set<String> keySet = null;
        String lockUUID = null;
        List<LjobHeartbeat> tmpLjobList = null; 
        LjobStartup ljobStartup = null;
        boolean isJobStartup = false;
        int count = 0;
        
        while (true && !ljobMonitor.isDestroy())
        {
            if (ljobMonitor.isMainServer())
            {
                // 锁定在线定时任务
                onlineLjobMap = new HashMap<String, List<LjobHeartbeat>>();
                lockUUID = LjobHeartbeatListener.generateLockUUID();
                targetLjobMap = LjobHeartbeatListener.lockLjobMap(lockUUID);
                while (null == targetLjobMap)
                {
                    try
                    {
                        Thread.sleep(1000);
                    }
                    catch (Exception e)
                    {
                        LOG.error(e.toString(), e);
                    }
                    
                    targetLjobMap = LjobHeartbeatListener.lockLjobMap(lockUUID);
                }
                
                onlineLjobMap.putAll(targetLjobMap);
                keySet = onlineLjobMap.keySet();
                if (null != keySet)
                {
                    // 获取定时任务组
                    for (String key : keySet)
                    {
                        isJobStartup = false;
                        tmpLjobList = onlineLjobMap.get(key);
                        if (null != tmpLjobList && tmpLjobList.size() > 1)
                        {
                            // 校验不可分布式部署的定时任务组是否启动超过一个定时任务
                            count = 0;
                            for (LjobHeartbeat ljobHeartbeat : tmpLjobList)
                            {
                                if (ljobHeartbeat.isDistributed())
                                {
                                    break;
                                }
                                
                                // 关闭定时任务
                                if (ljobHeartbeat.isStartup() && count > 0)
                                {
                                    ljobStartup = new LjobStartup();
                                    ljobStartup.setRequestID(UUIDHexGenerator.generate());
                                    ljobStartup.setRequestIP(this.getLocalIP());
                                    ljobStartup.setRequestJob(ljobHeartbeat.getJobName());
                                    ljobStartup.setRequestProject(ljobHeartbeat.getProjectName());
                                    ljobStartup.setRequestTime();
                                    ljobStartup.setRequestProjectIP(ljobHeartbeat.getIp());
                                    ljobStartup.setRequestUser("LjobStartupSender");
                                    ljobStartup.setRequestStatus(LjobConstant.SHUTDOWN_STATUS);
                                    this.startupLjob(ljobStartup);
                                }
                                
                                if (ljobHeartbeat.isStartup())
                                {
                                    count = count + 1;
                                }
                            }
                        }
                        
                        if (null != tmpLjobList && tmpLjobList.size() > 0)
                        {
                            // 监测该定时任务是否已经启动, 则直接启动
                            for (LjobHeartbeat ljobHeartbeat : tmpLjobList)
                            {
                                // 如果第一次接收到的心跳还没超时
                                if (!ljobHeartbeat.isFirstHeartbeatTimeout(ljobMonitor.getLjobServerTime()))
                                {
                                    continue;
                                }
                                
                                // 如果允许分布式
                                if (ljobHeartbeat.isDistributed())
                                {
                                    // 如果已经启动或者已经发送启动请求, 则不需要再启动
                                    if (ljobHeartbeat.isStartup() || !ljobHeartbeat.isStartupTimeout(ljobMonitor.getLjobServerTime()))
                                    {
                                        isJobStartup = true;
                                        continue;
                                    }
                                    
                                    ljobStartup = new LjobStartup();
                                    ljobStartup.setRequestID(UUIDHexGenerator.generate());
                                    ljobStartup.setRequestIP(this.getLocalIP());
                                    ljobStartup.setRequestJob(ljobHeartbeat.getJobName());
                                    ljobStartup.setRequestProject(ljobHeartbeat.getProjectName());
                                    ljobStartup.setRequestTime();
                                    ljobStartup.setRequestProjectIP(ljobHeartbeat.getIp());
                                    ljobStartup.setRequestUser("LjobStartupSender");
                                    ljobStartup.setRequestStatus(LjobConstant.STARTUP_STATUS);
                                    
                                    this.startupLjob(ljobStartup);
                                    ljobHeartbeat.setStartupSendTime(ljobStartup.getRequestTime());
                                    isJobStartup = true;
                                    continue;
                                }
                                
                                if (ljobHeartbeat.isStartup() || !ljobHeartbeat.isStartupTimeout(ljobMonitor.getLjobServerTime()))
                                {
                                    isJobStartup = true;
                                    break;
                                }
                            }
                            
                            // 如果定时任务还未启动
                            if (!isJobStartup)
                            {
                                for (LjobHeartbeat ljobHeartbeat : tmpLjobList)
                                {
                                    // 如果第一次接收到的心跳还没超时
                                    if (!ljobHeartbeat.isFirstHeartbeatTimeout(ljobMonitor.getLjobServerTime()))
                                    {
                                        continue;
                                    }
                                    
                                    // 则启动其中一个定时任务
                                    ljobStartup = new LjobStartup();
                                    ljobStartup.setRequestID(UUIDHexGenerator.generate());
                                    ljobStartup.setRequestIP(this.getLocalIP());
                                    ljobStartup.setRequestJob(ljobHeartbeat.getJobName());
                                    ljobStartup.setRequestProject(ljobHeartbeat.getProjectName());
                                    ljobStartup.setRequestTime();
                                    ljobStartup.setRequestProjectIP(ljobHeartbeat.getIp());
                                    ljobStartup.setRequestUser("LjobStartupSender");
                                    ljobStartup.setRequestStatus(LjobConstant.STARTUP_STATUS);
                                    
                                    this.startupLjob(ljobStartup);
                                    ljobHeartbeat.setStartupSendTime(ljobStartup.getRequestTime());
                                    break;
                                }
                            }
                            
                            onlineLjobMap.put(key, tmpLjobList);
                        }
                    }
                }
                
                try
                {
                    LjobHeartbeatListener.releaseLjobMap(onlineLjobMap, lockUUID);
                }
                catch (Exception e)
                {
                    LOG.error("释放在线定时任务Map异常: " + e.toString(), e);
                }
            }
            
            try
            {
                Thread.sleep(10000);
            }
            catch (Exception e)
            {
                LOG.error(e.toString(), e);
            }
        }
    }
    
    /**
     * 发送定时任务启动请求
     * @param ljobRunRequest
     */
    public void startupLjob(LjobStartup ljobStartup)
    {
        Jedis jedis = null;
        String queue = null;
        
        try
        {
            queue = LjobConstant.LJOB_STARTUP_QUEUE_PREFIX + ljobStartup.getRequestProjectIP()
                    + "_" + ljobStartup.getRequestProject() + "_" + ljobStartup.getRequestJob();
            jedis = jedisPool.getResource();
            jedis.lpush(queue, JSON.toJSONString(ljobStartup));
            LOG.info("发送定时任务启动请求成功: " + JSON.toJSONString(ljobStartup));
        }
        catch (JedisConnectionException e)
        {
            LOG.error("发送定时任务启动请求异常：" + e.toString(), e);
            if (null != jedis)
            {
                jedisPool.returnBrokenResource(jedis);
                jedis = null;
            }
        }
        catch (Exception e)
        {
            LOG.error("发送定时任务启动请求异常：" + e.toString(), e);
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
     * 获取本地IP
     * @return
     */
    private String getLocalIP()
    {
        if (this.ip != null)
        {
            return this.ip;
        }
        
        try
        {
            this.ip = CommonUtil.getLocalIP();
        }
        catch (Exception e)
        {
            LOG.error("获取IP异常: " + e.toString(), e);
        }
        
        return this.ip;
    }
}
