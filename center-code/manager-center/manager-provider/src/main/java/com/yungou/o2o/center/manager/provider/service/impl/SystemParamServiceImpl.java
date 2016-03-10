package com.yungou.o2o.center.manager.provider.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.yungou.o2o.center.base.BaseMapper;
import com.yungou.o2o.center.base.BaseServiceImpl;
import com.yungou.o2o.center.manager.provider.dal.database.SystemParamMapper;
import com.yungou.o2o.center.manager.service.SystemParamService;

/**
 * TODO: 增加描述
 * 
 * @author username
 * @date 2014-5-21 下午4:50:44
 * @version 0.1.0 
 * @copyright yougou.com 
 */
@Service("systemParamService")
public class SystemParamServiceImpl extends BaseServiceImpl implements SystemParamService{

	@Resource
	private SystemParamMapper systemParamMapper;
	
	@Override
	public BaseMapper init() {
		return systemParamMapper;
	}

}
