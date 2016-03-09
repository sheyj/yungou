package com.yungou.o2o.redis.common;

import java.util.List;
import java.util.Map;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.Assert;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.exceptions.JedisConnectionException;

/**
 * Redis操作工具类
 */
public class RedisTemplate {
	private static final Logger LOG = LoggerFactory.getLogger(RedisTemplate.class);

	private JedisPool redisPool;

	public JedisPool getRedisPool() {
		return redisPool;
	}

	public void setRedisPool(JedisPool redisPool) {
		this.redisPool = redisPool;
	}

	/**
	 * Add the string value to the head (LPUSH) or tail (RPUSH) of the list stored at key. 
	 * If the key does not exist an empty list is created just before the append operation. 
	 * If the key exists but is not a List an error will catch.
	 * 
	 * @param queueName 字符串队列名
	 * @param content 字符串值
	 */
	public void push(String queueName, String content) {
		Jedis jedis = null;

		try {
			jedis = redisPool.getResource();
			jedis.lpush(queueName.getBytes(), content.getBytes());
		}
		catch (JedisConnectionException e) {
			if (null != jedis) {
				redisPool.returnBrokenResource(jedis);
				jedis = null;
			}

			LOG.error("jedis.lpush异常：" + e.toString(), e);
		}
		catch (Exception e) {
			LOG.error("jedis.lpush异常：" + e.toString(), e);
		}
		finally {
			if (null != jedis) {
				redisPool.returnResource(jedis);
			}
		}
	}

	/**
	 * Add the string value to the head (LPUSH) or tail (RPUSH) of the list stored at key. 
	 * If the key does not exist an empty list is created just before the append operation. 
	 * If the key exists but is not a List an error will catch. 
	 * 
	 * @param queueName 比特对列名
	 * @param byteContent 比特值
	 */
	public void push(byte[] queueName, byte[] byteContent) {
		Jedis jedis = null;

		try {
			jedis = redisPool.getResource();
			jedis.lpush(queueName, byteContent);
		}
		catch (JedisConnectionException e) {
			if (null != jedis) {
				redisPool.returnBrokenResource(jedis);
				jedis = null;
			}

			LOG.error("jedis.lpush异常：" + e.toString(), e);
		}
		catch (Exception e) {
			LOG.error("jedis.lpush异常：" + e.toString(), e);
		}
		finally {
			if (null != jedis) {
				redisPool.returnResource(jedis);
			}
		}
	}

	/**
	 * Get the value of the specified key. 
	 * If the key does not exist the special value 'nil' is returned. 
	 * If the value stored at key is not a string an error will catch 
	 * because GET can only handle string values. 
	 * 
	 * @param key
	 * @return byte[]
	 */
	public byte[] get(byte[] key) {
		Jedis jedis = null;

		try {
			jedis = redisPool.getResource();
			return jedis.get(key);
		}
		catch (JedisConnectionException e) {
			if (null != jedis) {
				redisPool.returnBrokenResource(jedis);
				jedis = null;
			}

			LOG.error("jedis.get异常：" + e.toString(), e);
			return null;
		}
		catch (Exception e) {
			LOG.error("jedis.get异常：" + e.toString(), e);
			return null;
		}
		finally {
			if (null != jedis) {
				redisPool.returnResource(jedis);
			}
		}
	}

	/**
	 * Get and delete the value of the specified key. 
	 * If the key does not exist the special value 'nil' is returned. 
	 * If the value stored at key is not a string an error will catch 
	 * because GET can only handle string values. 
	 * 
	 * @param key
	 * @return
	 */
	public byte[] getAndDel(byte[] key) {
		Jedis jedis = null;
		byte[] value = null;
		try {
			jedis = redisPool.getResource();
			value = jedis.get(key);
			jedis.del(key);
			return value;
		}
		catch (JedisConnectionException e) {
			if (null != jedis) {
				redisPool.returnBrokenResource(jedis);
				jedis = null;
			}

			LOG.error("jedis getAndDel异常：" + e.toString(), e);
			return null;
		}
		catch (Exception e) {
			LOG.error("jedis getAndDel异常：" + e.toString(), e);
			return null;
		}
		finally {
			if (null != jedis) {
				redisPool.returnResource(jedis);
			}
		}
	}

