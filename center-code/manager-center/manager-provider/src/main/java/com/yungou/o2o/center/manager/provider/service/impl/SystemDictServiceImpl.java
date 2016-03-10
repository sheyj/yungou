package com.yungou.o2o.center.manager.provider.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.yungou.o2o.center.base.BaseMapper;
import com.yungou.o2o.center.base.BaseServiceImpl;
import com.yungou.o2o.center.manager.provider.dal.database.SystemDictMapper;
import com.yungou.o2o.center.manager.service.SystemDictService;

/**
 * TODO: 增加描述
 * 
 * @author username
 * @date 2014-5-21 下午4:50:29
 * @version 0.1.0 
 * @copyright yougou.com 
 */
@Service("systemDictService")
public class SystemDictServiceImpl extends BaseServiceImpl implements SystemDictService {

	@Resource
	private SystemDictMapper systemDictMapper;
	
	@Override
	public BaseMapper init() {
		return systemDictMapper;
	}


}
