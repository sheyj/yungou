package com.yungou.o2o.center.manager.provider.service.impl;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yungou.o2o.center.manager.model.Menu;
import com.yungou.o2o.center.manager.provider.dal.database.MenuMapper;
import com.yungou.o2o.center.manager.service.SystemMenuService;

@Service("systemMenuService")
public class SystemMenuServiceImpl implements SystemMenuService {

	private static final Logger logger = LoggerFactory.getLogger(SystemMenuServiceImpl.class); 
	
	@Autowired
	private MenuMapper menuMapper;
	
	
	@Override
	public List<Menu> selectLoginUserMenu(Map<String, Object> params) {
		if(logger.isInfoEnabled()){
			logger.info("查询selectLoginUserMenu参数"+params.toString());
		}
		return menuMapper.selectLoginUserMenu(params);
	}

}
