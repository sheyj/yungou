package com.yungou.o2o.center.manager.provider.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.yungou.o2o.center.base.BaseMapper;
import com.yungou.o2o.center.base.BaseServiceImpl;
import com.yungou.o2o.center.manager.provider.dal.database.MemberAddressMapper;
import com.yungou.o2o.center.manager.service.MemberAddressService;

@Service("memberAddressService")
public class MemberAddressServiceImpl extends BaseServiceImpl implements
		MemberAddressService {
	@Resource
	private MemberAddressMapper memberAddressMapper;

	@Override
	public BaseMapper init() {
		return memberAddressMapper;
	}

}
