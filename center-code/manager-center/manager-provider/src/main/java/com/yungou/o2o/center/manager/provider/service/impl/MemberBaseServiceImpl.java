package com.yungou.o2o.center.manager.provider.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.yungou.o2o.center.base.BaseMapper;
import com.yungou.o2o.center.base.BaseServiceImpl;
import com.yungou.o2o.center.manager.provider.dal.database.MemberBaseMapper;
import com.yungou.o2o.center.manager.service.MemberBaseService;

@Service("memberBaseService")
public class MemberBaseServiceImpl extends BaseServiceImpl implements
		MemberBaseService {

	@Resource
	private MemberBaseMapper memberBaseMapper;

	@Override
	public BaseMapper init() {
		return memberBaseMapper;
	}

}
