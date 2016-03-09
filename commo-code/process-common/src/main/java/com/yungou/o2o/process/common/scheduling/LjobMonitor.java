package com.yungou.o2o.process.common.scheduling;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import redis.clients.jedis.JedisPool;

import com.yungou.o2o.process.common.scheduling.heartbeat.LjobHeartbeatChecker;
import com.yungou.o2o.process.common.scheduling.heartbeat.LjobHeartbeatListener;
import com.yungou.o2o.process.common.scheduling.server.LjobServerOnlineChecker;
import com.yungou.o2o.process.common.scheduling.server.LjobServerOnlineSender;
import com.yungou.o2o.process.common.scheduling.servertime.LjobServerTimeSetter;
import com.yungou.o2o.process.common.util.CommonUtil;

/**
 * 定时任务监控
 * @author lin.zb
 */
public class LjobMonitor
{
    private static final Logger LOG = LoggerFactory.getLogger(LjobMonitor.class);
    
    private DateFormat dateTimeFormat = new SimpleDateFormat("yyyyMMddHHmmss");
    
    private LjobServerOnlineChecker ljobServerOnlineChecker = null;
    
    private LjobServerOnlineSender ljobServerOnlineSender = null;
    
    private LjobServerTimeSetter ljobServerTimeSetter = null;
    
    private LjobHeartbeatListener ljobHeartbeatListener = null;
    
    private LjobHeartbeatChecker ljobHeartbeatChecker = null;
    
    // private LjobStartupSender ljobStartupSender = null;
    
    private boolean isDestroy = false;
    
    private JedisPool jedisPool = null;
    
    private String ip = null;
    
    /**
     * 是否主监控服务器: 只有主监控服务器才会接收并统计定时任务心跳
     */
    private boolean isMainServer = false;

    public void setJedisPool(JedisPool jedisPool)
    {
        this.jedisPool = jedisPool;
    }
    
    public boolean isMainServer()
    {
        return isMainServer;
    }

    public boolean isDestroy()
    {
        return isDestroy;
    }

    public void init() throws Exception
    {
        // 获取本地IP
        ip = CommonUtil.getLocalIP();
        
        // 启动定时任务主监控服务器启动校验线程
        ljobServerOnlineChecker = new LjobServerOnlineChecker(this, jedisPool, ip);
        ljobServerOnlineChecker.setName("ServerOnlineChecker_" + dateTimeFormat.format(new Date()));
        ljobServerOnlineChecker.start();
        
        // 启动定时任务主监控服务器在线更新线程
        LOG.info("启动定时任务服务器在线更新线程...");
        ljobServerOnlineSender = new LjobServerOnlineSender(this, jedisPool, ip);
        ljobServerOnlineSender.setName("ServerOnlineSender_" + dateTimeFormat.format(new Date()));
        ljobServerOnlineSender.start();
        
        // 启动定时任务服务器时间更新线程
        LOG.info("启动定时任务服务器时间更新线程...");
        ljobServerTimeSetter = new LjobServerTimeSetter(this, jedisPool);
        ljobServerTimeSetter.setName("ServerTimeSetter_" + dateTimeFormat.format(new Date()));
        ljobServerTimeSetter.start();
        
        // 启动定时任务心跳监听线程
        LOG.info("启动定时任务心跳监听线程...");
        ljobHeartbeatListener = new LjobHeartbeatListener(this, jedisPool);
        ljobHeartbeatListener.setName("HeartbeatListener_" + dateTimeFormat.format(new Date()));
        ljobHeartbeatListener.start();
        
        // 启动在线定时任务检测线程
        LOG.info("启动在线定时任务检测线程...");
        ljobHeartbeatChecker = new LjobHeartbeatChecker(this, jedisPool);
        ljobHeartbeatChecker.setName("HeartbeatChecker_" + dateTimeFormat.format(new Date()));
        ljobHeartbeatChecker.start();
        
        // 为了可靠性，暂时不使用自动启动定时任务机制
        // 启动在线定时任务启动线程
//        LOG.info("启动在线定时任务启动线程");
//        ljobStartupSender = new LjobStartupSender(this);
//        ljobStartupSender.setJedisPool(jedisPool);
//        ljobStartupSender.setName("StartupSender_" + dateTimeFormat.format(new Date()));
//        ljobStartupSender.start();
    }
    
    public void startMainServerThreads()
    {
        LOG.info("启动本服务器为主监控服务器...");
        isMainServer = true;
    }
    
    public void stopMainServerThreads()
    {
        LOG.info("变更本服务器为从监控服务器...");
        isMainServer = false;
    }
    
    public void destroy()
    {
        isMainServer = false;
        isDestroy = true;
    }
    
    /**
     * 获取服务器时间
     * @return
     */
    public String getLjobServerTime()
    {
        return dateTimeFormat.format(new Date());
    }
}
