package com.yungou.o2o.process.common.scheduling;

import java.lang.reflect.Method;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.Set;

import org.quartz.JobDetail;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.config.BeanFactoryPostProcessor;
import org.springframework.beans.factory.config.PropertyResourceConfigurer;
import org.springframework.context.ApplicationContext;
import org.springframework.core.io.support.PropertiesLoaderSupport;
import org.springframework.scheduling.quartz.CronTriggerBean;
import org.springframework.scheduling.quartz.MethodInvokingJobDetailFactoryBean;

import redis.clients.jedis.JedisPool;

import com.yungou.o2o.process.common.scheduling.annotation.LjobAnnotation;
import com.yungou.o2o.process.common.scheduling.annotation.LjobMethodAnnotation;
import com.yungou.o2o.process.common.scheduling.constant.LjobConstant;
import com.yungou.o2o.process.common.scheduling.heartbeat.LjobHeartbeatSender;
import com.yungou.o2o.process.common.scheduling.model.Ljob;
import com.yungou.o2o.process.common.scheduling.model.LjobHeartbeat;
import com.yungou.o2o.process.common.scheduling.runrequest.LjobRunRequestListener;
import com.yungou.o2o.process.common.scheduling.server.LjobServerClientChecker;
import com.yungou.o2o.process.common.scheduling.servertime.LjobServerTimeGetter;
import com.yungou.o2o.process.common.scheduling.startup.LjobStartupListener;
import com.yungou.o2o.process.common.util.CommonUtil;

/**
 * 定时任务触发器
 * @author lin.zb
 */
public class LjobTrigger {
	private static final Logger LOG = LoggerFactory.getLogger(LjobTrigger.class);

	private DateFormat dateTimeFormat = new SimpleDateFormat("yyyyMMddHHmmss");

	private boolean isDestroy = false;

	private JedisPool jedisPool = null;

	/**
	 * 是否测试模式
	 */
	private boolean isTestMode = false;

	/**
	 * 定时任务服务器是否在线
	 */
	private boolean isLjobServerOnline = false;

	/**
	 * 项目名
	 */
	private String projectName = null;

	/**
	 * 定时任务列表
	 */
	private List<Ljob> ljobList = null;

	/**
	 * 本地IP
	 */
	private String ip = null;

	private LjobSchedulerFactory ljobSchedulerFactory = null;

	private LjobServerTimeGetter ljobServerTimeGetter = null;

	private LjobServerClientChecker ljobServerClientChecker = null;

	private Map<String, String> propertiesMap = new HashMap<String, String>();

	public void setJedisPool(JedisPool jedisPool) {
		this.jedisPool = jedisPool;
	}

