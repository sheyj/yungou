package com.yungou.o2o.process.common.jms;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Random;

import javax.jms.Message;
import javax.jms.MessageListener;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.exceptions.JedisConnectionException;

import com.alibaba.fastjson.JSON;
import com.yungou.o2o.process.common.jms.constant.LMessageConstant;
import com.yungou.o2o.process.common.jms.retryer.LMessageRetryer;
import com.yungou.o2o.process.common.util.CommonUtil;
import com.yungou.o2o.process.common.util.MD5Util;

/**
 * MQ消息监听处理器
 * 
 * @author lin.zb
 * @date 2016年1月20日 上午11:24:50
 * @version 1.0.0 
 * @copyright wonhigh.net.cn
 */
public abstract class LMessageListener implements MessageListener {
	private static final Logger LOG = LoggerFactory.getLogger(LMessageListener.class);

	private static final String LOCK_ERROR = "LOCK_ERROR";

	private static final String LOCK_SECCESS = "LOCK_SECCESS";

	/**
	 * 失败消息列表大小
	 * 设置为0则代表不限制
	 */
	private Integer failMsgListSize = null;

	/**
	 * 需要重试处理的失败消息列表（MQ消息锁失败）
	 */
	private List<Message> failMessageList = null;

	private LMessageRetryer messageRetryer = null;

	private JedisPool jedisPool = null;

	/**
	 * 消息有效时间，单位：秒
	 * 最好配置和推送端队列消息有效时间一致
	 */
	private Integer msgValidtime = null;

	/**
	 * 目标消息名
	 */
	private String destinationName = null;

	/**
	 * 项目名
	 */
	private String projectName = null;

	/**
	 * 当前服务器IP
	 */
	private String ip = CommonUtil.getLocalIP();

	public void setJedisPool(JedisPool jedisPool) {
		this.jedisPool = jedisPool;
	}

	public void setMsgValidtime(Integer msgValidtime) {
		this.msgValidtime = msgValidtime;
	}

	public String getDestinationName() {
		return destinationName;
	}

