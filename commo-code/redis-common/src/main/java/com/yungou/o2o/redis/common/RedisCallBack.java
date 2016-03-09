package com.yungou.o2o.redis.common;

import redis.clients.jedis.Jedis;

/**
 * Redis操作回调接口
 * 
 * @author lin.zb
 * @date 2016年1月7日 下午1:57:33
 * @version 1.0.0 
 * @copyright wonhigh.net.cn 
 */
public interface RedisCallBack<T> {
	T doInRedis(Jedis jedis) throws Throwable;
}