	/**
	 * 设置一个具有生存周期的key-value 主要用于缓存
	 * @param key
	 * @param value
	 * @param timeout
	 */
	public void setex(String key, String value, int timeout) {
		Jedis jedis = null;

		try {
			jedis = redisPool.getResource();
			jedis.setex(key, timeout, value);
		}
		catch (JedisConnectionException e) {
			if (null != jedis) {
				redisPool.returnBrokenResource(jedis);
				jedis = null;
			}

			LOG.error("jedis setex异常：" + e.toString(), e);
		}
		catch (Exception e) {
			LOG.error("jedis setex异常：" + e.toString(), e);
		}
		finally {
			if (null != jedis) {
				redisPool.returnResource(jedis);
			}
		}
	}

	/**
	 * 获取redis中的key对应的值
	 * @param key
	 * @return
	 */
	public String get(String key) {
		Jedis jedis = null;
		String value = "";
		try {
			jedis = redisPool.getResource();
			value = jedis.get(key);
		}
		catch (JedisConnectionException e) {
			if (null != jedis) {
				redisPool.returnBrokenResource(jedis);
				jedis = null;
			}

			LOG.error("jedis.get异常: " + e.toString(), e);
		}
		catch (Exception e) {
			LOG.error("jedis.get异常: " + e.toString(), e);
		}
		finally {
			if (null != jedis) {
				redisPool.returnResource(jedis);
			}
		}
		return value;
	}

	/**
	 * 删除一个指定的key
	 * @param key
	 */
	public void del(String key) {
		Jedis jedis = null;

		try {
			jedis = redisPool.getResource();
			jedis.del(key);
		}
		catch (JedisConnectionException e) {
			if (null != jedis) {
				redisPool.returnBrokenResource(jedis);
				jedis = null;
			}

			LOG.error("jedis.del异常: " + e.toString(), e);
		}
		catch (Exception e) {
			LOG.error("jedis.del异常: " + e.toString(), e);
		}
		finally {
			if (null != jedis) {
				redisPool.returnResource(jedis);
			}
		}
	}

	/**
	 * 模糊查询返回符合条件的key的集合
	 * @param pattern
	 * @return
	 */
	public Set<String> keys(String pattern) {
		Jedis jedis = null;

		try {
			jedis = redisPool.getResource();
			return jedis.keys(pattern);
		}
		catch (JedisConnectionException e) {
			if (null != jedis) {
				redisPool.returnBrokenResource(jedis);
				jedis = null;
			}

			LOG.error("jedis.keys异常: " + e.toString(), e);
			return null;
		}
		catch (Exception e) {
			LOG.error("jedis.keys异常: " + e.toString(), e);
			return null;
		}
		finally {
			if (null != jedis) {
				redisPool.returnResource(jedis);
			}
		}
	}

	/**
	 * 像redis数据库中放入一个不限时的key
	 * @param key
	 * @param value
	 */
	public void set(byte[] key, byte[] value) {
		Jedis jedis = null;

		try {
			jedis = redisPool.getResource();
			jedis.set(key, value);
		}
		catch (JedisConnectionException e) {
			if (null != jedis) {
				redisPool.returnBrokenResource(jedis);
				jedis = null;
			}

			LOG.error("jedis.set异常: " + e.toString(), e);
		}
		catch (Exception e) {
			LOG.error("jedis.set异常: " + e.toString(), e);
		}
		finally {
			if (null != jedis) {
				redisPool.returnResource(jedis);
			}
		}
	}

	/**
	 * 像redis数据库中放入一个不限时的key
	 * @param key
	 * @param value
	 */
	public void set(String key, String value) {
		Jedis jedis = null;

		try {
			jedis = redisPool.getResource();
			jedis.set(key, value);
		}
		catch (JedisConnectionException e) {
			if (null != jedis) {
				redisPool.returnBrokenResource(jedis);
				jedis = null;
			}

			LOG.error("jedis.set异常: " + e.toString(), e);
		}
		catch (Exception e) {
			LOG.error("jedis.set异常: " + e.toString(), e);
		}
		finally {
			if (null != jedis) {
				redisPool.returnResource(jedis);
			}
		}
	}