	public void setDestinationName(String destinationName) {
		this.destinationName = destinationName;
	}

	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}

	public void setFailMsgListSize(Integer failMsgListSize) {
		this.failMsgListSize = failMsgListSize;
	}

	/**
	 * 添加需要重处理的失败消息
	 * @param message Message
	 */
	public synchronized void addFailMessage(Message message) {
		if (null == this.failMessageList) {
			this.failMessageList = new ArrayList<Message>();
		}

		// 如果不限制失败消息长度
		if (this.failMsgListSize == 0) {
			this.failMessageList.add(message);
		}
		// 如果限制失败消息长度
		else {
			if (this.failMessageList.size() == this.failMsgListSize) {
				Message delMsg = this.failMessageList.get(0);
				String delMsgString = JSON.toJSONString(delMsg);
				String msgKey = MD5Util.md5(delMsgString);
				String redisKey = this.projectName + this.destinationName + msgKey;

				this.failMessageList.remove(0);
				LOG.warn("失败MQ消息列表已经超过设置的最大长度, 最大长度: " + this.failMsgListSize + ", 失败重试列表的第一个MQ消息将被移出, 被移出的MQ消息: "
						+ delMsgString + ", 对应的MQ消息锁: " + redisKey);
			}

			this.failMessageList.add(message);
		}

		// 启动失败重试线程
		if (null == messageRetryer) {
			DateFormat dateTimeFormat = new SimpleDateFormat("yyyyMMddHHmmss");
			String name = "LMessageRetryer_" + dateTimeFormat.format(new Date());
			messageRetryer = new LMessageRetryer(this);
			messageRetryer.setName(name);
			messageRetryer.start();
			LOG.info("启动失败MQ消息重试线程, 线程名: " + name);
		}
	}

	/**
	 * 获取需要重处理的失败消息列表
	 * @return List<Message>
	 */
	public synchronized List<Message> getFailMessageList() {
		List<Message> resultList = this.failMessageList;
		this.failMessageList = null;
		return resultList;
	}

	/**
	 * 处理消息
	 * @param message Message
	 * @return 返回处理结果，如果不需要使用失败消息重试功能，可以直接返回null
	 *         返回结果可以使用下面常量:
	 *         1. 需要重试: cn.wonhigh.o2o.process.common.jms.constant.LMessageConstant.STATUS_LMESSAGE_RETRY
	 *         2. 处理成功: cn.wonhigh.o2o.process.common.jms.constant.LMessageConstant.STATUS_LMESSAGE_DONE
	 */
	public abstract String processMessage(Message message);

	/**
	 * 获取Json消息
	 * @param message Message
	 * @return String
	 */
	public abstract String getJsonMessage(Message message);

	@Override
	public void onMessage(Message message) {

		// 只有配置了redis连接池才可用
		String lockKey = null;
		if (null != this.jedisPool && null != this.msgValidtime && null != this.failMsgListSize) {
			// 锁定MQ消息
			lockKey = this.lockMessage(message);
			if (null == lockKey) {
				return;
			}
		}

		String processResult = null;
		try {
			// 处理消息
			processResult = this.processMessage(message);

			// 只有配置了redis连接池才可用
			if (null != this.jedisPool && null != this.msgValidtime && null != this.failMsgListSize) {
				LOG.info("处理MQ消息结束, MQ消息锁: " + lockKey + ", 处理状态: " + processResult);

				// 需要失败重试
				if (LMessageConstant.STATUS_LMESSAGE_RETRY.equals(processResult)) {
					// 释放MQ消息锁
					LOG.info("释放需要重处理的MQ消息锁, 等待下一次重试, MQ消息锁: " + lockKey);
					if (!this.releaseMessageLock(lockKey)) {
						// 释放锁失败
						LOG.error("释放需要重处理的MQ消息锁失败, MQ消息锁: " + lockKey);
					}
					// 释放锁成功
					else {
						// 添加需要重处理的失败MQ消息
						this.addFailMessage(message);
					}
				}
			}
		}
		catch (Exception e) {
			LOG.error("处理MQ消息异常, MQ消息锁: " + lockKey + ", 异常: " + e.toString(), e);
		}
	}

	/**
	 * 锁定MQ消息
	 * @param message
	 * @return
	 */
	private String lockMessage(Message message) {

		// 获取消息体
		String messageString = this.getJsonMessage(message);
		LOG.info("接收到MQ消息 -> " + messageString);
		if (null == messageString) {
			LOG.error("获取Message Json失败, 消息内容为空.");
			return null;
		}

		// 生成消息MD5
		String msgKey = MD5Util.md5(messageString);
		LOG.debug("生成消息MD5: " + msgKey);

		// 生成redis主键
		String redisKey = this.projectName + this.destinationName + msgKey;
		LOG.debug("生成MQ消息锁: " + redisKey);

		// 随机休眠100~200毫秒，降低分布式服务器同一时间处理消息争锁异常
		try {
			Thread.sleep(new Random().nextInt(100) + 100);
		}
		catch (InterruptedException e) {
			LOG.error(e.toString(), e);
		}

		// 缓存MQ消息锁
		String result = this.saveMessageLock(redisKey);

		// 锁成功
		if (LOCK_SECCESS.equals(result)) {
			LOG.info("缓存MQ消息锁成功, MQ消息锁: " + redisKey);
			return redisKey;
		}
		// 锁失败
		else if (LOCK_ERROR.equals(result)) {
			// 失败队列处理
			LOG.error("缓存MQ消息锁失败, 该消息将加入失败重试队列, MQ消息锁: " + redisKey);
			this.addFailMessage(message);
			return null;
		}
		// 消息已经在其他服务器被处理
		else {
			LOG.info("缓存MQ消息锁失败, 该消息已经在服务器[" + result + "]上进行了处理, MQ消息锁: " + redisKey);
			return null;
		}
	}

	/**
	 * 释放缓存MQ消息锁
	 * @param key
	 */
	public boolean releaseMessageLock(String key) {
		Jedis jedis = null;
		try {
			jedis = jedisPool.getResource();
			jedis.del(key);
			return true;
		}
		catch (JedisConnectionException e) {
			if (null != jedis) {
				jedisPool.returnBrokenResource(jedis);
				jedis = null;
			}

			LOG.error("释放缓存MQ消息锁失败, MQ消息锁: " + key + ", 异常: " + e.toString(), e);
			return false;
		}
		catch (Exception e) {
			LOG.error("释放缓存MQ消息锁失败, MQ消息锁: " + key + ", 异常: " + e.toString(), e);
			return false;
		}
		finally {
			if (jedis != null) {
				jedisPool.returnResource(jedis);
			}
		}
	}

	/**
	 * 缓存MQ消息锁到redis
	 * @param key MQ消息锁主键
	 * @return String
	 */
	public String saveMessageLock(String key) {
		Jedis jedis = null;
		long setnxSuccess = 0;

		try {
			jedis = jedisPool.getResource();
			setnxSuccess = jedis.setnx(key, this.ip);
			if (setnxSuccess == 1) {
				jedis.expire(key, this.msgValidtime);
				return LOCK_SECCESS;
			}
			else {
				return jedis.get(key);
			}
		}
		catch (JedisConnectionException e) {
			if (null != jedis) {
				jedisPool.returnBrokenResource(jedis);
				jedis = null;
			}

			LOG.error("缓存MQ消息锁到redis失败, MQ消息锁: " + key + ", 本地服务器IP: " + this.ip + ", MQ消息锁有效时间: " + this.msgValidtime
					+ ", 异常: " + e.toString(), e);
			return LOCK_ERROR;
		}
		catch (Exception e) {
			LOG.error("缓存MQ消息锁到redis失败, MQ消息锁: " + key + ", 本地服务器IP: " + this.ip + ", MQ消息锁有效时间: " + this.msgValidtime
					+ ", 异常: " + e.toString(), e);
			return LOCK_ERROR;
		}
		finally {
			if (jedis != null) {
				jedisPool.returnResource(jedis);
			}
		}
	}
}
