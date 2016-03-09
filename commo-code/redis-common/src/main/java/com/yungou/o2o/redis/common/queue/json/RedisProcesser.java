package com.yungou.o2o.redis.common.queue.json;

/**
 * Redis 消息处理器 json对象消息处理器
 * @author liang.qiang
 * @version 0.1.0
 */
public interface RedisProcesser
{
    void doProcess(String queueName, String content);
}
