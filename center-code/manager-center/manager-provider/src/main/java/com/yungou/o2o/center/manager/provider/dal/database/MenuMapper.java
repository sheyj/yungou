package com.yungou.o2o.center.manager.provider.dal.database;

import java.util.List;
import java.util.Map;

import com.yungou.o2o.center.base.BaseMapper;
import com.yungou.o2o.center.manager.model.Menu;

public interface MenuMapper extends BaseMapper {
	
	List<Menu> selectLoginUserMenu(Map<String, Object> params);
	
}