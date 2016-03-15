package com.yungou.o2o.center.manager.model;

import java.io.Serializable;
import java.util.Date;

public class Complaint implements Serializable{
    /**
	 * 
	 */
	private static final long serialVersionUID = 8582398942656773997L;

	/**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column complaint.Id:���
     *
     * @mbggenerated
     */
    private String id;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column complaint.member_id:��ԱID 
     *
     * @mbggenerated
     */
    private String memberId;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column complaint.complaint_type:Ͷ������  1Ͷ���뽨�� 2��Ʒ���� 3�ۺ����
     *
     * @mbggenerated
     */
    private Integer complaintType;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column complaint.user_name:��ϵ��
     *
     * @mbggenerated
     */
    private String userName;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column complaint.mobile_no:��ϵ�绰 
     *
     * @mbggenerated
     */
    private String mobileNo;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column complaint.user_email:��ϵ����
     *
     * @mbggenerated
     */
    private String userEmail;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column complaint.complaint_desc:Ͷ������ 
     *
     * @mbggenerated
     */
    private String complaintDesc;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column complaint.status:״̬1δ����  2�Ѵ���
     *
     * @mbggenerated
     */
    private Integer status;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column complaint.deal_result:������
     *
     * @mbggenerated
     */
    private String dealResult;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column complaint.deal_time:����ʱ��
     *
     * @mbggenerated
     */
    private Date dealTime;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column complaint.create_time:����ʱ��
     *
     * @mbggenerated
     */
    private Date createTime;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column complaint.deal_name:���������
     *
     * @mbggenerated
     */
    private String dealName;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column complaint.Id
     *
     * @return the value of complaint.Id
     *
     * @mbggenerated
     */
    public String getId() {
        return id;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column complaint.Id
     *
     * @param id the value for complaint.Id
     *
     * @mbggenerated
     */
    public void setId(String id) {
        this.id = id == null ? null : id.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column complaint.member_id
     *
     * @return the value of complaint.member_id
     *
     * @mbggenerated
     */
    public String getMemberId() {
        return memberId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column complaint.member_id
     *
     * @param memberId the value for complaint.member_id
     *
     * @mbggenerated
     */
    public void setMemberId(String memberId) {
        this.memberId = memberId == null ? null : memberId.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column complaint.complaint_type
     *
     * @return the value of complaint.complaint_type
     *
     * @mbggenerated
     */
    public Integer getComplaintType() {
        return complaintType;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column complaint.complaint_type
     *
     * @param complaintType the value for complaint.complaint_type
     *
     * @mbggenerated
     */
    public void setComplaintType(Integer complaintType) {
        this.complaintType = complaintType;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column complaint.user_name
     *
     * @return the value of complaint.user_name
     *
     * @mbggenerated
     */
    public String getUserName() {
        return userName;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column complaint.user_name
     *
     * @param userName the value for complaint.user_name
     *
     * @mbggenerated
     */
    public void setUserName(String userName) {
        this.userName = userName == null ? null : userName.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column complaint.mobile_no
     *
     * @return the value of complaint.mobile_no
     *
     * @mbggenerated
     */
    public String getMobileNo() {
        return mobileNo;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column complaint.mobile_no
     *
     * @param mobileNo the value for complaint.mobile_no
     *
     * @mbggenerated
     */
    public void setMobileNo(String mobileNo) {
        this.mobileNo = mobileNo == null ? null : mobileNo.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column complaint.user_email
     *
     * @return the value of complaint.user_email
     *
     * @mbggenerated
     */
    public String getUserEmail() {
        return userEmail;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column complaint.user_email
     *
     * @param userEmail the value for complaint.user_email
     *
     * @mbggenerated
     */
    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail == null ? null : userEmail.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column complaint.complaint_desc
     *
     * @return the value of complaint.complaint_desc
     *
     * @mbggenerated
     */
    public String getComplaintDesc() {
        return complaintDesc;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column complaint.complaint_desc
     *
     * @param complaintDesc the value for complaint.complaint_desc
     *
     * @mbggenerated
     */
    public void setComplaintDesc(String complaintDesc) {
        this.complaintDesc = complaintDesc == null ? null : complaintDesc.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column complaint.status
     *
     * @return the value of complaint.status
     *
     * @mbggenerated
     */
    public Integer getStatus() {
        return status;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column complaint.status
     *
     * @param status the value for complaint.status
     *
     * @mbggenerated
     */
    public void setStatus(Integer status) {
        this.status = status;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column complaint.deal_result
     *
     * @return the value of complaint.deal_result
     *
     * @mbggenerated
     */
    public String getDealResult() {
        return dealResult;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column complaint.deal_result
     *
     * @param dealResult the value for complaint.deal_result
     *
     * @mbggenerated
     */
    public void setDealResult(String dealResult) {
        this.dealResult = dealResult == null ? null : dealResult.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column complaint.deal_time
     *
     * @return the value of complaint.deal_time
     *
     * @mbggenerated
     */
    public Date getDealTime() {
        return dealTime;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column complaint.deal_time
     *
     * @param dealTime the value for complaint.deal_time
     *
     * @mbggenerated
     */
    public void setDealTime(Date dealTime) {
        this.dealTime = dealTime;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column complaint.create_time
     *
     * @return the value of complaint.create_time
     *
     * @mbggenerated
     */
    public Date getCreateTime() {
        return createTime;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column complaint.create_time
     *
     * @param createTime the value for complaint.create_time
     *
     * @mbggenerated
     */
    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column complaint.deal_name
     *
     * @return the value of complaint.deal_name
     *
     * @mbggenerated
     */
    public String getDealName() {
        return dealName;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column complaint.deal_name
     *
     * @param dealName the value for complaint.deal_name
     *
     * @mbggenerated
     */
    public void setDealName(String dealName) {
        this.dealName = dealName == null ? null : dealName.trim();
    }
}