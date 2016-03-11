package com.yungou.o2o.web.manager;

import java.util.List;
import java.util.Map;

import com.yungou.o2o.center.base.ServiceException;
import com.yungou.o2o.center.manager.model.SystemDict;

public interface SystemDictManager {
	
	List<SystemDict> findByBiz(SystemDict systemDict, Map<String, Object> params) throws ServiceException;
}
