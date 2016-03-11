package com.yungou.o2o.web.manager.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.yungou.o2o.center.base.ServiceException;
import com.yungou.o2o.center.manager.common.dto.MenuVo;
import com.yungou.o2o.center.manager.model.SystemUser;
import com.yungou.o2o.center.manager.service.SystemUserService;
import com.yungou.o2o.web.manager.SystemUserManager;
@Component("systemUserManager")
public class SystemUserManagerImpl implements SystemUserManager {

	@Autowired
	private SystemUserService  systemUserService;
	
	public List<SystemUser> findByBiz(SystemUser systemUser,
			Map<String, Object> paraMap) throws ServiceException {
		// TODO Auto-generated method stub
		return systemUserService.findByBiz(systemUser, paraMap);
	}

	public List<MenuVo> getLoginUserMenu(String loginName)
			throws ServiceException {
		// TODO Auto-generated method stub
		return systemUserService.getLoginUserMenu(loginName);
	}

	public void add(SystemUser systemUser) throws ServiceException {
		systemUserService.add(systemUser);

	}

}
