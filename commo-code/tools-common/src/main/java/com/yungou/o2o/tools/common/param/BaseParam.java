package com.yungou.o2o.tools.common.param;

import java.io.Serializable;
import java.util.Date;

/**
 * 基础参数
 * @author lin.zb
 */
public class BaseParam implements Serializable
{
    private static final long serialVersionUID = 1449266105255383731L;

    /**
     * 排序字段(例taskInfoSeqid).
     */
    private String sort;
    
    /**
     * 正序|反序(例DESC|ASC)
     */
    private String order;
    
    /**
     * 用于排序起始行,缺省为1
     */
    private int firstRow = 1;
    
    /**
     * 用于排序结束行，缺省为10
     */
    private int lastRow = 10;
    
    /**
     * 当前页
     */
    private int currentPage = 0;
    
    /**
     * 每页显示的条数
     */
    private int pageSize = 10;
    
    /**
     * 创建时间
     */
    private Date createTime;
    
    /**
     * 修改时间
     */
    private Date updateTime;
    
    /**
     * 是否精确查询(默认为精确) Y:精确 N:模糊
     */
    private String exactQuery = "Y";
    
    public String getSort()
    {
        return sort;
    }
    
    public void setSort(String sort)
    {
        this.sort = sort;
    }
    
    public String getOrder()
    {
        return order;
    }
    
    public void setOrder(String order)
    {
        this.order = order;
    }
    
    public int getFirstRow()
    {
        return firstRow;
    }
    
    public void setFirstRow(int firstRow)
    {
        this.firstRow = firstRow;
    }
    
    public int getLastRow()
    {
        return lastRow;
    }
    
    public void setLastRow(int lastRow)
    {
        this.lastRow = lastRow;
    }
    
    public int getCurrentPage()
    {
        return currentPage;
    }
    
    public void setCurrentPage(int currentPage)
    {
        this.currentPage = currentPage;
    }
    
    public int getPageSize()
    {
        return pageSize;
    }
    
    public void setPageSize(int pageSize)
    {
        this.pageSize = pageSize;
    }
    
    public Date getCreateTime()
    {
        return createTime;
    }
    
    public void setCreateTime(Date createTime)
    {
        this.createTime = createTime;
    }
    
    public Date getUpdateTime()
    {
        return updateTime;
    }
    
    public void setUpdateTime(Date updateTime)
    {
        this.updateTime = updateTime;
    }
    
    public String getExactQuery()
    {
        return exactQuery;
    }
    
    public void setExactQuery(String exactQuery)
    {
        this.exactQuery = exactQuery;
    }
}
