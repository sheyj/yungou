package com.yungou.o2o.web.manager.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.yungou.o2o.center.base.ServiceException;
import com.yungou.o2o.center.manager.model.SystemDict;
import com.yungou.o2o.center.manager.service.SystemDictService;
import com.yungou.o2o.web.manager.SystemDictManager;

@Component("systemDictManager")
public class SystemDictManagerImpl implements SystemDictManager {

	@Autowired
	private SystemDictService  systemDictService;
	
	
	public List<SystemDict> findByBiz(SystemDict systemDict,
			Map<String, Object> params) throws ServiceException {
		return systemDictService.findByBiz(systemDict, null);
	}

}
