package com.yungou.o2o.process.common.jms.listener;

import javax.jms.Connection;
import javax.jms.Destination;
import javax.jms.ExceptionListener;
import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.MessageListener;
import javax.jms.Queue;
import javax.jms.Session;
import javax.jms.Topic;

import org.apache.activemq.command.ActiveMQQueue;
import org.apache.activemq.command.ActiveMQTopic;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jms.listener.AbstractJmsListeningContainer;
import org.springframework.jms.listener.SessionAwareMessageListener;
import org.springframework.jms.listener.SubscriptionNameProvider;
import org.springframework.jms.support.JmsUtils;
import org.springframework.util.Assert;
import org.springframework.util.ErrorHandler;

import redis.clients.jedis.JedisPool;

import com.yungou.o2o.process.common.jms.LMessageListener;

/**
 * 重写org.springframework.jms.listener.AbstractMessageListenerContainer
 */
public abstract class AbstractLMessageListenerContainer extends AbstractJmsListeningContainer {
	private static final Logger LOG = LoggerFactory.getLogger(AbstractLMessageListenerContainer.class);

	private JedisPool jedisPool = null;

	/**
	 * 消息有效时间，单位：秒
	 * 最好配置和推送端队列消息有效时间一致
	 */
	private Integer msgValidtime = null;

	/**
	 * 项目名
	 */
	private String projectName = null;

	/**
	 * 失败消息列表大小
	 * 设置为0则代表不限制
	 */
	private Integer failMsgListSize = null;

	public void setJedisPool(JedisPool jedisPool) {
		this.jedisPool = jedisPool;
	}

