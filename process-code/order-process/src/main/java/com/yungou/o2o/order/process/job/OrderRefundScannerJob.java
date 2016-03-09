package com.yungou.o2o.order.process.job;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import com.yungou.o2o.process.common.scheduling.LjobRunner;
import com.yungou.o2o.process.common.scheduling.annotation.LjobAnnotation;
import com.yungou.o2o.process.common.scheduling.annotation.LjobMethodAnnotation;

/**
 * 微信订单退款扫描类
 * 实现：抓取退款中订单，循环调用微信接口，根据返回状态修改订单状态、发送微信退款成功通知、同步零售退款成功
 * @author she.yj1
 *
 */
@Component
@LjobAnnotation(distributed=false,supportInstantRunReq=false)
public class OrderRefundScannerJob extends LjobRunner {

	private static Logger logger = LoggerFactory.getLogger(OrderRefundScannerJob.class);

	
	/**
	 * cron="0 0/30 18-21 * * ?"
	 */
	@Override
	@LjobMethodAnnotation(cron="${order.refund.query.cron}")
	public void ljobDetail() {
		if (logger.isInfoEnabled()) {
			logger.info("扫描订单退款任务开始启动.........");
		}
		
		
		if (logger.isInfoEnabled()) {
			logger.info("扫描订单退款任务开始结束.........");
		}
	}

}