	/**
	 * 放入一个key 做为分布式锁
	 * @param key
	 * @param lockSeonds 等于-1时 锁一个小时 相当于永久锁
	 * @return
	 */
	public boolean setLockNx(String key, int lockSeonds) {
		Jedis jedis = null;
		Long valueLong = null;
		long setnxSuccess = 0;

		try {
			if (lockSeonds == -1) {
				lockSeonds = 60 * 60;// 一个小时 相当于永久锁
			}

			valueLong = System.currentTimeMillis() + lockSeonds * 1000L + 1;
			jedis = redisPool.getResource();
			setnxSuccess = jedis.setnx(key, valueLong.toString());
			if (setnxSuccess == 1) {
				long exSuccess = jedis.expire(key, lockSeonds);
				if (exSuccess == 1) {
					return true;
				}
			}
			else {
				/**
				 * String old = jedis.get(key); if(!StringUtils.isEmpty(old)){
				 * long oldExpireAt = Long.valueOf(old);
				 * if(System.currentTimeMillis()>oldExpireAt){ jedis.del(key); }
				 * }
				 */
			}
			return false;
		}
		catch (JedisConnectionException e) {
			if (null != jedis) {
				redisPool.returnBrokenResource(jedis);
				jedis = null;
			}

			LOG.error("redis setLockNx异常: " + e.toString(), e);
			return false;
		}
		catch (Exception e) {
			LOG.error("redis setLockNx异常: " + e.toString(), e);
			return false;
		}
		finally {
			if (jedis != null) {
				redisPool.returnResource(jedis);
			}
		}
	}

	/**
	 * redis加锁
	 * @param key 锁定的key
	 * @param lockTime 锁定key的时间，如果为-1表示一个小时，相当于永久锁，需要主动释放
	 * @param timeOut 如果已经被加锁，需等待的时间，等待超时将返回失败
	 * @return
	 */
	public boolean lock(String key, int lockTime, int timeOut) {
		long waitEndTime = System.currentTimeMillis() + (timeOut * 1000);
		String lockKey = ("JedisLock_".concat(key)).intern();
		long currTime = 0;
		try {
			while (!this.setLockNx(lockKey, lockTime)) {
				currTime = System.currentTimeMillis();
				if (waitEndTime < currTime) {
					// 加锁失败 等待超时
					LOG.error("key{}加锁失败,等待超时!", key);
					return false;
				}
				Thread.sleep(100);
			}
		}
		catch (InterruptedException e) {
			LOG.error("redis lock sleep异常: " + e.toString(), e);
			return false;
		}
		catch (Exception e) {
			LOG.error("redis lock sleep异常: " + e.toString(), e);
			return false;
		}

		LOG.debug("key{}加锁成功,锁定时间{}s.", key, lockTime);
		return true;
	}

	/**
	 * 释放key,这个方法在加锁成功锁使用完毕以后调用，需要放到finally里
	 * @param key
	 * @return
	 */
	public boolean release(String key) {
		Jedis jedis = null;
		String lockKey = null;
		boolean ok = false;

		try {
			jedis = redisPool.getResource();
			lockKey = ("JedisLock_".concat(key)).intern();
			ok = jedis.del(lockKey) == 1;
			if (ok) {
				LOG.debug("释放key{}锁成功.", key);
			}
			else {
				LOG.error("释放key{}锁失败，已自动释放.", key);
			}

			return ok;
		}
		catch (JedisConnectionException e) {
			if (null != jedis) {
				redisPool.returnBrokenResource(jedis);
				jedis = null;
			}

			LOG.error("释放锁异常: " + e.toString() + ", key: " + key, e);
			return false;
		}
		catch (Exception e) {
			LOG.error("释放锁异常: " + e.toString() + ", key: " + key, e);
			return false;
		}
		finally {
			if (jedis != null) {
				redisPool.returnResource(jedis);
			}
		}
	}