	/**
	 * 设置消息有效时间，单位：秒
	 * 最好配置和推送端队列消息有效时间一致
	 */
	public void setMsgValidtime(Integer msgValidtime) {
		this.msgValidtime = msgValidtime;
	}

	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}

	public void setFailMsgListSize(Integer failMsgListSize) {
		this.failMsgListSize = failMsgListSize;
	}

	private volatile Object destination;

	private volatile String messageSelector;

	private volatile Object messageListener;

	private boolean subscriptionDurable = false;

	private String durableSubscriptionName;

	private ExceptionListener exceptionListener;

	private ErrorHandler errorHandler;

	private boolean exposeListenerSession = true;

	private boolean acceptMessagesWhileStopping = false;

	/**
	 * Set the destination to receive messages from.
	 * <p>Alternatively, specify a "destinationName", to be dynamically
	 * resolved via the {@link org.springframework.jms.support.destination.DestinationResolver}.
	 * <p>Note: The destination may be replaced at runtime, with the listener
	 * container picking up the new destination immediately (works e.g. with
	 * DefaultMessageListenerContainer, as long as the cache level is less than
	 * CACHE_CONSUMER). However, this is considered advanced usage; use it with care!
	 * @see #setDestinationName(String)
	 */
	public void setDestination(Destination destination) {
		Assert.notNull(destination, "'destination' must not be null");
		this.destination = destination;
		if (destination instanceof Topic && !(destination instanceof Queue)) {
			// Clearly a Topic: let's set the "pubSubDomain" flag accordingly.
			setPubSubDomain(true);
		}
	}

	/**
	 * Return the destination to receive messages from. Will be {@code null}
	 * if the configured destination is not an actual {@link Destination} type;
	 * c.f. {@link #setDestinationName(String) when the destination is a String}.
	 */
	public Destination getDestination() {
		return (this.destination instanceof Destination ? (Destination) this.destination : null);
	}

	/**
	 * Set the name of the destination to receive messages from.
	 * <p>The specified name will be dynamically resolved via the configured
	 * {@link #setDestinationResolver destination resolver}.
	 * <p>Alternatively, specify a JMS {@link Destination} object as "destination".
	 * <p>Note: The destination may be replaced at runtime, with the listener
	 * container picking up the new destination immediately (works e.g. with
	 * DefaultMessageListenerContainer, as long as the cache level is less than
	 * CACHE_CONSUMER). However, this is considered advanced usage; use it with care!
	 * @param destinationName the desired destination (can be {@code null})
	 * @see #setDestination(javax.jms.Destination)
	 */
	public void setDestinationName(String destinationName) {
		Assert.notNull(destinationName, "'destinationName' must not be null");
		this.destination = destinationName;
	}

	/**
	 * Return the name of the destination to receive messages from.
	 * Will be {@code null} if the configured destination is not a
	 * {@link String} type; c.f. {@link #setDestination(Destination) when
	 * it is an actual Destination}.
	 */
	public String getDestinationName() {
		return (this.destination instanceof String ? (String) this.destination : null);
	}

	/**
	 * Return a descriptive String for this container's JMS destination
	 * (never {@code null}).
	 */
	protected String getDestinationDescription() {
		return this.destination.toString();
	}

	/**
	 * Set the JMS message selector expression (or {@code null} if none).
	 * Default is none.
	 * <p>See the JMS specification for a detailed definition of selector expressions.
	 * <p>Note: The message selector may be replaced at runtime, with the listener
	 * container picking up the new selector value immediately (works e.g. with
	 * DefaultMessageListenerContainer, as long as the cache level is less than
	 * CACHE_CONSUMER). However, this is considered advanced usage; use it with care!
	 */
	public void setMessageSelector(String messageSelector) {
		this.messageSelector = messageSelector;
	}

	/**
	 * Return the JMS message selector expression (or {@code null} if none).
	 */
	public String getMessageSelector() {
		return this.messageSelector;
	}

	/**
	 * Set the message listener implementation to register.
	 * This can be either a standard JMS {@link MessageListener} object
	 * or a Spring {@link SessionAwareMessageListener} object.
	 * <p>Note: The message listener may be replaced at runtime, with the listener
	 * container picking up the new listener object immediately (works e.g. with
	 * DefaultMessageListenerContainer, as long as the cache level is less than
	 * CACHE_CONSUMER). However, this is considered advanced usage; use it with care!
	 * @throws IllegalArgumentException if the supplied listener is not a
	 * {@link MessageListener} or a {@link SessionAwareMessageListener}
	 * @see javax.jms.MessageListener
	 * @see SessionAwareMessageListener
	 */
	public void setMessageListener(Object messageListener) {
		checkMessageListener(messageListener);
		this.messageListener = messageListener;
		if (this.durableSubscriptionName == null) {
			this.durableSubscriptionName = getDefaultSubscriptionName(messageListener);
		}
	}

	/**
	 * Return the message listener object to register.
	 */
	public Object getMessageListener() {
		return this.messageListener;
	}

	/**
	 * Check the given message listener, throwing an exception
	 * if it does not correspond to a supported listener type.
	 * <p>By default, only a standard JMS {@link MessageListener} object or a
	 * Spring {@link SessionAwareMessageListener} object will be accepted.
	 * @param messageListener the message listener object to check
	 * @throws IllegalArgumentException if the supplied listener is not a
	 * {@link MessageListener} or a {@link SessionAwareMessageListener}
	 * @see javax.jms.MessageListener
	 * @see SessionAwareMessageListener
	 */
	protected void checkMessageListener(Object messageListener) {
		if (!(messageListener instanceof MessageListener || messageListener instanceof SessionAwareMessageListener)) {
			throw new IllegalArgumentException("Message listener needs to be of type ["
					+ MessageListener.class.getName() + "] or [" + SessionAwareMessageListener.class.getName()
					+ "] or [" + LMessageListener.class.getName() + "]");
		}
	}

	/**
	 * Determine the default subscription name for the given message listener.
	 * @param messageListener the message listener object to check
	 * @return the default subscription name
	 * @see SubscriptionNameProvider
	 */
	protected String getDefaultSubscriptionName(Object messageListener) {
		if (messageListener instanceof SubscriptionNameProvider) {
			return ((SubscriptionNameProvider) messageListener).getSubscriptionName();
		}
		else {
			return messageListener.getClass().getName();
		}
	}

	/**
	 * Set whether to make the subscription durable. The durable subscription name
	 * to be used can be specified through the "durableSubscriptionName" property.
	 * <p>Default is "false". Set this to "true" to register a durable subscription,
	 * typically in combination with a "durableSubscriptionName" value (unless
	 * your message listener class name is good enough as subscription name).
	 * <p>Only makes sense when listening to a topic (pub-sub domain).
	 * @see #setDurableSubscriptionName
	 */
	public void setSubscriptionDurable(boolean subscriptionDurable) {
		this.subscriptionDurable = subscriptionDurable;
	}

	/**
	 * Return whether to make the subscription durable.
	 */
	public boolean isSubscriptionDurable() {
		return this.subscriptionDurable;
	}

	/**
	 * Set the name of a durable subscription to create. To be applied in case
	 * of a topic (pub-sub domain) with subscription durability activated.
	 * <p>The durable subscription name needs to be unique within this client's
	 * JMS client id. Default is the class name of the specified message listener.
	 * <p>Note: Only 1 concurrent consumer (which is the default of this
	 * message listener container) is allowed for each durable subscription.
	 * @see #setSubscriptionDurable
	 * @see #setClientId
	 * @see #setMessageListener
	 */
	public void setDurableSubscriptionName(String durableSubscriptionName) {
		this.durableSubscriptionName = durableSubscriptionName;
	}

	/**
	 * Return the name of a durable subscription to create, if any.
	 */
	public String getDurableSubscriptionName() {
		return this.durableSubscriptionName;
	}

	/**
	 * Set the JMS ExceptionListener to notify in case of a JMSException thrown
	 * by the registered message listener or the invocation infrastructure.
	 */
	public void setExceptionListener(ExceptionListener exceptionListener) {
		this.exceptionListener = exceptionListener;
	}

	/**
	 * Return the JMS ExceptionListener to notify in case of a JMSException thrown
	 * by the registered message listener or the invocation infrastructure, if any.
	 */
	public ExceptionListener getExceptionListener() {
		return this.exceptionListener;
	}

	/**
	 * Set an ErrorHandler to be invoked in case of any uncaught exceptions thrown
	 * while processing a Message. By default there will be <b>no</b> ErrorHandler
	 * so that error-level logging is the only result.
	 */
	public void setErrorHandler(ErrorHandler errorHandler) {
		this.errorHandler = errorHandler;
	}

	/**
	 * Set whether to expose the listener JMS Session to a registered
	 * {@link SessionAwareMessageListener} as well as to
	 * {@link org.springframework.jms.core.JmsTemplate} calls.
	 * <p>Default is "true", reusing the listener's {@link Session}.
	 * Turn this off to expose a fresh JMS Session fetched from the same
	 * underlying JMS {@link Connection} instead, which might be necessary
	 * on some JMS providers.
	 * <p>Note that Sessions managed by an external transaction manager will
	 * always get exposed to {@link org.springframework.jms.core.JmsTemplate}
	 * calls. So in terms of JmsTemplate exposure, this setting only affects
	 * locally transacted Sessions.
	 * @see SessionAwareMessageListener
	 */
	public void setExposeListenerSession(boolean exposeListenerSession) {
		this.exposeListenerSession = exposeListenerSession;
	}

	/**
	 * Return whether to expose the listener JMS {@link Session} to a
	 * registered {@link SessionAwareMessageListener}.
	 */
	public boolean isExposeListenerSession() {
		return this.exposeListenerSession;
	}

	/**
	 * Set whether to accept received messages while the listener container
	 * in the process of stopping.
	 * <p>Default is "false", rejecting such messages through aborting the
	 * receive attempt. Switch this flag on to fully process such messages
	 * even in the stopping phase, with the drawback that even newly sent
	 * messages might still get processed (if coming in before all receive
	 * timeouts have expired).
	 * <p><b>NOTE:</b> Aborting receive attempts for such incoming messages
	 * might lead to the provider's retry count decreasing for the affected
	 * messages. If you have a high number of concurrent consumers, make sure
	 * that the number of retries is higher than the number of consumers,
	 * to be on the safe side for all potential stopping scenarios.
	 */
	public void setAcceptMessagesWhileStopping(boolean acceptMessagesWhileStopping) {
		this.acceptMessagesWhileStopping = acceptMessagesWhileStopping;
	}

	/**
	 * Return whether to accept received messages while the listener container
	 * in the process of stopping.
	 */
	public boolean isAcceptMessagesWhileStopping() {
		return this.acceptMessagesWhileStopping;
	}

	@Override
	protected void validateConfiguration() {
		if (this.destination == null) {
			throw new IllegalArgumentException("Property 'destination' or 'destinationName' is required");
		}
		if (isSubscriptionDurable() && !isPubSubDomain()) {
			throw new IllegalArgumentException("A durable subscription requires a topic (pub-sub domain)");
		}
		if (this.destination instanceof ActiveMQTopic) {
			if (this.messageListener instanceof LMessageListener && null == this.jedisPool) {
				throw new IllegalArgumentException("使用[" + LMessageListener.class.getName() + "]监听["
						+ ActiveMQTopic.class.getName() + "]Topic消息，需要配置redis连接池属性[jedisPool]");
			}

			if (this.messageListener instanceof LMessageListener && null == this.msgValidtime) {
				throw new IllegalArgumentException("使用[" + LMessageListener.class.getName() + "]监听["
						+ ActiveMQTopic.class.getName()
						+ "]Topic消息，需要配置消息有效时间属性[msgValidtime]，最好配置与服务器端消息有效时间一致或大于服务器端消息有效时间，单位精确到秒");
			}

			if (this.messageListener instanceof LMessageListener && null == this.failMsgListSize) {
				throw new IllegalArgumentException("使用[" + LMessageListener.class.getName() + "]监听["
						+ ActiveMQTopic.class.getName()
						+ "]Topic消息，需要配置失败消息重试队列大小属性[failMsgListSize]，当失败的消息数超过配置数时，会删除最早失败的重试消息，配置为0则代表不限制队列大小");
			}
		}
		if (this.messageListener instanceof LMessageListener) {
			if (null == this.projectName || "".equals(this.projectName.trim())) {
				throw new IllegalArgumentException("使用[" + LMessageListener.class.getName()
						+ "]监听消息，需要配置项目名属性[projectName]");
			}

			if (null != this.jedisPool) {
				if (null == this.msgValidtime || null == this.failMsgListSize) {
					throw new IllegalArgumentException("使用[" + LMessageListener.class.getName()
							+ "]监听消息，如果需要使用到消息锁以及失败消息重试功能，需要同时配置[jedisPool, msgValidtime, failMsgListSize]三个属性");
				}
			}
			
			try {
				this.initLMessageListener((LMessageListener) this.messageListener);
			}
			catch (JMSException e) {
				LOG.error("初始化LMessageListener属性失败, 异常: " + e.toString(), e);
				throw new IllegalArgumentException("初始化LMessageListener属性失败, 异常: " + e.toString());
			}
		}
	}

	//-------------------------------------------------------------------------
	// Template methods for listener execution
	//-------------------------------------------------------------------------

	/**
	 * Execute the specified listener,
	 * committing or rolling back the transaction afterwards (if necessary).
	 * @param session the JMS Session to operate on
	 * @param message the received JMS Message
	 * @see #invokeListener
	 * @see #commitIfNecessary
	 * @see #rollbackOnExceptionIfNecessary
	 * @see #handleListenerException
	 */
	protected void executeListener(Session session, Message message) {
		try {
			doExecuteListener(session, message);
		}
		catch (Throwable ex) {
			handleListenerException(ex);
		}
	}

	/**
	 * Execute the specified listener,
	 * committing or rolling back the transaction afterwards (if necessary).
	 * @param session the JMS Session to operate on
	 * @param message the received JMS Message
	 * @throws JMSException if thrown by JMS API methods
	 * @see #invokeListener
	 * @see #commitIfNecessary
	 * @see #rollbackOnExceptionIfNecessary
	 * @see #convertJmsAccessException
	 */
	protected void doExecuteListener(Session session, Message message) throws JMSException {
		if (!isAcceptMessagesWhileStopping() && !isRunning()) {
			if (LOG.isWarnEnabled()) {
				LOG.warn("Rejecting received message because of the listener container "
						+ "having been stopped in the meantime: " + message);
			}
			rollbackIfNecessary(session);
			throw new MessageRejectedWhileStoppingException();
		}
		try {
			invokeListener(session, message);
		}
		catch (JMSException ex) {
			rollbackOnExceptionIfNecessary(session, ex);
			throw ex;
		}
		catch (RuntimeException ex) {
			rollbackOnExceptionIfNecessary(session, ex);
			throw ex;
		}
		catch (Error err) {
			rollbackOnExceptionIfNecessary(session, err);
			throw err;
		}
		commitIfNecessary(session, message);
	}

	/**
	 * 初始化LMessageListener消息监听器
	 * @param listener
	 * @throws JMSException
	 */
	private void initLMessageListener(LMessageListener listener) throws JMSException {
		
		listener.setJedisPool(this.jedisPool);
		listener.setMsgValidtime(this.msgValidtime);
		listener.setProjectName(this.projectName);
		listener.setFailMsgListSize(this.failMsgListSize);

		if (this.destination instanceof ActiveMQTopic) {
			String topicName = ((ActiveMQTopic) this.destination).getTopicName();
			listener.setDestinationName(topicName);
		}

		if (this.destination instanceof ActiveMQQueue) {
			String queueName = ((ActiveMQQueue) this.destination).getQueueName();
			listener.setDestinationName(queueName);
		}

		LOG.info("初始化LMessageListener消息监听器, 配置信息{项目名: " + this.projectName + ", 监听目标消息名: "
				+ ((LMessageListener) listener).getDestinationName() + ", 消息锁有效时间: " + this.msgValidtime
				+ "秒, 失败消息列表大小: " + this.failMsgListSize + "}");
	}

	/**
	 * Invoke the specified listener: either as standard JMS MessageListener
	 * or (preferably) as Spring SessionAwareMessageListener.
	 * @param session the JMS Session to operate on
	 * @param message the received JMS Message
	 * @throws JMSException if thrown by JMS API methods
	 * @see #setMessageListener
	 */
	@SuppressWarnings("rawtypes")
	protected void invokeListener(Session session, Message message) throws JMSException {
		Object listener = getMessageListener();

		if (listener instanceof SessionAwareMessageListener) {
			doInvokeListener((SessionAwareMessageListener) listener, session, message);
		}
		else if (listener instanceof MessageListener) {
			doInvokeListener((MessageListener) listener, message);
		}
		else if (listener != null) {
			throw new IllegalArgumentException("Only MessageListener and SessionAwareMessageListener supported: "
					+ listener);
		}
		else {
			throw new IllegalStateException("No message listener specified - see property 'messageListener'");
		}
	}

	/**
	 * Invoke the specified listener as Spring SessionAwareMessageListener,
	 * exposing a new JMS Session (potentially with its own transaction)
	 * to the listener if demanded.
	 * @param listener the Spring SessionAwareMessageListener to invoke
	 * @param session the JMS Session to operate on
	 * @param message the received JMS Message
	 * @throws JMSException if thrown by JMS API methods
	 * @see SessionAwareMessageListener
	 * @see #setExposeListenerSession
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	protected void doInvokeListener(SessionAwareMessageListener listener, Session session, Message message)
			throws JMSException {

		Connection conToClose = null;
		Session sessionToClose = null;
		try {
			Session sessionToUse = session;
			if (!isExposeListenerSession()) {
				// We need to expose a separate Session.
				conToClose = createConnection();
				sessionToClose = createSession(conToClose);
				sessionToUse = sessionToClose;
			}
			// Actually invoke the message listener...
			listener.onMessage(message, sessionToUse);
			// Clean up specially exposed Session, if any.
			if (sessionToUse != session) {
				if (sessionToUse.getTransacted() && isSessionLocallyTransacted(sessionToUse)) {
					// Transacted session created by this container -> commit.
					JmsUtils.commitIfNecessary(sessionToUse);
				}
			}
		}
		finally {
			JmsUtils.closeSession(sessionToClose);
			JmsUtils.closeConnection(conToClose);
		}
	}

	/**
	 * Invoke the specified listener as standard JMS MessageListener.
	 * <p>Default implementation performs a plain invocation of the
	 * {@code onMessage} method.
	 * @param listener the JMS MessageListener to invoke
	 * @param message the received JMS Message
	 * @throws JMSException if thrown by JMS API methods
	 * @see javax.jms.MessageListener#onMessage
	 */
	protected void doInvokeListener(MessageListener listener, Message message) throws JMSException {
		listener.onMessage(message);
	}

	/**
	 * Perform a commit or message acknowledgement, as appropriate.
	 * @param session the JMS Session to commit
	 * @param message the Message to acknowledge
	 * @throws javax.jms.JMSException in case of commit failure
	 */
	protected void commitIfNecessary(Session session, Message message) throws JMSException {
		// Commit session or acknowledge message.
		if (session.getTransacted()) {
			// Commit necessary - but avoid commit call within a JTA transaction.
			if (isSessionLocallyTransacted(session)) {
				// Transacted session created by this container -> commit.
				JmsUtils.commitIfNecessary(session);
			}
		}
		else if (message != null && isClientAcknowledge(session)) {
			message.acknowledge();
		}
	}

	/**
	 * Perform a rollback, if appropriate.
	 * @param session the JMS Session to rollback
	 * @throws javax.jms.JMSException in case of a rollback error
	 */
	protected void rollbackIfNecessary(Session session) throws JMSException {
		if (session.getTransacted() && isSessionLocallyTransacted(session)) {
			// Transacted session created by this container -> rollback.
			JmsUtils.rollbackIfNecessary(session);
		}
	}

	/**
	 * Perform a rollback, handling rollback exceptions properly.
	 * @param session the JMS Session to rollback
	 * @param ex the thrown application exception or error
	 * @throws javax.jms.JMSException in case of a rollback error
	 */
	protected void rollbackOnExceptionIfNecessary(Session session, Throwable ex) throws JMSException {
		try {
			if (session.getTransacted() && isSessionLocallyTransacted(session)) {
				// Transacted session created by this container -> rollback.
				if (LOG.isDebugEnabled()) {
					LOG.debug("Initiating transaction rollback on application exception", ex);
				}
				JmsUtils.rollbackIfNecessary(session);
			}
		}
		catch (IllegalStateException ex2) {
			LOG.debug("Could not roll back because Session already closed", ex2);
		}
		catch (JMSException ex2) {
			LOG.error("Application exception overridden by rollback exception", ex);
			throw ex2;
		}
		catch (RuntimeException ex2) {
			LOG.error("Application exception overridden by rollback exception", ex);
			throw ex2;
		}
		catch (Error err) {
			LOG.error("Application exception overridden by rollback error", ex);
			throw err;
		}
	}

	/**
	 * Check whether the given Session is locally transacted, that is, whether
	 * its transaction is managed by this listener container's Session handling
	 * and not by an external transaction coordinator.
	 * <p>Note: The Session's own transacted flag will already have been checked
	 * before. This method is about finding out whether the Session's transaction
	 * is local or externally coordinated.
	 * @param session the Session to check
	 * @return whether the given Session is locally transacted
	 * @see #isSessionTransacted()
	 * @see org.springframework.jms.connection.ConnectionFactoryUtils#isSessionTransactional
	 */
	protected boolean isSessionLocallyTransacted(Session session) {
		return isSessionTransacted();
	}

	/**
	 * Handle the given exception that arose during listener execution.
	 * <p>The default implementation logs the exception at warn level,
	 * not propagating it to the JMS provider &mdash; assuming that all handling of
	 * acknowledgement and/or transactions is done by this listener container.
	 * This can be overridden in subclasses.
	 * @param ex the exception to handle
	 */
	protected void handleListenerException(Throwable ex) {
		if (ex instanceof MessageRejectedWhileStoppingException) {
			// Internal exception - has been handled before.
			return;
		}
		if (ex instanceof JMSException) {
			invokeExceptionListener((JMSException) ex);
		}
		if (isActive()) {
			// Regular case: failed while active.
			// Invoke ErrorHandler if available.
			invokeErrorHandler(ex);
		}
		else {
			// Rare case: listener thread failed after container shutdown.
			// Log at debug level, to avoid spamming the shutdown log.
			LOG.debug("Listener exception after container shutdown", ex);
		}
	}

	/**
	 * Invoke the registered JMS ExceptionListener, if any.
	 * @param ex the exception that arose during JMS processing
	 * @see #setExceptionListener
	 */
	protected void invokeExceptionListener(JMSException ex) {
		ExceptionListener exceptionListener = getExceptionListener();
		if (exceptionListener != null) {
			exceptionListener.onException(ex);
		}
	}

	/**
	 * Invoke the registered ErrorHandler, if any. Log at warn level otherwise.
	 * @param ex the uncaught error that arose during JMS processing.
	 * @see #setErrorHandler
	 */
	protected void invokeErrorHandler(Throwable ex) {
		if (this.errorHandler != null) {
			this.errorHandler.handleError(ex);
		}
		else if (LOG.isWarnEnabled()) {
			LOG.warn("Execution of JMS message listener failed, and no ErrorHandler has been set.", ex);
		}
	}

	/**
	 * Internal exception class that indicates a rejected message on shutdown.
	 * Used to trigger a rollback for an external transaction manager in that case.
	 */
	@SuppressWarnings("serial")
	private static class MessageRejectedWhileStoppingException extends RuntimeException {

	}

}
