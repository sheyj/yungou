package com.yungou.o2o.web.manager.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.yungou.o2o.center.base.BaseService;
import com.yungou.o2o.center.base.ServiceException;
import com.yungou.o2o.center.manager.common.dto.MenuVo;
import com.yungou.o2o.center.manager.model.SystemUser;
import com.yungou.o2o.center.manager.service.SystemUserService;
import com.yungou.o2o.common.ManagerException;
import com.yungou.o2o.web.manager.SystemUserManager;

@Component("systemUserManager")
public class SystemUserManagerImpl extends BaseManagerImpl implements
		SystemUserManager {

	@Autowired
	private SystemUserService systemUserService;

	@Override
	protected BaseService init() {
		return systemUserService;
	}

	public List<SystemUser> findByBiz(SystemUser systemUser,
			Map<String, Object> paraMap) throws ManagerException {
		try {
			return systemUserService.findByBiz(systemUser, paraMap);
		} catch (ServiceException e) {
			throw new ManagerException(e.getMessage(),e);
		}
	}

	public List<MenuVo> getLoginUserMenu(String loginName)
			throws ManagerException {
		try {
			return systemUserService.getLoginUserMenu(loginName);
		} catch (ServiceException e) {
			throw new ManagerException(e.getMessage(),e);
		}
	}

	public void add(SystemUser systemUser) throws ManagerException {
		try {
			systemUserService.add(systemUser);
		} catch (ServiceException e) {
			throw new ManagerException(e.getMessage(),e);
		}

	}

}
