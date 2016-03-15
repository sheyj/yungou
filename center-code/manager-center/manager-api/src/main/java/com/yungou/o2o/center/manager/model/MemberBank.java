package com.yungou.o2o.center.manager.model;

import java.io.Serializable;
import java.util.Date;

public class MemberBank implements Serializable{
    /**
	 * 
	 */
	private static final long serialVersionUID = 7501935731779814195L;

	/**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column member_bank.Id:���
     *
     * @mbggenerated
     */
    private String id;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column member_bank.member_id: ��Ա�˺�ID
     *
     * @mbggenerated
     */
    private String memberId;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column member_bank.integral: ���
     *
     * @mbggenerated
     */
    private Integer integral;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column member_bank.account_balance: �˺����
     *
     * @mbggenerated
     */
    private Integer accountBalance;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column member_bank.create_time: ����ʱ��
     *
     * @mbggenerated
     */
    private Date createTime;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column member_bank.update_time: �޸�ʱ��
     *
     * @mbggenerated
     */
    private Date updateTime;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column member_bank.Id
     *
     * @return the value of member_bank.Id
     *
     * @mbggenerated
     */
    public String getId() {
        return id;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column member_bank.Id
     *
     * @param id the value for member_bank.Id
     *
     * @mbggenerated
     */
    public void setId(String id) {
        this.id = id == null ? null : id.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column member_bank.member_id
     *
     * @return the value of member_bank.member_id
     *
     * @mbggenerated
     */
    public String getMemberId() {
        return memberId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column member_bank.member_id
     *
     * @param memberId the value for member_bank.member_id
     *
     * @mbggenerated
     */
    public void setMemberId(String memberId) {
        this.memberId = memberId == null ? null : memberId.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column member_bank.integral
     *
     * @return the value of member_bank.integral
     *
     * @mbggenerated
     */
    public Integer getIntegral() {
        return integral;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column member_bank.integral
     *
     * @param integral the value for member_bank.integral
     *
     * @mbggenerated
     */
    public void setIntegral(Integer integral) {
        this.integral = integral;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column member_bank.account_balance
     *
     * @return the value of member_bank.account_balance
     *
     * @mbggenerated
     */
    public Integer getAccountBalance() {
        return accountBalance;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column member_bank.account_balance
     *
     * @param accountBalance the value for member_bank.account_balance
     *
     * @mbggenerated
     */
    public void setAccountBalance(Integer accountBalance) {
        this.accountBalance = accountBalance;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column member_bank.create_time
     *
     * @return the value of member_bank.create_time
     *
     * @mbggenerated
     */
    public Date getCreateTime() {
        return createTime;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column member_bank.create_time
     *
     * @param createTime the value for member_bank.create_time
     *
     * @mbggenerated
     */
    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column member_bank.update_time
     *
     * @return the value of member_bank.update_time
     *
     * @mbggenerated
     */
    public Date getUpdateTime() {
        return updateTime;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column member_bank.update_time
     *
     * @param updateTime the value for member_bank.update_time
     *
     * @mbggenerated
     */
    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }
}