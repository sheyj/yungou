package com.yungou.o2o.center.manager.provider.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.yungou.o2o.center.base.BaseMapper;
import com.yungou.o2o.center.base.BaseServiceImpl;
import com.yungou.o2o.center.manager.provider.dal.database.RoleMapper;
import com.yungou.o2o.center.manager.service.RoleService;

/**
 * TODO: 增加描述
 * 
 * @author username
 * @date 2014-5-20 上午10:59:17
 * @version 0.1.0 
 * @copyright yougou.com 
 */
@Service("roleService")
public class RoleServiceImpl extends BaseServiceImpl implements RoleService{

	@Resource
	private RoleMapper roleMapper;
	
	@Override
	public BaseMapper init() {
		return roleMapper;
	}

}