	public void setTestMode(String isTestMode) {
		if (null != isTestMode && "true".equals(isTestMode.trim())) {
			this.isTestMode = true;
		}
	}

	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}

	public boolean isDestroy() {
		return isDestroy;
	}

	public void setLjobSchedulerFactory(LjobSchedulerFactory ljobSchedulerFactory) {
		this.ljobSchedulerFactory = ljobSchedulerFactory;
	}

	public boolean isLjobServerOnline() {
		return isLjobServerOnline;
	}

	public void setLjobServerOnline(boolean isLjobServerOnline) {
		this.isLjobServerOnline = isLjobServerOnline;
	}

	/**
	 * 初始化任务触发器
	 * @throws Exception 
	 */
	public void init() throws Exception {
		// 获取本地IP
		ip = CommonUtil.getLocalIP();

		// 初始化定时任务列表
		initLjobList();

		// 定时任务服务器时间获取者
		ljobServerTimeGetter = new LjobServerTimeGetter(jedisPool);

		// 定时任务服务器在线客户端监测线程
		ljobServerClientChecker = new LjobServerClientChecker(this, jedisPool);
		ljobServerClientChecker.setName("LjobServerClientChecker");
		ljobServerClientChecker.start();

		if (null != ljobList && ljobList.size() > 0) {
			String startupRequestQueue = null;
			String manualRunRequestQueue = null;
			String jobName = null;
			Object targetJob = null;
			Class<?> targetJobClass = null;
			String targetJobMethod = null;
			LjobRunner ljobRunner = null;
			LjobHeartbeatSender ljobHeartbeatSender = null;
			LjobRunRequestListener ljobRunRequestListener = null;

			for (Ljob ljob : ljobList) {
				jobName = ljob.getJobName();
				targetJob = ljob.getTargetJob();
				targetJobClass = ljob.getTargetJobClass();
				targetJobMethod = ljob.getTargetJobMethod();

				try {
					ljobRunner = (LjobRunner) targetJob;
				}
				catch (Exception e) {
					destroy();
					LOG.error("监听定时任务失败, 定时任务必须继承实现抽象类: cn.wonhigh.o2o.process.common.scheduling.LjobRunner, jobName: "
							+ jobName, e);
					throw e;
				}

				// 如果是测试模式
				if (isTestMode) {
					// 则直接启动
					LOG.info("当前是测试模式, 直接启动定时任务: " + ljob.getJobName());
					ljobSchedulerFactory.addTriggerToScheduler(ljob.getTargetTrigger());
					continue;
				}

				// 初始化手动执行定时任务请求监听队列
				manualRunRequestQueue = LjobConstant.LJOB_MANUAL_RUN_REQUEST_QUEUE_PREFIX + ip + "_" + projectName
						+ "_" + jobName;

				// 初始化定时任务启动请求监听队列
				startupRequestQueue = LjobConstant.LJOB_STARTUP_QUEUE_PREFIX + ip + "_" + projectName + "_" + jobName;

				// 启动心跳推送
				LOG.info("启动定时任务[" + ip + " ** " + projectName + " ** " + jobName + "]心跳发送线程...");
				LjobHeartbeat ljobHeartbeat = new LjobHeartbeat();
				ljobHeartbeat.setIp(ip);
				ljobHeartbeat.setJobName(jobName);
				ljobHeartbeat.setProjectName(projectName);
				ljobHeartbeat.setDistributed(ljob.isDistributed());
				ljobHeartbeat.setJobCronExpression(ljob.getJobCronExpression());
				ljobHeartbeat.setSupportInstantRunReq(ljob.isSupportInstantRunReq());
				ljobHeartbeat.setSupportCloseJob(ljob.isSupportCloseJob());
				ljobHeartbeat.setDescription(ljob.getDescription());
				ljobHeartbeatSender = new LjobHeartbeatSender(this);
				ljobHeartbeatSender.setName(jobName + "_HeartbeatSender_" + dateTimeFormat.format(new Date()));
				ljobHeartbeatSender.setJedisPool(jedisPool);
				ljobHeartbeatSender.setLjobHeartbeat(ljobHeartbeat);
				ljobHeartbeatSender.setLjobRunner(ljobRunner);
				ljobHeartbeatSender.start();

				// 定时任务启动请求监听
				LOG.info("启动定时任务[" + ip + " ** " + projectName + " ** " + jobName + "]启动监听线程...");
				LjobStartupListener ljobStartupListener = new LjobStartupListener(this);
				ljobStartupListener.setName(jobName + "_StartupListener_" + dateTimeFormat.format(new Date()));
				ljobStartupListener.setJedisPool(jedisPool);
				ljobStartupListener.setLjobSchedulerFactory(ljobSchedulerFactory);
				ljobStartupListener.setTargetTrigger(ljob.getTargetTrigger());
				ljobStartupListener.setLjobRunner(ljobRunner);
				ljobStartupListener.setQueueName(startupRequestQueue);
				ljobStartupListener.start();

				// 如果支持即时执行请求
				if (ljob.isSupportInstantRunReq()) {
					// 启动人工执行定时任务监听
					LOG.info("启动定时任务[" + ip + " ** " + projectName + " ** " + jobName + "]人工执行定时任务监听线程...");
					ljobRunRequestListener = new LjobRunRequestListener(this);
					ljobRunRequestListener.setName(jobName + "_LjobReqListener_" + dateTimeFormat.format(new Date()));
					ljobRunRequestListener.setJedisPool(jedisPool);
					ljobRunRequestListener.setQueueName(manualRunRequestQueue);
					ljobRunRequestListener.setTargetJob(targetJob);
					ljobRunRequestListener.setTargetJobClass(targetJobClass);
					ljobRunRequestListener.setTargetJobMethod(targetJobMethod);
					ljobRunRequestListener.setLjobRunner(ljobRunner);
					ljobRunRequestListener.start();
				}
			}
		}
	}

	public void destroy() {
		isDestroy = true;
	}

	/**
	 * 初始化定时任务列表
	 * @throws Exception
	 */
	private void initLjobList() throws Exception {
		// 获取定时任务列表
		ljobList = ljobSchedulerFactory.getLjobList();

		// 从Spring容器中获取LjobAnnotation注解类
		ApplicationContext applicationContext = ljobSchedulerFactory.getApplicationContext();

		// 初始化properties信息
		this.initProperties(applicationContext);

		Map<String, Object> ljobBeanMap = applicationContext.getBeansWithAnnotation(LjobAnnotation.class);
		if (null != ljobBeanMap) {
			Set<String> keySet = ljobBeanMap.keySet();
			if (null != keySet) {
				// 初始化参数
				Object targetObject = null;
				LjobAnnotation ljobAnnotation = null;
				boolean isDistributed = false;
				boolean isSupportInstantRunReq = false;
				boolean isSupportCloseJob = false;
				String description = null;
				Method[] targetObjectMethods = null;
				LjobMethodAnnotation ljobMethodAnnotation = null;
				String targetMethod = null;
				String ljobCron = null;
				boolean isLjob = false;
				MethodInvokingJobDetailFactoryBean methodInvokingJobDetailFactoryBean = null;
				JobDetail jobDetail = null;
				CronTriggerBean cronTriggerBean = null;
				Ljob ljob = null;
				String ljobCronKey = null;

				// 获取定时任务
				for (String key : keySet) {
					isLjob = false;
					targetObject = ljobBeanMap.get(key);
					ljobAnnotation = targetObject.getClass().getAnnotation(LjobAnnotation.class);
					isDistributed = ljobAnnotation.distributed();
					isSupportInstantRunReq = ljobAnnotation.supportInstantRunReq();
					isSupportCloseJob = ljobAnnotation.supportCloseJob();
					description = ljobAnnotation.description();
					targetObjectMethods = targetObject.getClass().getDeclaredMethods();

					// 如果
					if (!(targetObject instanceof LjobRunner)) {
						destroy();
						LOG.error("监听定时任务失败, 定时任务必须继承实现抽象类: cn.wonhigh.o2o.process.common.scheduling.LjobRunner, jobName: "
								+ targetObject.getClass().getName());
						throw new Exception(
								"监听定时任务失败, 定时任务必须继承实现抽象类: cn.wonhigh.o2o.process.common.scheduling.LjobRunner, jobName: "
										+ targetObject.getClass().getName());
					}

					// 获取定时任务执行方法及运行配置
					for (Method method : targetObjectMethods) {
						ljobMethodAnnotation = method.getAnnotation(LjobMethodAnnotation.class);
						if (null != ljobMethodAnnotation && "ljobDetail".equals(method.getName())) {
							targetMethod = "doLjob";
							ljobCron = ljobMethodAnnotation.cron();
							if (null != ljobCron && ljobCron.startsWith("${") && ljobCron.endsWith("}")) {
								ljobCronKey = ljobCron.substring(2, ljobCron.length() - 1);
								if (null != propertiesMap.get(ljobCronKey)) {
									ljobCron = propertiesMap.get(ljobCronKey);
								}
								else {
									LOG.error("无法在properties文件中加载到定时任务[" + targetObject.getClass().getName()
											+ "]执行计划配置: " + ljobCronKey);
								}
							}

							isLjob = true;
							break;
						}
					}

					if (isLjob) {
						// 构建MethodInvokingJobDetailFactoryBean
						methodInvokingJobDetailFactoryBean = new MethodInvokingJobDetailFactoryBean();
						methodInvokingJobDetailFactoryBean.setTargetObject(targetObject);
						methodInvokingJobDetailFactoryBean.setTargetMethod(targetMethod);
						methodInvokingJobDetailFactoryBean.setName(targetObject.getClass().getName() + "FactoryBean");
						methodInvokingJobDetailFactoryBean.afterPropertiesSet();

						// 构建CronTriggerBean
						jobDetail = methodInvokingJobDetailFactoryBean.getObject();
						cronTriggerBean = new CronTriggerBean();
						cronTriggerBean.setJobDetail(jobDetail);
						cronTriggerBean.setCronExpression(ljobCron);
						cronTriggerBean.setName(targetObject.getClass().getName() + "TriggerBean");
						cronTriggerBean.afterPropertiesSet();

						// 构建添加Ljob
						ljob = new Ljob();
						ljob.setTargetTrigger(cronTriggerBean);
						ljob.setTargetJob(targetObject);
						ljob.setJobName(key);
						ljob.setTargetJobMethod(targetMethod);
						ljob.setJobCronExpression(ljobCron);
						ljob.setDescription(description);
						if (isDistributed) {
							ljob.setDistributed("true");
						}
						if (isSupportInstantRunReq) {
							ljob.setSupportInstantRunReq("true");
						}
						if (isSupportCloseJob) {
							ljob.setSupportCloseJob("true");
						}
						ljobList.add(ljob);
					}
				}
			}
		}

		ljobSchedulerFactory.setLjobList(ljobList);
	}

	/**
	 * 获取定时任务服务器时间
	 * @return String
	 */
	public String getLjobServerTime() {
		return ljobServerTimeGetter.getLjobServerTime();
	}

	/**
	 * 初始化properties信息
	 * @param applicationContext
	 */
	private void initProperties(ApplicationContext applicationContext) {
		String[] postProcessorNames = null;
		BeanFactoryPostProcessor beanProcessor = null;
		PropertyResourceConfigurer propertyResourceConfigurer = null;
		Method mergeProperties = null;
		Properties props = null;
		Method convertProperties = null;
		Set<Object> keys = null;
		String key = null;
		String value = null;

		try {
			postProcessorNames = applicationContext.getBeanNamesForType(BeanFactoryPostProcessor.class, true, true);

			for (String ppName : postProcessorNames) {
				beanProcessor = applicationContext.getBean(ppName, BeanFactoryPostProcessor.class);
				if (beanProcessor instanceof PropertyResourceConfigurer) {
					propertyResourceConfigurer = (PropertyResourceConfigurer) beanProcessor;
					mergeProperties = PropertiesLoaderSupport.class.getDeclaredMethod("mergeProperties");
					mergeProperties.setAccessible(true);
					props = (Properties) mergeProperties.invoke(propertyResourceConfigurer);
					convertProperties = PropertyResourceConfigurer.class.getDeclaredMethod("convertProperties",
							Properties.class);
					convertProperties.setAccessible(true);
					convertProperties.invoke(propertyResourceConfigurer, props);

					keys = props.keySet();
					for (Object objectkey : keys) {
						key = (String) objectkey;
						value = props.getProperty(key);
						propertiesMap.put(key, value);
					}
				}
			}
		}
		catch (Exception e) {
			LOG.error("获取properties配置信息异常: " + e.toString(), e);
		}
	}
}
