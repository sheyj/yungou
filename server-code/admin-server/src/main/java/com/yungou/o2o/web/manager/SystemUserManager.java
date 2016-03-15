package com.yungou.o2o.web.manager;

import java.util.List;
import java.util.Map;

import com.yungou.o2o.center.manager.common.dto.MenuVo;
import com.yungou.o2o.center.manager.model.SystemUser;
import com.yungou.o2o.common.ManagerException;

public interface SystemUserManager extends BaseManager{

	List<SystemUser> findByBiz(SystemUser systemUser, Map<String ,Object> paraMap) throws ManagerException;
	
	List<MenuVo> getLoginUserMenu(String oginName) throws ManagerException;
	
	void add(SystemUser systemUser)throws ManagerException;
}
