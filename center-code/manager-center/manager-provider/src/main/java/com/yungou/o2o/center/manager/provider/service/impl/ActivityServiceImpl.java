package com.yungou.o2o.center.manager.provider.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.yungou.o2o.center.base.BaseMapper;
import com.yungou.o2o.center.base.BaseServiceImpl;
import com.yungou.o2o.center.manager.provider.dal.database.ActivityMapper;
import com.yungou.o2o.center.manager.service.ActivityService;

@Service("activityService")
public class ActivityServiceImpl extends BaseServiceImpl implements
		ActivityService {

	@Resource
	private ActivityMapper activityMapper;
	
	@Override
	public BaseMapper init() {
		return activityMapper;
	}

}