	/**
	 * 不存在key，就设置值value，设置成功返回1，失败返回0
	 * @param key
	 * @param value
	 * @return
	 */
	public long setnx(String key, String value) {
		Jedis jedis = null;

		try {
			jedis = redisPool.getResource();
			return jedis.setnx(key, value);
		}
		catch (JedisConnectionException e) {
			if (null != jedis) {
				redisPool.returnBrokenResource(jedis);
				jedis = null;
			}

			LOG.error("jedis.setnx异常: " + e.toString() + ", key: " + key, e);
			return 0;
		}
		catch (Exception e) {
			LOG.error("jedis.setnx异常: " + e.toString() + ", key: " + key, e);
			return 0;
		}
		finally {
			if (jedis != null) {
				redisPool.returnResource(jedis);
			}
		}

	}

	public List<String> lRange(String key) {
		Jedis jedis = null;

		try {
			jedis = redisPool.getResource();
			return jedis.lrange(key, 0, -1);
		}
		catch (JedisConnectionException e) {
			if (null != jedis) {
				redisPool.returnBrokenResource(jedis);
				jedis = null;
			}

			LOG.error("jedis.lrange异常: " + e.toString() + ", key: " + key, e);
			return null;
		}
		catch (Exception e) {
			LOG.error("jedis.lrange异常: " + e.toString(), e);
			return null;
		}
		finally {
			if (null != jedis) {
				redisPool.returnResource(jedis);
			}
		}
	}

	public boolean exists(String key) {
		Jedis jedis = null;

		try {
			jedis = redisPool.getResource();
			return jedis.exists(key);
		}
		catch (JedisConnectionException e) {
			if (null != jedis) {
				redisPool.returnBrokenResource(jedis);
				jedis = null;
			}

			LOG.error("jedis.exists异常: " + e.toString() + ", key: " + key, e);
			return false;
		}
		catch (Exception e) {
			LOG.error("jedis.exists异常: " + e.toString() + ", key: " + key, e);
			return false;
		}
		finally {
			if (null != jedis) {
				redisPool.returnResource(jedis);
			}
		}
	}

	/**
	 * @category 设置键的保存时间
	 * @param key
	 * @param seconds
	 * @return
	 */
	public Long expire(String key, int seconds) {
		Jedis jedis = null;

		try {
			jedis = redisPool.getResource();
			return jedis.expire(key, seconds);
		}
		catch (JedisConnectionException e) {
			if (null != jedis) {
				redisPool.returnBrokenResource(jedis);
				jedis = null;
			}

			LOG.error("jedis.expire异常: " + e.toString() + ", key: " + key, e);
			return null;
		}
		catch (Exception e) {
			LOG.error("jedis.expire异常: " + e.toString(), e);
			return null;
		}
		finally {
			if (null != jedis) {
				redisPool.returnResource(jedis);
			}
		}
	}

	/**
	 * @category 弹出集合
	 * @param key
	 * @return
	 */
	public Set<String> sMembers(String key) {
		Jedis jedis = null;

		try {
			jedis = redisPool.getResource();
			return jedis.smembers(key);
		}
		catch (JedisConnectionException e) {
			if (null != jedis) {
				redisPool.returnBrokenResource(jedis);
				jedis = null;
			}

			LOG.error("jedis.smembers异常: " + e.toString() + ", key: " + key, e);
			return null;
		}
		catch (Exception e) {
			LOG.error("jedis.smembers异常: " + e.toString(), e);
			return null;
		}
		finally {
			if (null != jedis) {
				redisPool.returnResource(jedis);
			}
		}
	}

	/**
	 * @category 删除集合中的元素
	 * @param key
	 * @param members
	 * @return
	 */
	public Long sRem(String key, String... members) {
		Long result = null;
		Jedis jedis = null;

		try {
			if (members != null && members.length > 0) {
				jedis = redisPool.getResource();
				result = jedis.srem(key, members);
			}
			return result;
		}
		catch (JedisConnectionException e) {
			if (null != jedis) {
				redisPool.returnBrokenResource(jedis);
				jedis = null;
			}

			LOG.error("jedis.srem异常: " + e.toString() + ", key: " + key, e);
			return null;
		}
		catch (Exception e) {
			LOG.error("jedis.srem异常: " + e.toString(), e);
			return null;
		}
		finally {
			if (null != jedis) {
				redisPool.returnResource(jedis);
			}
		}
	}

