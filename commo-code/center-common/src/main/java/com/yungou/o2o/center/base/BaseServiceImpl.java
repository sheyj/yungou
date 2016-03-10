package com.yungou.o2o.center.base;

import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javax.annotation.PostConstruct;

import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 * TODO: 增加描述
 * 
 * @author username
 * @date 2014-5-19 下午4:19:23
 * @version 0.1.0 
 * @copyright yougou.com 
 */
public abstract class BaseServiceImpl implements BaseService {

	private BaseMapper mapper;

	@SuppressWarnings("unused")
	@PostConstruct
	private void initConfig() {
		this.mapper = this.init();
	}

	public abstract BaseMapper init();

	public <ModelType> int deleteById(ModelType modelType) throws ServiceException {
		try {
			return mapper.deleteByPrimarayKeyForModel(modelType);
		} catch (Exception e) {
			throw new ServiceException("删除异常", e);
		}
				
	}

	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = ServiceException.class)
	public <ModelType> int add(ModelType modelType) throws ServiceException {
		try {
			return mapper.insertSelective(modelType);
		} catch (Exception e) {
			throw new ServiceException("保存异常", e);
		}
	}

	public <ModelType> ModelType findById(String key) throws ServiceException {
		try {
			return mapper.selectByPrimaryKey(key);
		} catch (Exception e) {
			throw new ServiceException("查询异常", e);
		}
	}

	public <ModelType> List<ModelType> findByBiz(ModelType modelType, Map<String, Object> params)
			throws ServiceException {
		try {
			return mapper.selectByParams(modelType, params);
		} catch (Exception e) {
			throw new ServiceException("查询异常", e);
		}
	}

	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = ServiceException.class)
	public <ModelType> int modifyById(ModelType modelType) throws ServiceException {
		try {
			return mapper.updateByPrimaryKeySelective(modelType);
		} catch (Exception e) {
			throw new ServiceException("修改异常", e);
		}
	}

	public int findCount(Map<String, Object> params) throws ServiceException {
		try {
			return mapper.selectCount(params);
		} catch (Exception e) {
			throw new ServiceException("查询异常", e);
		}
	}

	public <ModelType> List<ModelType> findByPage(SimplePage page, String orderByField, String orderBy,
			Map<String, Object> params) throws ServiceException {
		try {
			return mapper.selectByPage(page, orderByField, orderBy, params);
		} catch (Exception e) {
			throw new ServiceException("查询异常", e);
		}
	}

	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = ServiceException.class)
	public <ModelType> int save(Map<CommonOperatorEnum, List<ModelType>> params) throws ServiceException {
		try {
			int count = 0;
			for (Entry<CommonOperatorEnum, List<ModelType>> param : params.entrySet()) {
				if (param.getKey().equals(CommonOperatorEnum.DELETED)) {
					List<ModelType> list = params.get(CommonOperatorEnum.DELETED);
					if (null != list && list.size() > 0) {
						for (ModelType modelType : list) {
							count += this.mapper.deleteByPrimarayKeyForModel(modelType);
						}
					}
				}
				if (param.getKey().equals(CommonOperatorEnum.UPDATED)) {
					List<ModelType> list = params.get(CommonOperatorEnum.UPDATED);
					if (null != list && list.size() > 0) {
						for (ModelType modelType : list) {
							count += this.mapper.updateByPrimaryKeySelective(modelType);
						}
					}
				}
				if (param.getKey().equals(CommonOperatorEnum.INSERTED)) {
					List<ModelType> list = params.get(CommonOperatorEnum.INSERTED);
					if (null != list && list.size() > 0) {
						for (ModelType modelType : list) {
							this.mapper.insertSelective(modelType);
						}
						count += list.size();
					}
				}
			}
			return count;
		} catch (Exception e) {
			throw new ServiceException("保存数据异常", e);
		}
	}
}
