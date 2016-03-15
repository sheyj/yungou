package com.yungou.o2o.center.manager.provider.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.yungou.o2o.center.base.BaseMapper;
import com.yungou.o2o.center.base.BaseServiceImpl;
import com.yungou.o2o.center.manager.provider.dal.database.GoodsMapper;
import com.yungou.o2o.center.manager.service.GoodsService;

@Service("goodsService")
public class GoodsServiceImpl extends BaseServiceImpl implements GoodsService {

	@Resource
	private GoodsMapper goodsMapper;

	@Override
	public BaseMapper init() {
		return goodsMapper;
	}

}
