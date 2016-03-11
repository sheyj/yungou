package com.yungou.o2o.web.manager;

import java.util.List;
import java.util.Map;

import com.yungou.o2o.center.base.ServiceException;
import com.yungou.o2o.center.manager.common.dto.MenuVo;
import com.yungou.o2o.center.manager.model.SystemUser;

public interface SystemUserManager {

	List<SystemUser> findByBiz(SystemUser systemUser, Map<String ,Object> paraMap) throws ServiceException;
	
	List<MenuVo> getLoginUserMenu(String oginName) throws ServiceException;
	
	void add(SystemUser systemUser)throws ServiceException;
}