	/**
	 * @category 返回多个key值集合的交集
	 * @param keys
	 * @return
	 */
	public Set<String> sInter(String... keys) {
		Jedis jedis = null;

		try {
			jedis = redisPool.getResource();
			return jedis.sinter(keys);
		}
		catch (JedisConnectionException e) {
			if (null != jedis) {
				redisPool.returnBrokenResource(jedis);
				jedis = null;
			}

			LOG.error("jedis.sinter异常: " + e.toString(), e);
			return null;
		}
		catch (Exception e) {
			LOG.error("jedis.sinter异常: " + e.toString(), e);
			return null;
		}
		finally {
			if (null != jedis) {
				redisPool.returnResource(jedis);
			}
		}
	}

	/**
	 * @category 返回多个key值集合的并集
	 * @param keys
	 * @return
	 */
	public Set<String> sUnion(String... keys) {
		Jedis jedis = null;

		try {
			jedis = redisPool.getResource();
			return jedis.sunion(keys);
		}
		catch (JedisConnectionException e) {
			if (null != jedis) {
				redisPool.returnBrokenResource(jedis);
				jedis = null;
			}

			LOG.error("jedis.sunion异常: " + e.toString(), e);
			return null;
		}
		catch (Exception e) {
			LOG.error("jedis.sunion异常: " + e.toString(), e);
			return null;
		}
		finally {
			if (null != jedis) {
				redisPool.returnResource(jedis);
			}
		}
	}

	/**
	 * @category 使用无序的Set
	 * @param key
	 * @param score
	 * @param member
	 * @return
	 */
	public Long sAdd(String key, String... members) {
		Long result = null;
		Jedis jedis = null;

		try {
			if (members != null && members.length > 0) {
				jedis = redisPool.getResource();
				result = jedis.sadd(key, members);
			}

			return result;
		}
		catch (JedisConnectionException e) {
			if (null != jedis) {
				redisPool.returnBrokenResource(jedis);
				jedis = null;
			}

			LOG.error("jedis.sadd异常: " + e.toString(), e);
			return null;
		}
		catch (Exception e) {
			LOG.error("jedis.sadd异常: " + e.toString(), e);
			return null;
		}
		finally {
			if (null != jedis) {
				redisPool.returnResource(jedis);
			}
		}
	}

	public Map<String, String> hgetAll(String key) {
		Jedis jedis = null;

		try {
			jedis = redisPool.getResource();
			return jedis.hgetAll(key);
		}
		catch (JedisConnectionException e) {
			if (null != jedis) {
				redisPool.returnBrokenResource(jedis);
				jedis = null;
			}

			LOG.error("jedis.hgetAll异常: " + e.toString(), e);
			return null;
		}
		catch (Exception e) {
			LOG.error("jedis.hgetAll异常: " + e.toString(), e);
			return null;
		}
		finally {
			if (jedis != null) {
				redisPool.returnResource(jedis);
			}
		}
	}

	public List<String> hmget(String key, String... fields) {
		Jedis jedis = null;

		try {
			jedis = redisPool.getResource();
			return jedis.hmget(key, fields);
		}
		catch (JedisConnectionException e) {
			if (null != jedis) {
				redisPool.returnBrokenResource(jedis);
				jedis = null;
			}

			LOG.error("jedis.hmget异常: " + e.toString(), e);
			return null;
		}
		catch (Exception e) {
			LOG.error("jedis.hmget异常: " + e.toString(), e);
			return null;
		}
		finally {
			if (jedis != null) {
				redisPool.returnResource(jedis);
			}
		}
	}

