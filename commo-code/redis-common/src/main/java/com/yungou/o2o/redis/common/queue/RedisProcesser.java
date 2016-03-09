package com.yungou.o2o.redis.common.queue;

/**
 * Redis 消息处理器 序列化对象消息处理器
 * @version 0.1.0
 */
public interface RedisProcesser
{
    void doProcess(String queueName, RedisMessage redisMessage);
}
