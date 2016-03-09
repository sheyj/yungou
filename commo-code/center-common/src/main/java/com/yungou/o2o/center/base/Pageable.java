package com.yungou.o2o.center.base;

/**
 * TODO: 增加描述
 * 
 * @author username
 * @date 2014-5-19 下午4:17:44
 * @version 0.1.0 
 * @copyright yougou.com 
 */
public interface Pageable {
	/**
	 * 总记录数
	 * 
	 * @return
	 */
	public int getTotalCount();

	/**
	 * 总页数
	 * 
	 * @return
	 */
	public int getTotalPage();

	/**
	 * 每页记录数
	 * 
	 * @return
	 */
	public int getPageSize();

	/**
	 * 当前页号
	 * 
	 * @return
	 */
	public int getPageNo();

	/**
	 * 是否第一页
	 * 
	 * @return
	 */
	public boolean isFirstPage();

	/**
	 * 是否最后一页
	 * 
	 * @return
	 */
	public boolean isLastPage();

	/**
	 * 返回下页的页号
	 */
	public int getNextPage();

	/**
	 * 返回上页的页号
	 */
	public int getPrePage();
}
