package com.yungou.o2o.process.common.scheduling.constant;

/**
 * 定时任务常量类
 * @author lin.zb
 */
public final class LjobConstant
{
    /**
     * 定时任务redis心跳监听队列
     */
    public static final String LJOB_HEARTBEAT_QUEUE = "LJOB_HEARTBEAT_QUEUE";
    
    /**
     * 定时任务手动执行请求监听队列前缀
     */
    public static final String LJOB_MANUAL_RUN_REQUEST_QUEUE_PREFIX = "LJOB_RUN_REQUEST_";
    
    /**
     * 定时任务启动监听队列前缀
     */
    public static final String LJOB_STARTUP_QUEUE_PREFIX = "LJOB_STARTUP_";
    
    /**
     * 定时任务服务端时间
     */
    public static final String LJOB_SERVER_TIME = "LJOB_SERVER_TIME";
    
    /**
     * 定时任务服务器在线
     */
    public static final String LJOB_SERVER_ONLINE = "LJOB_SERVER_ONLINE";
    
    /**
     * 在线定时任务缓存
     */
    public static final String LJOB_ONLINE_MAP_CACHE = "LJOB_ONLINE_MAP_CACHE";
    
    /**
     * 定时任务状态变更日志
     */
    public static final String LJOB_STATUS_CHANGE_LOG = "LJOB_STATUS_CHANGE_LOG";
    
    /**
     * 有效心跳时间
     */
    public static final long HEARTBEAT_VALIDATE_SECONDS = 120;
    
    /**
     * 有效启动时间
     */
    public static final long STARTUP_VALIDATE_SECONDS = 120;
    
    /**
     * 有效手动执行请求时间
     */
    public static final long RUN_REQUEST_VALIDATE_SECONDS = 120;
    
    /**
     * 服务器时间过期时间
     */
    public static final int SERVER_TIME_TIMEOUT_SECONDS = 10;
    
    /**
     * 有效心跳时间
     */
    public static final long FIRST_HEARTBEAT_TIMEOUT_SECONDS = 30;
    
    /**
     * 请求定时任务状态：启动
     */
    public static final String STARTUP_STATUS = "startup";
    
    /**
     * 请求定时任务状态：关闭
     */
    public static final String SHUTDOWN_STATUS = "shutdown";
}
