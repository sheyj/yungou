package com.yungou.o2o.center.manager.model;

import java.io.Serializable;
import java.util.Date;

public class MemberLevel implements Serializable{
    /**
	 * 
	 */
	private static final long serialVersionUID = 1628312913237214100L;

	/**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column member_level.Id:
     *
     * @mbggenerated
     */
    private String id;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column member_level.level_name:
     *
     * @mbggenerated
     */
    private String levelName;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column member_level.level_pic:
     *
     * @mbggenerated
     */
    private String levelPic;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column member_level.create_time:
     *
     * @mbggenerated
     */
    private Date createTime;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column member_level.Id
     *
     * @return the value of member_level.Id
     *
     * @mbggenerated
     */
    public String getId() {
        return id;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column member_level.Id
     *
     * @param id the value for member_level.Id
     *
     * @mbggenerated
     */
    public void setId(String id) {
        this.id = id == null ? null : id.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column member_level.level_name
     *
     * @return the value of member_level.level_name
     *
     * @mbggenerated
     */
    public String getLevelName() {
        return levelName;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column member_level.level_name
     *
     * @param levelName the value for member_level.level_name
     *
     * @mbggenerated
     */
    public void setLevelName(String levelName) {
        this.levelName = levelName == null ? null : levelName.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column member_level.level_pic
     *
     * @return the value of member_level.level_pic
     *
     * @mbggenerated
     */
    public String getLevelPic() {
        return levelPic;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column member_level.level_pic
     *
     * @param levelPic the value for member_level.level_pic
     *
     * @mbggenerated
     */
    public void setLevelPic(String levelPic) {
        this.levelPic = levelPic == null ? null : levelPic.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column member_level.create_time
     *
     * @return the value of member_level.create_time
     *
     * @mbggenerated
     */
    public Date getCreateTime() {
        return createTime;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column member_level.create_time
     *
     * @param createTime the value for member_level.create_time
     *
     * @mbggenerated
     */
    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }
}