	/**
	 * hset方法
	 * @param key
	 * @param field
	 * @param value
	 * @return If the field already exists, and the HSET just produced an update of the value, 
	 *         0 is returned, otherwise if a new field is created 1 is returned.
	 *         如果出现异常，则返回-1
	 */
	public long hset(String key, String field, String value) {
		Jedis jedis = null;
		try {
			jedis = redisPool.getResource();
			return jedis.hset(key, field, value);
		}
		catch (JedisConnectionException e) {
			if (null != jedis) {
				redisPool.returnBrokenResource(jedis);
				jedis = null;
			}

			LOG.error("jedis.hset异常: " + e.toString(), e);
			return -1;
		}
		catch (Exception e) {
			LOG.error("jedis.hset异常: " + e.toString(), e);
			return -1;
		}
		finally {
			if (jedis != null) {
				redisPool.returnResource(jedis);
			}
		}
	}

	public String hmset(String key, Map<String, String> map) {
		Jedis jedis = null;

		try {
			jedis = redisPool.getResource();
			return jedis.hmset(key, map);
		}
		catch (JedisConnectionException e) {
			if (null != jedis) {
				redisPool.returnBrokenResource(jedis);
				jedis = null;
			}

			LOG.error("jedis.hmset异常: " + e.toString(), e);
			return null;
		}
		catch (Exception e) {
			LOG.error("jedis.hmset异常: " + e.toString(), e);
			return null;
		}
		finally {
			if (jedis != null) {
				redisPool.returnResource(jedis);
			}
		}
	}

	public String rename(String oldKey, String newKey) {
		Jedis jedis = null;

		try {
			jedis = redisPool.getResource();
			return jedis.rename(oldKey, newKey);
		}
		catch (JedisConnectionException e) {
			if (null != jedis) {
				redisPool.returnBrokenResource(jedis);
				jedis = null;
			}

			LOG.error("jedis.rename异常: " + e.toString(), e);
			return null;
		}
		catch (Exception e) {
			LOG.error("jedis.rename异常: " + e.toString(), e);
			return null;
		}
		finally {
			if (jedis != null) {
				redisPool.returnResource(jedis);
			}
		}
	}

	/**
	 * @category 添加有序集合
	 * @param key
	 * @param score
	 * @param member
	 * @return
	 */
	public Long zadd(String key, double score, String member) {
		Jedis jedis = null;

		try {
			jedis = redisPool.getResource();
			return jedis.zadd(key, score, member);
		}
		catch (JedisConnectionException e) {
			if (null != jedis) {
				redisPool.returnBrokenResource(jedis);
				jedis = null;
			}

			LOG.error("jedis.zadd异常: " + e.toString(), e);
			return null;
		}
		catch (Exception e) {
			LOG.error("jedis.zadd异常: " + e.toString(), e);
			return null;
		}
		finally {
			if (jedis != null) {
				redisPool.returnResource(jedis);
			}
		}
	}

	/**
	 * @category 删除有序集合中的值
	 * @param key
	 * @param members
	 * @return
	 */
	public Long zrem(String key, String... members) {
		Jedis jedis = null;

		try {
			jedis = redisPool.getResource();
			return jedis.zrem(key, members);
		}
		catch (JedisConnectionException e) {
			if (null != jedis) {
				redisPool.returnBrokenResource(jedis);
				jedis = null;
			}

			LOG.error("jedis.zrem异常: " + e.toString(), e);
			return null;
		}
		catch (Exception e) {
			LOG.error("jedis.zrem异常: " + e.toString(), e);
			return null;
		}
		finally {
			if (jedis != null) {
				redisPool.returnResource(jedis);
			}
		}
	}

	/**
	 * @category 返回有序集合中的元素集合
	 * @param key
	 * @param start
	 * @param end
	 * @return
	 */
	public Set<String> zrange(String key, long start, long end) {
		Jedis jedis = null;

		try {
			jedis = redisPool.getResource();
			return jedis.zrange(key, start, end);
		}
		catch (JedisConnectionException e) {
			if (null != jedis) {
				redisPool.returnBrokenResource(jedis);
				jedis = null;
			}

			LOG.error("jedis.zrange异常: " + e.toString(), e);
			return null;
		}
		catch (Exception e) {
			LOG.error("jedis.zrange异常: " + e.toString(), e);
			return null;
		}
		finally {
			if (jedis != null) {
				redisPool.returnResource(jedis);
			}
		}
	}

