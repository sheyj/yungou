package com.yungou.o2o.process.common.scheduling.heartbeat;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.exceptions.JedisConnectionException;

import com.alibaba.fastjson.JSONObject;
import com.yungou.o2o.process.common.scheduling.LjobMonitor;
import com.yungou.o2o.process.common.scheduling.constant.LjobConstant;
import com.yungou.o2o.process.common.scheduling.model.LjobHeartbeat;
import com.yungou.o2o.process.common.util.UUIDHexGenerator;

/**
 * 定时任务心跳监听类
 * @author lin.zb
 */
public class LjobHeartbeatListener extends Thread
{
    private static final Logger LOG = LoggerFactory.getLogger(LjobHeartbeatListener.class);
    
    /**
     * 添加在线定时任务成功
     */
    private static final int ADD_LJOB_SUCCESS = 0;
    
    /**
     * 添加在线定时任务失败（在线定时任务map被锁定）
     */
    private static final int ADD_LJOB_FAILED_WITH_LOCK = 1;
    
    private static final DateFormat DATE_TIME_FORMAT = new SimpleDateFormat("yyyyMMddHHmmssSSS");
    
    /**
     * 在线定时任务
     */
    private static Map<String, List<LjobHeartbeat>> onlineLjobMap = new HashMap<String, List<LjobHeartbeat>>();
    
    private static boolean isLockingLjobMap = false;
    
    private static String lockLjobMapUUID = null;
    
    private static String lockTime = null;
    
    private static boolean isMainServer = false;
    
    private LjobMonitor ljobMonitor = null;
    
    private JedisPool jedisPool = null;
    
    public LjobHeartbeatListener(LjobMonitor ljobMonitor, JedisPool jedisPool)
    {
        this.ljobMonitor = ljobMonitor;
        this.jedisPool = jedisPool;
        
        // 从缓存中获取到当前在线定时任务列表
        this.getOnlineLjobMapCache();
    }
    
    public static boolean isMainServer()
    {
        return isMainServer;
    }

    public static Map<String, List<LjobHeartbeat>> getOnlineLjobMap()
    {
        return onlineLjobMap;
    }
    
    public static LjobHeartbeat getOnlineLjob(String ljobKey, String ip)
    {
        List<LjobHeartbeat> ljobHeartbeatList = onlineLjobMap.get(ljobKey);
        if (null != ljobHeartbeatList && ljobHeartbeatList.size() > 0)
        {
            for (LjobHeartbeat ljobHeartbeat : ljobHeartbeatList)
            {
                if (ljobHeartbeat.getIp().equals(ip))
                {
                    return ljobHeartbeat;
                }
            }
        }
        
        return null;
    }
    
    /**
     * 获取在线定时任务锁ID
     * @return
     */
    public synchronized static String generateLockUUID()
    {
        return UUIDHexGenerator.generate();
    }
    
    /**
     * 锁定在线定时任务
     * @return Map<String, LjobHeartbeat>
     */
    public synchronized static Map<String, List<LjobHeartbeat>> lockLjobMap(String lockUUID)
    {
        if (null == lockUUID)
        {
            LOG.error("锁定在线定时任务失败, 锁定UUID为空...");
            return null;
        }
        
        if (isLockingLjobMap)
        {
            // 判断锁是否超时
            if (isLockTimeout())
            {
                // 如果已经超时则直接释放锁
                releaseLjobMap();
            }
            else
            {
                return null;
            }
        }
        
        lockTime = DATE_TIME_FORMAT.format(new Date());
        lockLjobMapUUID = lockUUID;
        isLockingLjobMap = true;
        return onlineLjobMap;
    }
    
    /**
     * 释放在线定时任务
     * @param ljobMap Map<String, LjobHeartbeat>
     * @throws Exception 
     */
    public synchronized static void releaseLjobMap(Map<String, List<LjobHeartbeat>> ljobMap, String lockUUID) throws Exception
    {
        if (lockUUID == null || !lockUUID.equals(lockLjobMapUUID))
        {
            LOG.error("释放在线定时任务失败, 锁定UUID为空或不正确, lockUUID: " + lockUUID + ", lockLjobMapUUID: " + lockLjobMapUUID);
            throw new Exception("释放在线定时任务失败, 锁定UUID为空或不正确");
        }
        
        lockTime = null;
        lockLjobMapUUID = null;
        isLockingLjobMap = false;
        onlineLjobMap = ljobMap;
    }
    
