package com.yungou.o2o.order.process;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.yungou.o2o.redis.common.queue.json.RedisProcesser;

/**
 *
 */
public class OrderPaySuccessProcesser extends OrderBaseProcess implements
		RedisProcesser {

	private static final Logger logger = LoggerFactory
			.getLogger(OrderPaySuccessProcesser.class);

	private static String YYYYMMDD = "yyyy-MM-dd";

	@Override
	public void doProcess(String queueName, String json) {
		if (logger.isInfoEnabled()) {
			logger.info("开始处理订单支付成功消息: " + json);
		}
		//OrderPaySuccess oas = JSON.parseObject(json, OrderPaySuccess.class);
		
		if (logger.isInfoEnabled()) {
			logger.info("订单支付成功消息成功:" + json);
		}
	}
}
