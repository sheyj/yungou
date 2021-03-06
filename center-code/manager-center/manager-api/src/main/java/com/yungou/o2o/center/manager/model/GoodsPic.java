package com.yungou.o2o.center.manager.model;

import java.io.Serializable;

public class GoodsPic implements Serializable{
    /**
	 * 
	 */
	private static final long serialVersionUID = -1541606862534183476L;

	/**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column goods_pic.Id:
     *
     * @mbggenerated
     */
    private String id;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column goods_pic.goods_id:
     *
     * @mbggenerated
     */
    private String goodsId;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column goods_pic.pic_type:
     *
     * @mbggenerated
     */
    private Integer picType;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column goods_pic.pic_url:
     *
     * @mbggenerated
     */
    private String picUrl;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column goods_pic.Id
     *
     * @return the value of goods_pic.Id
     *
     * @mbggenerated
     */
    public String getId() {
        return id;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column goods_pic.Id
     *
     * @param id the value for goods_pic.Id
     *
     * @mbggenerated
     */
    public void setId(String id) {
        this.id = id == null ? null : id.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column goods_pic.goods_id
     *
     * @return the value of goods_pic.goods_id
     *
     * @mbggenerated
     */
    public String getGoodsId() {
        return goodsId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column goods_pic.goods_id
     *
     * @param goodsId the value for goods_pic.goods_id
     *
     * @mbggenerated
     */
    public void setGoodsId(String goodsId) {
        this.goodsId = goodsId == null ? null : goodsId.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column goods_pic.pic_type
     *
     * @return the value of goods_pic.pic_type
     *
     * @mbggenerated
     */
    public Integer getPicType() {
        return picType;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column goods_pic.pic_type
     *
     * @param picType the value for goods_pic.pic_type
     *
     * @mbggenerated
     */
    public void setPicType(Integer picType) {
        this.picType = picType;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column goods_pic.pic_url
     *
     * @return the value of goods_pic.pic_url
     *
     * @mbggenerated
     */
    public String getPicUrl() {
        return picUrl;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column goods_pic.pic_url
     *
     * @param picUrl the value for goods_pic.pic_url
     *
     * @mbggenerated
     */
    public void setPicUrl(String picUrl) {
        this.picUrl = picUrl == null ? null : picUrl.trim();
    }
}