    /**
     * 添加在线定时任务
     * @param ljobHeartbeat LjobHeartbeat
     * @throws Exception 
     */
    private int addLjob(LjobHeartbeat ljobHeartbeat) throws Exception
    {
        if (isLjobMapLocked())
        {
            return ADD_LJOB_FAILED_WITH_LOCK;
        }
        
        String ip = ljobHeartbeat.getIp();
        String projectName = ljobHeartbeat.getProjectName();
        String jobName = ljobHeartbeat.getJobName();
        String ljobKey = projectName + "_" + jobName;
        
        List<LjobHeartbeat> ljobHeartbeatList = onlineLjobMap.get(ljobKey);
        if (null == ljobHeartbeatList)
        {
            ljobHeartbeatList = new ArrayList<LjobHeartbeat>();
            ljobHeartbeat.setFirstSendTime(ljobMonitor.getLjobServerTime());
            ljobHeartbeatList.add(ljobHeartbeat);
        }
        
        boolean isNewLjob = true;
        for (LjobHeartbeat oldljobHeartbeat : ljobHeartbeatList)
        {
            if (oldljobHeartbeat.getIp().equals(ip))
            {
                oldljobHeartbeat.setSendTime(ljobHeartbeat.getSendTime());
                oldljobHeartbeat.setStartup(ljobHeartbeat.isStartup());
                oldljobHeartbeat.setJobCronExpression(ljobHeartbeat.getJobCronExpression());
                oldljobHeartbeat.setDistributed(ljobHeartbeat.isDistributed());
                oldljobHeartbeat.setLjobRunHistorys(ljobHeartbeat.getLjobRunHistorys());
                oldljobHeartbeat.setSupportInstantRunReq(ljobHeartbeat.isSupportInstantRunReq());
                oldljobHeartbeat.setDescription(ljobHeartbeat.getDescription());
                oldljobHeartbeat.setSupportCloseJob(ljobHeartbeat.isSupportCloseJob());
                if (null == oldljobHeartbeat.getFirstSendTime())
                {
                    oldljobHeartbeat.setFirstSendTime(ljobMonitor.getLjobServerTime());
                }
                isNewLjob = false;
            }
        }
        
        if (isNewLjob)
        {
            ljobHeartbeat.setFirstSendTime(ljobMonitor.getLjobServerTime());
            ljobHeartbeatList.add(ljobHeartbeat);
        }
        
        onlineLjobMap.put(ljobKey, ljobHeartbeatList);
        return ADD_LJOB_SUCCESS;
    }
    
    /**
     * 从缓存中获取到当前在线定时任务列表
     */
    private void getOnlineLjobMapCache()
    {
        Jedis jedis = null;
        byte[] byteArray = null;
        Map<String, List<LjobHeartbeat>> onlineLjobMapCache = null;
        Set<String> keySet = null;
        List<LjobHeartbeat> tmpLjobList = null;
        
        try
        {
            jedis = jedisPool.getResource();
            byteArray = jedis.get(LjobConstant.LJOB_ONLINE_MAP_CACHE.getBytes());
            if (null != byteArray)
            {
                onlineLjobMapCache = toOnlineLjobMap(byteArray);
                if (null != onlineLjobMapCache)
                {
                    keySet = onlineLjobMapCache.keySet();
                    if (null != keySet)
                    {
                        for (String key : keySet)
                        {
                            tmpLjobList = onlineLjobMapCache.get(key);
                            if (null != tmpLjobList && tmpLjobList.size() > 0)
                            {
                                for (LjobHeartbeat ljob : tmpLjobList)
                                {
                                    ljob.setFirstSendTime(null);
                                }
                            }
                        }
                    }
                    
                    onlineLjobMap = onlineLjobMapCache;
                    LOG.debug("从缓存中获取到当前在线定时任务列表: " + onlineLjobMapCache.toString());
                }
            }
        }
        catch (JedisConnectionException e)
        {
            LOG.error("获取缓存中当前在线定时任务异常：" + e.toString(), e);
            if (null != jedis)
            {
                jedisPool.returnBrokenResource(jedis);
                jedis = null;
            }
        }
        catch (Exception e)
        {
            LOG.error("获取缓存中当前在线定时任务异常：" + e.toString(), e);
        }
        finally
        {
            if (null != jedis)
            {
                jedisPool.returnResource(jedis);
            }
        }
    }
    
