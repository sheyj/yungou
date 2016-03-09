package com.yungou.o2o.process.common.jms.listener;

import javax.jms.Session;

import org.springframework.jms.connection.JmsResourceHolder;

/**
 * JmsResourceHolder marker subclass that indicates local exposure,
 * i.e. that does not indicate an externally managed transaction.
 *
 * @author Juergen Hoeller
 * @since 2.5.2
 */
class LocallyExposedJmsResourceHolder extends JmsResourceHolder {

	public LocallyExposedJmsResourceHolder(Session session) {
		super(session);
	}

}
