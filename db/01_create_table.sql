/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50535
Source Host           : localhost:3306
Source Database       : app

Target Server Type    : MYSQL
Target Server Version : 50535
File Encoding         : 65001

Date: 2016-03-09 17:35:42
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `system_dict`
-- ----------------------------
DROP TABLE IF EXISTS `system_dict`;
CREATE TABLE `system_dict` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID ',
  `code_type` varchar(50) NOT NULL COMMENT '�ֵ�����',
  `code_name` varchar(50) NOT NULL COMMENT '�ֵ�KEY',
  `code_value` varchar(50) NOT NULL COMMENT '�ֵ�ֵ',
  `status` varchar(255) DEFAULT '1' COMMENT '״̬ 0 δ���� 1����',
  `remark` varchar(200) DEFAULT NULL COMMENT '��ע',
  `sort_value` bigint(20) DEFAULT NULL COMMENT '����ֵ',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COMMENT='�����ֵ��';

-- ----------------------------
-- Records of system_dict
-- ----------------------------
INSERT INTO `system_dict` VALUES ('1', 'SYSTEM_PARAM_STATUS', '����', '0', '1', null, '2');
INSERT INTO `system_dict` VALUES ('2', 'SYSTEM_PARAM_STATUS', '����', '1', '1', null, '1');
INSERT INTO `system_dict` VALUES ('3', 'SYSTEM_PARAM_TPYE', 'APP����', '1', '1', null, '1');
INSERT INTO `system_dict` VALUES ('4', 'SYSTEM_PARAM_TPYE', '��̨����', '2', '1', null, '2');
INSERT INTO `system_dict` VALUES ('5', 'APP_VERSION_TYPE', '��ǿ�Ƹ���', '0', '1', null, '1');
INSERT INTO `system_dict` VALUES ('6', 'APP_VERSION_TYPE', 'ǿ�Ƹ���', '1', '1', null, '2');
INSERT INTO `system_dict` VALUES ('7', 'APP_USER_STATUS', '����', '0', '1', null, '1');
INSERT INTO `system_dict` VALUES ('8', 'APP_USER_STATUS', '����', '1', '1', null, '2');
INSERT INTO `system_dict` VALUES ('9', 'USER_TALK_STATUS', '���ɼ�', '0', '1', null, '1');
INSERT INTO `system_dict` VALUES ('10', 'USER_TALK_STATUS', '�ɼ�', '1', '1', null, '2');
INSERT INTO `system_dict` VALUES ('11', 'USER_TALK_TYPE', '������', '1', '1', null, '1');
INSERT INTO `system_dict` VALUES ('12', 'USER_TALK_TYPE', '����', '2', '1', null, '2');
INSERT INTO `system_dict` VALUES ('13', 'TALK_RESPONSE_STATUS', '���ɼ�', '0', '1', null, '1');
INSERT INTO `system_dict` VALUES ('14', 'TALK_RESPONSE_STATUS', '�ɼ�', '1', '1', null, '2');

