package com.yungou.o2o.center.manager.provider.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.yungou.o2o.center.base.BaseMapper;
import com.yungou.o2o.center.base.BaseServiceImpl;
import com.yungou.o2o.center.manager.provider.dal.database.OrderInfoMapper;
import com.yungou.o2o.center.manager.service.OrderInfoService;

@Service("orderInfoService")
public class OrderInfoServiceImpl extends BaseServiceImpl implements
		OrderInfoService {

	@Resource
	private OrderInfoMapper orderInfoMapper;

	@Override
	public BaseMapper init() {
		return orderInfoMapper;
	}

}