	/**
	 * 对指定的key自增,第一次是从0开始
	 * @param key
	 * @return 自增后的值
	 */
	public long incr(String key) throws JedisConnectionException, Exception {
		Jedis jedis = null;
		try {
			jedis = redisPool.getResource();
			return jedis.incr(key);
		}
		catch (JedisConnectionException e) {
			if (null != jedis) {
				redisPool.returnBrokenResource(jedis);
				jedis = null;
			}

			LOG.error("jedis.incr异常: " + e.toString(), e);
			throw e;
		}
		catch (Exception e) {
			LOG.error("jedis.incr异常: " + e.toString(), e);
			throw e;
		}
		finally {
			if (null != jedis) {
				redisPool.returnResource(jedis);
			}
		}
	}

	/**
	 * 对指定的key自减,第一次是从0开始
	 * @param key
	 * @return 自减后的值
	 */
	public long decr(String key) throws JedisConnectionException, Exception {
		Jedis jedis = null;
		try {
			jedis = redisPool.getResource();
			return jedis.decr(key);
		}
		catch (JedisConnectionException e) {
			if (null != jedis) {
				redisPool.returnBrokenResource(jedis);
				jedis = null;
			}

			LOG.error("jedis.decr异常: " + e.toString(), e);
			throw e;
		}
		catch (Exception e) {
			LOG.error("jedis.decr异常: " + e.toString(), e);
			throw e;
		}
		finally {
			if (jedis != null) {
				redisPool.returnResource(jedis);
			}
		}
	}

	/**
	 * If key holds a hash, retrieve the value associated to the specified field. 
	 * If the field is not found or the key does not exist, a special 'nil' value is returned. 
	 * @param key String
	 * @param field String
	 * @return String
	 */
	public String hget(String key, String field) {
		Jedis jedis = null;
		try {
			jedis = redisPool.getResource();
			return jedis.hget(key, field);
		}
		catch (JedisConnectionException e) {
			if (null != jedis) {
				redisPool.returnBrokenResource(jedis);
				jedis = null;
			}

			LOG.error("jedis.hget异常: " + e.toString(), e);
			throw e;
		}
		catch (Exception e) {
			LOG.error("jedis.hget异常: " + e.toString(), e);
			throw e;
		}
		finally {
			if (jedis != null) {
				redisPool.returnResource(jedis);
			}
		}
	}

	/**
	 * If key holds a hash, retrieve the value associated to the specified field. 
	 * If the field is not found or the key does not exist, a special 'nil' value is returned. 
	 * @param key byte[]
	 * @param field byte[]
	 * @return byte[]
	 */
	public byte[] hget(byte[] key, byte[] field) {
		Jedis jedis = null;
		try {
			jedis = redisPool.getResource();
			return jedis.hget(key, field);
		}
		catch (JedisConnectionException e) {
			if (null != jedis) {
				redisPool.returnBrokenResource(jedis);
				jedis = null;
			}

			LOG.error("jedis.hget异常: " + e.toString(), e);
			throw e;
		}
		catch (Exception e) {
			LOG.error("jedis.hget异常: " + e.toString(), e);
			throw e;
		}
		finally {
			if (jedis != null) {
				redisPool.returnResource(jedis);
			}
		}
	}

	/**
	 * Test for existence of a specified field in a hash. 
	 * @param key
	 * @param field
	 * @return
	 */
	public boolean hexists(String key, String field) {
		Jedis jedis = null;
		try {
			jedis = redisPool.getResource();
			return jedis.hexists(key, field);
		}
		catch (JedisConnectionException e) {
			if (null != jedis) {
				redisPool.returnBrokenResource(jedis);
				jedis = null;
			}

			LOG.error("jedis.hexists异常: " + e.toString(), e);
			throw e;
		}
		catch (Exception e) {
			LOG.error("jedis.hexists异常: " + e.toString(), e);
			throw e;
		}
		finally {
			if (jedis != null) {
				redisPool.returnResource(jedis);
			}
		}
	}

