package com.yungou.o2o.web.manager;

import java.util.List;
import java.util.Map;

import com.yungou.o2o.center.base.CommonOperatorEnum;
import com.yungou.o2o.center.base.SimplePage;
import com.yungou.o2o.common.ManagerException;

public interface BaseManager {

	public <ModelType> int deleteById(ModelType modelType) throws ManagerException;

	public <ModelType> int add(ModelType modelType) throws ManagerException;

	public <ModelType> ModelType findById(String key) throws ManagerException;

	/**
	 * 根据参数查询
	 * @param modelType 固定参数
	 * @param params 页面其他参数
	 * @return
	 * @throws ManagerException
	 */
	public <ModelType> List<ModelType> findByBiz(ModelType modelType, Map<String, Object> params)
			throws ManagerException;

	/**
	 * 根据id修改实体
	 * @param modelType
	 * @return
	 * @throws ManagerException
	 */
	public <ModelType> int modifyById(ModelType modelType) throws ManagerException;

	/**
	 * 
	 * @param params
	 * @return
	 * @throws ManagerException
	 */
	public int findCount(Map<String, Object> params) throws ManagerException;

	/**
	 * 根据参数查询列表
	 * @param page
	 * @param orderByField
	 * @param orderBy
	 * @param params
	 * @return
	 * @throws ManagerException
	 */
	public <ModelType> List<ModelType> findByPage(SimplePage page, String orderByField, String orderBy,
			Map<String, Object> params) throws ManagerException;

	/**
	 * 公共的保存操作
	 * @param params key:增、删、改操作枚举 value:对象列表
	 * @return 影响条数
	 * @throws ManagerException 
	 */
	public <ModelType> int save(Map<CommonOperatorEnum, List<ModelType>> params) throws ManagerException;
}
