package com.yungou.o2o.order.process;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.yungou.o2o.redis.common.RedisTemplate;

/**
 * 订单消息处理基类
 * 
 * @author she.yj1
 * 
 */
public class OrderBaseProcess {

	private static final Logger logger = LoggerFactory.getLogger(OrderBaseProcess.class);

	/**
	 * 订单发送OPENFIRE消息类型
	 */
	public static final String ORDER_SEND_OPENFIRE_MESSAGE_TYPE = "orderMessage";

	/**
	 * 发送微信消息 redis队列名称
	 */
	public static final String WX_QUEUE_TEMPLATE_MESSAGE = "QUEUE_TEMPLATE_MESSAGE";

	/**
	 * 订单取消
	 */
	public static final String ORDER_CACEL = "1";

	/**
	 * 异常订单
	 */
	public static final String ORDER_EXCEPTION = "2";

	/**
	 * 待提货订单
	 */
	public static final String ORDER_WAIT_PICKUP = "3";

	/**
	 * 已提货订单
	 */
	public static final String ORDER_CKUPD = "4";

	public final String YYYYMMDDHHMMSS = "yyyy-MM-dd HH:mm:ss";


	@Resource(name = "redisTemplate")
	protected RedisTemplate redisTemplate;

	/**
	 * 发送redis消息
	 * @param redisQueueNames
	 * @param messageContent
	 */
	protected void sendRedisMessage(String redisQueueNames, String messageContent) {
		try {
			redisTemplate.push(redisQueueNames, messageContent);
			if (logger.isInfoEnabled()) {
				logger.info("发送redis消息成功,QueueNames=[" + redisQueueNames + "],messageContent=[" + messageContent + "]");
			}
		} catch (Exception e) {
			logger.error("发送redis消息失败,QueueNames=[" + redisQueueNames + "],messageContent=[" + messageContent + "]", e);
		}
	}


}
