package com.yungou.o2o.center.base;

import java.util.List;
import java.util.Map;

/**
 * TODO: 增加描述
 * 
 * @author username
 * @date 2014-5-19 下午4:14:12
 * @version 0.1.0 
 * @copyright yougou.com 
 */
public interface BaseService {

	public <ModelType> int deleteById(ModelType modelType) throws ServiceException;

	public <ModelType> int add(ModelType modelType) throws ServiceException;

	public <ModelType> ModelType findById(String key) throws ServiceException;

	/**
	 * 根据参数查询
	 * @param modelType 固定参数
	 * @param params 页面其他参数
	 * @return
	 * @throws ServiceException
	 */
	public <ModelType> List<ModelType> findByBiz(ModelType modelType, Map<String, Object> params)
			throws ServiceException;

	/**
	 * 根据id修改实体
	 * @param modelType
	 * @return
	 * @throws ServiceException
	 */
	public <ModelType> int modifyById(ModelType modelType) throws ServiceException;

	/**
	 * 
	 * @param params
	 * @return
	 * @throws ServiceException
	 */
	public int findCount(Map<String, Object> params) throws ServiceException;

	/**
	 * 根据参数查询列表
	 * @param page
	 * @param orderByField
	 * @param orderBy
	 * @param params
	 * @return
	 * @throws ServiceException
	 */
	public <ModelType> List<ModelType> findByPage(SimplePage page, String orderByField, String orderBy,
			Map<String, Object> params) throws ServiceException;

	/**
	 * 公共的保存操作
	 * @param params key:增、删、改操作枚举 value:对象列表
	 * @return 影响条数
	 * @throws ServiceException 
	 */
	public <ModelType> int save(Map<CommonOperatorEnum, List<ModelType>> params) throws ServiceException;
}