	/**
	 * Test for existence of a specified field in a hash.
	 * @param key
	 * @param field
	 * @return
	 */
	public boolean hexists(byte[] key, byte[] field) {
		Jedis jedis = null;
		try {
			jedis = redisPool.getResource();
			return jedis.hexists(key, field);
		}
		catch (JedisConnectionException e) {
			if (null != jedis) {
				redisPool.returnBrokenResource(jedis);
				jedis = null;
			}

			LOG.error("jedis.hexists异常: " + e.toString(), e);
			throw e;
		}
		catch (Exception e) {
			LOG.error("jedis.hexists异常: " + e.toString(), e);
			throw e;
		}
		finally {
			if (jedis != null) {
				redisPool.returnResource(jedis);
			}
		}
	}

	/** 
	 * 获取redis无序集合中元素数量
	 * @param key
	 * @return
	 */
	public Long scard(String key) {
		Jedis jedis = null;

		try {
			jedis = redisPool.getResource();
			return jedis.scard(key);
		}
		catch (JedisConnectionException e) {
			if (null != jedis) {
				redisPool.returnBrokenResource(jedis);
				jedis = null;
			}

			LOG.error("jedis.scard异常：" + e.toString(), e);
			return null;
		}
		catch (Exception e) {
			LOG.error("jedis.scard异常：" + e.toString(), e);
			return null;
		}
		finally {
			if (null != jedis) {
				redisPool.returnResource(jedis);
			}
		}
	}

	/** 
	 * 获取redis有序集合中元素数量
	 * @param key
	 * @return
	 */
	public Long zcard(String key) {
		Jedis jedis = null;

		try {
			jedis = redisPool.getResource();
			return jedis.zcard(key);
		}
		catch (JedisConnectionException e) {
			if (null != jedis) {
				redisPool.returnBrokenResource(jedis);
				jedis = null;
			}

			LOG.error("jedis.zcard异常：" + e.toString(), e);
			return null;
		}
		catch (Exception e) {
			LOG.error("jedis.zcard异常：" + e.toString(), e);
			return null;
		}
		finally {
			if (null != jedis) {
				redisPool.returnResource(jedis);
			}
		}
	}

	public Long zadd(String key, double score, Set<String> memberSet) {
		if (null == memberSet || memberSet.size() == 0) {
			return null;
		}

		Jedis jedis = null;
		long result = 0;

		try {
			jedis = redisPool.getResource();

			for (String member : memberSet) {
				try {
					jedis.zadd(key, score, member);
					result += 1;
				}
				catch (JedisConnectionException e) {
					if (null != jedis) {
						redisPool.returnBrokenResource(jedis);
						jedis = redisPool.getResource();
					}
					LOG.error("jedis.zadd异常: " + e.toString(), e);
				}
				catch (Exception e) {
					LOG.error("jedis.zadd异常: " + e.toString(), e);
				}
			}

			return result;
		}
		catch (JedisConnectionException e) {
			if (null != jedis) {
				redisPool.returnBrokenResource(jedis);
				jedis = null;
			}

			LOG.error("jedis.zadd异常: " + e.toString(), e);
			return null;
		}
		catch (Exception e) {
			LOG.error("jedis.zadd异常: " + e.toString(), e);
			return null;
		}
		finally {
			if (jedis != null) {
				redisPool.returnResource(jedis);
			}
		}
	}

	/**
	 * Redis自定义操作回调
	 * @param redisCallBack RedisCallBack<T>
	 * @return T
	 * @throws Throwable
	 */
	public <T> T execute(RedisCallBack<T> redisCallBack) throws Throwable {
		Assert.notNull(redisCallBack, "RedisCallBack不能为null");
		Jedis jedis = null;

		try {
			jedis = redisPool.getResource();
			return redisCallBack.doInRedis(jedis);
		}
		catch (JedisConnectionException e) {
			if (null != jedis) {
				redisPool.returnBrokenResource(jedis);
				jedis = null;
			}

			throw e;
		}
		catch (Throwable e) {
			throw e;
		}
		finally {
			if (null != jedis) {
				redisPool.returnResource(jedis);
			}
		}
	}
}
