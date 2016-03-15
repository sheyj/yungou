package com.yungou.o2o.web.manager.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.yungou.o2o.center.base.BaseService;
import com.yungou.o2o.center.manager.service.SystemParamService;
import com.yungou.o2o.web.manager.SystemParamManager;

@Component("systemParamManager")
public class SystemParamManagerImpl extends BaseManagerImpl implements
		SystemParamManager {

	@Autowired
	private SystemParamService systemParamService;
	
	@Override
	protected BaseService init() {
		return systemParamService;
	}

}