    @Override
    public void run()
    {
        Jedis jedis = null;
        List<String> stringList = null;
        LjobHeartbeat ljobHeartbeat = null;
        int addLjobResult = ADD_LJOB_FAILED_WITH_LOCK;
        
        while (true && !ljobMonitor.isDestroy())
        {
            if (ljobMonitor.isMainServer())
            {
                LjobHeartbeatListener.isMainServer = true;
                
                try
                {
                    if (null == jedis)
                    {
                        jedis = jedisPool.getResource();
                    }
                    
                    // 从心跳监听队列中获取心跳
                    stringList = jedis.brpop(1, LjobConstant.LJOB_HEARTBEAT_QUEUE);
                    if (null != stringList && stringList.size() == 2)
                    {
                        ljobHeartbeat = JSONObject.parseObject(stringList.get(1), LjobHeartbeat.class);
                        if (null != ljobHeartbeat && ljobHeartbeat.isValideHeartbeat(ljobMonitor.getLjobServerTime()))
                        {
                            LOG.debug("接收到定时任务心跳信息: " + ljobHeartbeat.toString());
                            
                            // 添加或更新到在线定时任务map中
                            addLjobResult = ADD_LJOB_FAILED_WITH_LOCK;
                            while (addLjobResult == ADD_LJOB_FAILED_WITH_LOCK)
                            {
                                addLjobResult = this.addLjob(ljobHeartbeat);
                                
                                try
                                {
                                    Thread.sleep(100);
                                }
                                catch (Exception e)
                                {
                                    LOG.error(e.toString(), e);
                                }
                            }
                        }
                    }
                }
                catch (JedisConnectionException e)
                {
                    LOG.error("监听心跳队列异常：" + e.toString(), e);
                    if (null != jedis)
                    {
                        jedisPool.returnBrokenResource(jedis);
                        jedis = null;
                    }
                }
                catch (Exception e)
                {
                    LOG.error("监听心跳队列异常: " + e.toString(), e);
                    if (null != jedis)
                    {
                        jedisPool.returnResource(jedis);
                        jedis = null;
                    }
                }
            }
            else
            {
                // 从缓存中获取到当前在线定时任务列表
                this.getOnlineLjobMapCache();
                
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
        
        if (null != jedis)
        {
            jedisPool.returnResource(jedis);
        }
    }
    
    /**
     * 在线定时任务map是否被锁定
     * @return boolean
     */
    private synchronized boolean isLjobMapLocked()
    {
        if (isLockingLjobMap)
        {
            // 判断锁是否超时
            if (isLockTimeout())
            {
                // 如果已经超时则直接释放锁
                releaseLjobMap();
            }
            else
            {
                return true;
            }
        }
        
        return false;
    }
    
    /**
     * 释放锁
     */
    private static void releaseLjobMap()
    {
        lockTime = null;
        lockLjobMapUUID = null;
        isLockingLjobMap = false;
    }
    
    /**
     * 判断锁是否超时，最多锁定2分钟
     * @return boolean
     */
    private static boolean isLockTimeout()
    {
        if (null == lockTime)
        {
            return true;
        }
        
        Long lockTimeInteger = null;
        Long currentTimeInteger = null;
        
        try
        {
            DATE_TIME_FORMAT.parse(lockTime);
            lockTimeInteger = Long.valueOf(lockTime);
            currentTimeInteger = Long.valueOf(DATE_TIME_FORMAT.format(new Date()));
        }
        catch (Exception e)
        {
            LOG.error(e.toString(), e);
            lockTime = null;
            return true;
        }
        
        if (currentTimeInteger - lockTimeInteger > 120000)
        {
            lockTime = null;
            return true;
        }
        
        return false;
    }
    
    /**
     * 转换成Map<String, List<LjobHeartbeat>>
     * @param bytes
     * @return Map<String, List<LjobHeartbeat>>
     */
    @SuppressWarnings("unchecked")
    public static Map<String, List<LjobHeartbeat>> toOnlineLjobMap(byte[] bytes)
    {
        if (null == bytes)
        {
            return null;
        }
        
        Map<String, List<LjobHeartbeat>> obj = null;
        ByteArrayInputStream bis = null;
        ObjectInputStream ois = null;
        
        try
        {
            bis = new ByteArrayInputStream(bytes);
            ois = new ObjectInputStream(bis);
            obj = (Map<String, List<LjobHeartbeat>>) ois.readObject();
            return obj;
        }
        catch (Exception e)
        {
            LOG.error(e.toString(), e);
            return null;
        }
        finally
        {
            if (null != ois)
            {
                try
                {
                    ois.close();
                }
                catch (IOException e)
                {
                    LOG.error(e.toString(), e);
                }
            }
            
            if (null != bis)
            {
                try
                {
                    bis.close();
                }
                catch (IOException e)
                {
                    LOG.error(e.toString(), e);
                }
            }
        }
    }
}
