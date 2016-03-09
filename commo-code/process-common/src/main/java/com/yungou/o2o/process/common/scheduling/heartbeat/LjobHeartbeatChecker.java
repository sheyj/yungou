package com.yungou.o2o.process.common.scheduling.heartbeat;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.ObjectOutputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.exceptions.JedisConnectionException;

import com.yungou.o2o.process.common.scheduling.LjobMonitor;
import com.yungou.o2o.process.common.scheduling.constant.LjobConstant;
import com.yungou.o2o.process.common.scheduling.model.LjobHeartbeat;

/**
 * 定时任务心跳检测类
 * @author lin.zb
 */
public class LjobHeartbeatChecker extends Thread
{
    private static final Logger LOG = LoggerFactory.getLogger(LjobHeartbeatChecker.class);
    
    private LjobMonitor ljobMonitor = null;
    
    private JedisPool jedisPool = null;
    
    public LjobHeartbeatChecker(LjobMonitor ljobMonitor, JedisPool jedisPool)
    {
        this.ljobMonitor = ljobMonitor;
        this.jedisPool = jedisPool;
    }

    @Override
    public void run()
    {
        Map<String, List<LjobHeartbeat>> targetLjobMap = null;
        Map<String, List<LjobHeartbeat>> tmpLjobMap = null;
        Map<String, List<LjobHeartbeat>> onlineLjobMap = null;
        Set<String> keySet = null;
        List<LjobHeartbeat> tmpLjobList = null;
        List<LjobHeartbeat> ljobList = null;
        String lockUUID = null;
        Jedis jedis = null;
        
        while (true && !ljobMonitor.isDestroy())
        {
            if (ljobMonitor.isMainServer())
            {
                onlineLjobMap = new HashMap<String, List<LjobHeartbeat>>();
                tmpLjobMap = new HashMap<String, List<LjobHeartbeat>>();
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
                
                tmpLjobMap.putAll(targetLjobMap);
                keySet = tmpLjobMap.keySet();
                if (null != keySet)
                {
                    for (String key : keySet)
                    {
                        tmpLjobList = tmpLjobMap.get(key);
                        if (null != tmpLjobList && tmpLjobList.size() > 0)
                        {
                            ljobList = new ArrayList<LjobHeartbeat>();
                            for (LjobHeartbeat ljob : tmpLjobList)
                            {
                                if (ljob.isValideHeartbeat(ljobMonitor.getLjobServerTime()))
                                {
                                    ljobList.add(ljob);
                                }
                            }
                            
                            onlineLjobMap.put(key, ljobList);
                        }
                    }
                }
                
                LOG.debug("当前在线定时任务: " + onlineLjobMap.toString());
                try
                {
                    jedis = jedisPool.getResource();
                    jedis.set(LjobConstant.LJOB_ONLINE_MAP_CACHE.getBytes(), getOnlineLjobMapByte(onlineLjobMap));
                }
                catch (JedisConnectionException e)
                {
                    LOG.error("更新当前在线定时任务到缓存异常：" + e.toString(), e);
                    if (null != jedis)
                    {
                        jedisPool.returnBrokenResource(jedis);
                        jedis = null;
                    }
                }
                catch (Exception e)
                {
                    LOG.error("更新当前在线定时任务到缓存异常：" + e.toString(), e);
                }
                finally
                {
                    if (null != jedis)
                    {
                        jedisPool.returnResource(jedis);
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
     * 转换成字节数组
     * @return byte[]
     */
    public static byte[] getOnlineLjobMapByte(Map<String, List<LjobHeartbeat>> onlineLjobMap)
    {
        ByteArrayOutputStream bos = null;
        ObjectOutputStream oos = null;
        
        try
        {
            bos = new ByteArrayOutputStream();
            oos = new ObjectOutputStream(bos);
            oos.writeObject(onlineLjobMap);
            oos.flush();
            return bos.toByteArray();
        }
        catch (Exception e)
        {
            LOG.error(e.toString(), e);
            return null;
        }
        finally
        {
            if (null != oos)
            {
                try
                {
                    oos.close();
                }
                catch (IOException e)
                {
                    LOG.error(e.toString(), e);
                }
            }
            
            if (null != bos)
            {
                try
                {
                    bos.close();
                }
                catch (IOException e)
                {
                    LOG.error(e.toString(), e);
                }
            }
        }
    }
}
