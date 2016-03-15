package com.yungou.o2o.center.manager.provider.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.yungou.o2o.center.base.BaseMapper;
import com.yungou.o2o.center.base.BaseServiceImpl;
import com.yungou.o2o.center.manager.provider.dal.database.HomePagePicMapper;
import com.yungou.o2o.center.manager.service.HomePagePicService;

@Service("homePagePicService")
public class HomePagePicServiceImpl extends BaseServiceImpl implements
		HomePagePicService {

	@Resource
	private HomePagePicMapper homePagePicMapper;

	@Override
	public BaseMapper init() {
		return homePagePicMapper;
	}

}
