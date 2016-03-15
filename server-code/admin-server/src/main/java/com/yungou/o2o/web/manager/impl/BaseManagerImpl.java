package com.yungou.o2o.web.manager.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;

import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.yungou.o2o.center.base.BaseService;
import com.yungou.o2o.center.base.CommonOperatorEnum;
import com.yungou.o2o.center.base.ServiceException;
import com.yungou.o2o.center.base.SimplePage;
import com.yungou.o2o.common.ManagerException;
import com.yungou.o2o.web.manager.BaseManager;

public abstract class BaseManagerImpl implements BaseManager {

	private BaseService service;

	@PostConstruct
	protected void initConfig() {
		this.service = init();
	}

	protected abstract BaseService init();

	public <ModelType> int deleteById(ModelType modelType)
			throws ManagerException {
		try {
			return this.service.deleteById(modelType);
		} catch (ServiceException e) {
			throw new ManagerException(e.getMessage(), e);
		}
	}

	public <ModelType> int add(ModelType modelType) throws ManagerException {
		try {
			return this.service.add(modelType);
		} catch (ServiceException e) {
			throw new ManagerException(e.getMessage(), e);
		}
	}

	public <ModelType> ModelType findById(String key) throws ManagerException {
		try {
			return this.service.findById(key);
		} catch (ServiceException e) {
			throw new ManagerException(e.getMessage(), e);
		}
	}

	public <ModelType> int modifyById(ModelType modelType)
			throws ManagerException {
		try {
			return this.service.modifyById(modelType);
		} catch (ServiceException e) {
			throw new ManagerException(e.getMessage(), e);
		}
	}

	public int findCount(Map<String, Object> params) throws ManagerException {
		try {
			return this.service.findCount(params);
		} catch (ServiceException e) {
			throw new ManagerException(e.getMessage(), e);
		}
	}

	public <ModelType> List<ModelType> findByBiz(ModelType modelType,
			Map<String, Object> params) throws ManagerException {
		try {
			return this.service.findByBiz(modelType, params);
		} catch (ServiceException e) {
			throw new ManagerException(e.getMessage(), e);
		}
	}

	public <ModelType> List<ModelType> findByPage(SimplePage page,
			String orderByField, String orderBy, Map<String, Object> params)
			throws ManagerException {
		try {
			return service.findByPage(page, orderByField, orderBy, params);
		} catch (ServiceException e) {
			throw new ManagerException(e.getMessage(), e);
		}
	}

	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = { ManagerException.class })
	public <ModelType> int save(Map<CommonOperatorEnum, List<ModelType>> params)
			throws ManagerException {
		try {
			return service.save(params);
		} catch (ServiceException e) {
			throw new ManagerException(e.getMessage(), e);
		}
	}
}
