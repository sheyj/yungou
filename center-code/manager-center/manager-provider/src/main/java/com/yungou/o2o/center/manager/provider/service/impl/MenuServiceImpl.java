package com.yungou.o2o.center.manager.provider.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.yungou.o2o.center.base.BaseMapper;
import com.yungou.o2o.center.base.BaseServiceImpl;
import com.yungou.o2o.center.manager.provider.dal.database.MenuMapper;
import com.yungou.o2o.center.manager.service.SystemMenuService;

/**
 * 菜单维护
 * 
 * @author username
 * @date 2014-5-20 上午10:58:54
 * @version 0.1.0 
 * @copyright yougou.com 
 */
@Service("systemMenuService")
public class MenuServiceImpl extends BaseServiceImpl implements SystemMenuService{

	@Resource
	private MenuMapper menuMapper;
	
	@Override
	public BaseMapper init() {
		return menuMapper;
	}


}