-- ----------------------------
-- Table structure for `system_menu`
-- ----------------------------
DROP TABLE IF EXISTS `system_menu`;
CREATE TABLE `system_menu` (
  `menu_id` varchar(32) NOT NULL COMMENT '�˵�ID',
  `menu_name` varchar(50) NOT NULL COMMENT '�˵�����',
  `parent_id` varchar(32) DEFAULT NULL COMMENT '���ڵ�ID',
  `menu_type` smallint(6) DEFAULT NULL COMMENT '�˵�����  0���� 1�˵�',
  `menu_url` varchar(255) DEFAULT NULL COMMENT '�˵�URL',
  `menu_sort` int(11) DEFAULT NULL COMMENT '����',
  `menu_flag` smallint(6) DEFAULT NULL COMMENT '�˵���� 0��Ч 1��Ч',
  `menu_remark` varchar(200) DEFAULT NULL COMMENT '�˵���ע',
  PRIMARY KEY (`menu_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='ϵͳ�˵���';

-- ----------------------------
-- Records of system_menu
-- ----------------------------
INSERT INTO `system_menu` VALUES ('1', 'Ӧ�ù���ƽ̨', '0', '0', null, '1', '1', '�˵����ڵ�');
INSERT INTO `system_menu` VALUES ('10', '�����û���ѯ', '4', '1', 'system/app_activate/list', '10', '1', '�����û���ѯ');
INSERT INTO `system_menu` VALUES ('2', 'ϵͳ����', '1', '0', null, '2', '1', 'ϵͳ����');
INSERT INTO `system_menu` VALUES ('3', 'ϵͳ�û�����', '2', '1', 'system/system_user/list', '3', '1', 'ϵͳ�û�����');
INSERT INTO `system_menu` VALUES ('4', 'Ӧ�ù���', '1', '0', null, '4', '1', 'Ӧ�ù���');
INSERT INTO `system_menu` VALUES ('5', '˵˵����', '4', '1', 'system/user_talk/list', '5', '1', '˵˵����');
INSERT INTO `system_menu` VALUES ('6', 'APK�汾����', '2', '1', 'system/app_version/list', '6', '1', 'APK�汾����');
INSERT INTO `system_menu` VALUES ('7', '��������', '2', '1', 'system/system_param/list', '7', '1', '��������');
INSERT INTO `system_menu` VALUES ('8', '�û�����', '4', '1', 'system/app_user/list', '8', '1', '�û�����');
INSERT INTO `system_menu` VALUES ('9', '���۹���', '4', '1', 'system/talk_response/list', '9', '1', '���۹���');

-- ----------------------------
-- Table structure for `system_param`
-- ----------------------------
DROP TABLE IF EXISTS `system_param`;
CREATE TABLE `system_param` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `param_name` varchar(50) NOT NULL COMMENT '��������',
  `param_value` varchar(50) NOT NULL COMMENT '����ֵ',
  `status` smallint(6) DEFAULT '1' COMMENT '״̬ 0 ����1 ����',
  `remark` varchar(200) DEFAULT NULL COMMENT '��ע',
  `param_type` smallint(6) DEFAULT '1' COMMENT '�������ͣ�1 APP���� 2��̨����',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='ϵͳ������';

-- ----------------------------
-- Records of system_param
-- ----------------------------
INSERT INTO `system_param` VALUES ('2', 'ERERWuuu', '12', '1', '1111', '1');

-- ----------------------------
-- Table structure for `system_role`
-- ----------------------------
DROP TABLE IF EXISTS `system_role`;
CREATE TABLE `system_role` (
  `role_id` varchar(32) NOT NULL COMMENT '��ɫID',
  `role_name` varchar(50) NOT NULL COMMENT '��ɫ����',
  `role_remark` varchar(200) DEFAULT NULL COMMENT '��ɫ��ע',
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='��ɫ��';

-- ----------------------------
-- Records of system_role
-- ----------------------------
INSERT INTO `system_role` VALUES ('1', 'ϵͳ����Ա', 'ϵͳ����Ա');

-- ----------------------------
-- Table structure for `system_role_menu`
-- ----------------------------
DROP TABLE IF EXISTS `system_role_menu`;
CREATE TABLE `system_role_menu` (
  `role_id` varchar(32) NOT NULL COMMENT '��ɫID ',
  `menu_id` varchar(32) NOT NULL COMMENT '�˵�ID',
  PRIMARY KEY (`role_id`,`menu_id`),
  CONSTRAINT `role_menu` FOREIGN KEY (`role_id`) REFERENCES `system_role` (`role_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='��ɫ�˵���';

-- ----------------------------
-- Records of system_role_menu
-- ----------------------------
INSERT INTO `system_role_menu` VALUES ('1', '1');
INSERT INTO `system_role_menu` VALUES ('1', '10');
INSERT INTO `system_role_menu` VALUES ('1', '2');
INSERT INTO `system_role_menu` VALUES ('1', '3');
INSERT INTO `system_role_menu` VALUES ('1', '4');
INSERT INTO `system_role_menu` VALUES ('1', '5');
INSERT INTO `system_role_menu` VALUES ('1', '6');
INSERT INTO `system_role_menu` VALUES ('1', '7');
INSERT INTO `system_role_menu` VALUES ('1', '8');
INSERT INTO `system_role_menu` VALUES ('1', '9');

-- ----------------------------
-- Table structure for `system_user`
-- ----------------------------
DROP TABLE IF EXISTS `system_user`;
CREATE TABLE `system_user` (
  `userid` varchar(32) NOT NULL COMMENT 'PK',
  `username` varchar(160) NOT NULL COMMENT '��������',
  `login_name` varchar(200) NOT NULL COMMENT '��½��',
  `login_password` varchar(200) NOT NULL COMMENT '��½����',
  `mobile_phone` varchar(60) DEFAULT NULL COMMENT '�ֻ�����',
  `status` varchar(4) DEFAULT '1' COMMENT '1=����2=����',
  `create_time` datetime DEFAULT NULL COMMENT '����ʱ��',
  `update_time` datetime DEFAULT NULL COMMENT '�޸�ʱ��',
  `remark` varchar(200) DEFAULT NULL COMMENT '��ע',
  PRIMARY KEY (`userid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='ϵͳ�û���';

-- ----------------------------
-- Records of system_user
-- ----------------------------
INSERT INTO `system_user` VALUES ('08a694816bc14dff9186c4fafb9fbe2e', 'she840707', 'sheyujun1', 'e10adc3949ba59abbe56e057f20f883e', '123222', '2', '2014-05-20 15:21:20', '2014-05-20 15:29:06', '1111');
INSERT INTO `system_user` VALUES ('5db02080cfce4ddfab66ba32c911b2ba', 'she840707', 'sheyujun', 'e10adc3949ba59abbe56e057f20f883e', '123', '1', null, null, '11111');
INSERT INTO `system_user` VALUES ('888888', 'admin', 'admin', 'e10adc3949ba59abbe56e057f20f883e', null, '1', '2014-05-20 10:18:26', '2014-05-20 10:18:31', 'ϵͳ����Ա');
INSERT INTO `system_user` VALUES ('ae5384a21aef46b990d8c949a73c7a35', 'she840707@163.com', '13213213', 'e10adc3949ba59abbe56e057f20f883e', '12321', '1', '2014-05-20 16:04:44', null, '');

-- ----------------------------
-- Table structure for `system_user_role`
-- ----------------------------
DROP TABLE IF EXISTS `system_user_role`;
CREATE TABLE `system_user_role` (
  `user_id` varchar(32) NOT NULL COMMENT '�û�ID ',
  `role_id` varchar(32) NOT NULL COMMENT '��ɫID ',
  PRIMARY KEY (`user_id`,`role_id`),
  CONSTRAINT `user_role` FOREIGN KEY (`user_id`) REFERENCES `system_user` (`userid`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='�û���ɫ������';

-- ----------------------------
-- Records of system_user_role
-- ----------------------------
INSERT INTO `system_user_role` VALUES ('888888', '1');



DROP TABLE IF EXISTS `brand`;
CREATE TABLE `brand` (
  `id` varchar(32) NOT NULL COMMENT 'PK',
  `brand_name` varchar(160) NOT NULL COMMENT 'Ʒ������',
  `brand_code` varchar(50) NOT NULL COMMENT 'Ʒ�Ʊ���',
  `status` smallint DEFAULT 1 COMMENT '1=����2=����',
  `creator` varchar(50) DEFAULT NULL COMMENT '������',
  `create_time` datetime DEFAULT NULL COMMENT '����ʱ��',
  `update_time` datetime DEFAULT NULL COMMENT '�޸�ʱ��',
  `remark` varchar(200) DEFAULT NULL COMMENT '��ע',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Ʒ�Ʊ�';