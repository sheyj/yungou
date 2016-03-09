package com.yungou.o2o.process.common.jms.retryer;

import java.util.List;

import javax.jms.Message;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.yungou.o2o.process.common.jms.LMessageListener;

/**
 * 失败MQ消息重试线程
 * 
 * @author lin.zb
 * @date 2016年1月21日 上午10:40:25
 * @version 1.0.0 
 * @copyright wonhigh.net.cn 
 */
public class LMessageRetryer extends Thread {

	private static final Logger LOG = LoggerFactory.getLogger(LMessageRetryer.class);

	private LMessageListener messageListener;

	public LMessageRetryer(LMessageListener messageListener) {
		this.messageListener = messageListener;
	}

	@Override
	public void run() {

		List<Message> messageList = null;
		while (true) {

			// 休眠10秒
			try {
				Thread.sleep(10000);
			}
			catch (Exception e) {
				LOG.error(e.toString(), e);
			}

			// 获取需要重处理的失败MQ消息列表
			messageList = messageListener.getFailMessageList();
			if (null != messageList && messageList.size() > 0) {

				LOG.info("开始失败MQ消息重试, 需要重试的失败消息列表: " + messageList.size());

				// 失败MQ消息重试
				for (Message message : messageList) {
					messageListener.onMessage(message);
				}

				LOG.info("结束失败MQ消息重试, 需要重试的失败消息列表: " + messageList.size());

			}
		}
	}
}
