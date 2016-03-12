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
  `code_type` varchar(50) NOT NULL COMMENT '字典类型',
  `code_name` varchar(50) NOT NULL COMMENT '字典KEY',
  `code_value` varchar(50) NOT NULL COMMENT '字典值',
  `status` varchar(255) DEFAULT '1' COMMENT '状态 0 未启用 1启用',
  `remark` varchar(200) DEFAULT NULL COMMENT '备注',
  `sort_value` bigint(20) DEFAULT NULL COMMENT '排序值',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COMMENT='数据字典表';

-- ----------------------------
-- Records of system_dict
-- ----------------------------
INSERT INTO `system_dict` VALUES ('1', 'SYSTEM_PARAM_STATUS', '禁用', '0', '1', null, '2');
INSERT INTO `system_dict` VALUES ('2', 'SYSTEM_PARAM_STATUS', '启用', '1', '1', null, '1');
INSERT INTO `system_dict` VALUES ('3', 'SYSTEM_PARAM_TPYE', 'APP参数', '1', '1', null, '1');
INSERT INTO `system_dict` VALUES ('4', 'SYSTEM_PARAM_TPYE', '后台参数', '2', '1', null, '2');
INSERT INTO `system_dict` VALUES ('5', 'APP_VERSION_TYPE', '不强制更新', '0', '1', null, '1');
INSERT INTO `system_dict` VALUES ('6', 'APP_VERSION_TYPE', '强制更新', '1', '1', null, '2');
INSERT INTO `system_dict` VALUES ('7', 'APP_USER_STATUS', '禁用', '0', '1', null, '1');
INSERT INTO `system_dict` VALUES ('8', 'APP_USER_STATUS', '正常', '1', '1', null, '2');
INSERT INTO `system_dict` VALUES ('9', 'USER_TALK_STATUS', '不可见', '0', '1', null, '1');
INSERT INTO `system_dict` VALUES ('10', 'USER_TALK_STATUS', '可见', '1', '1', null, '2');
INSERT INTO `system_dict` VALUES ('11', 'USER_TALK_TYPE', '所有人', '1', '1', null, '1');
INSERT INTO `system_dict` VALUES ('12', 'USER_TALK_TYPE', '好友', '2', '1', null, '2');
INSERT INTO `system_dict` VALUES ('13', 'TALK_RESPONSE_STATUS', '不可见', '0', '1', null, '1');
INSERT INTO `system_dict` VALUES ('14', 'TALK_RESPONSE_STATUS', '可见', '1', '1', null, '2');

-- ----------------------------
-- Table structure for `system_menu`
-- ----------------------------
DROP TABLE IF EXISTS `system_menu`;
CREATE TABLE `system_menu` (
  `menu_id` varchar(32) NOT NULL COMMENT '菜单ID',
  `menu_name` varchar(50) NOT NULL COMMENT '菜单名称',
  `parent_id` varchar(32) DEFAULT NULL COMMENT '父节点ID',
  `menu_type` smallint(6) DEFAULT NULL COMMENT '菜单类型  0导航 1菜单',
  `menu_url` varchar(255) DEFAULT NULL COMMENT '菜单URL',
  `menu_sort` int(11) DEFAULT NULL COMMENT '排序',
  `menu_flag` smallint(6) DEFAULT NULL COMMENT '菜单标记 0无效 1有效',
  `menu_remark` varchar(200) DEFAULT NULL COMMENT '菜单备注',
  PRIMARY KEY (`menu_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='系统菜单表';

-- ----------------------------
-- Records of system_menu
-- ----------------------------
INSERT INTO `system_menu` VALUES ('1', '应用管理平台', '0', '0', null, '1', '1', '菜单根节点');
INSERT INTO `system_menu` VALUES ('10', '激活用户查询', '4', '1', 'system/app_activate/list', '10', '1', '激活用户查询');
INSERT INTO `system_menu` VALUES ('2', '系统管理', '1', '0', null, '2', '1', '系统管理');
INSERT INTO `system_menu` VALUES ('3', '系统用户管理', '2', '1', 'system/system_user/list', '3', '1', '系统用户管理');
INSERT INTO `system_menu` VALUES ('4', '应用管理', '1', '0', null, '4', '1', '应用管理');
INSERT INTO `system_menu` VALUES ('5', '说说管理', '4', '1', 'system/user_talk/list', '5', '1', '说说管理');
INSERT INTO `system_menu` VALUES ('6', 'APK版本管理', '2', '1', 'system/app_version/list', '6', '1', 'APK版本管理');
INSERT INTO `system_menu` VALUES ('7', '参数管理', '2', '1', 'system/system_param/list', '7', '1', '参数管理');
INSERT INTO `system_menu` VALUES ('8', '用户管理', '4', '1', 'system/app_user/list', '8', '1', '用户管理');
INSERT INTO `system_menu` VALUES ('9', '评论管理', '4', '1', 'system/talk_response/list', '9', '1', '评论管理');

-- ----------------------------
-- Table structure for `system_param`
-- ----------------------------
DROP TABLE IF EXISTS `system_param`;
CREATE TABLE `system_param` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `param_name` varchar(50) NOT NULL COMMENT '参数名称',
  `param_value` varchar(50) NOT NULL COMMENT '参数值',
  `status` smallint(6) DEFAULT '1' COMMENT '状态 0 禁用1 启动',
  `remark` varchar(200) DEFAULT NULL COMMENT '备注',
  `param_type` smallint(6) DEFAULT '1' COMMENT '参数类型，1 APP参数 2后台参数',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='系统参数表';

-- ----------------------------
-- Records of system_param
-- ----------------------------
INSERT INTO `system_param` VALUES ('2', 'ERERWuuu', '12', '1', '1111', '1');

-- ----------------------------
-- Table structure for `system_role`
-- ----------------------------
DROP TABLE IF EXISTS `system_role`;
CREATE TABLE `system_role` (
  `role_id` varchar(32) NOT NULL COMMENT '角色ID',
  `role_name` varchar(50) NOT NULL COMMENT '角色名称',
  `role_remark` varchar(200) DEFAULT NULL COMMENT '角色备注',
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='角色表';

-- ----------------------------
-- Records of system_role
-- ----------------------------
INSERT INTO `system_role` VALUES ('1', '系统管理员', '系统管理员');

-- ----------------------------
-- Table structure for `system_role_menu`
-- ----------------------------
DROP TABLE IF EXISTS `system_role_menu`;
CREATE TABLE `system_role_menu` (
  `role_id` varchar(32) NOT NULL COMMENT '角色ID ',
  `menu_id` varchar(32) NOT NULL COMMENT '菜单ID',
  PRIMARY KEY (`role_id`,`menu_id`),
  CONSTRAINT `role_menu` FOREIGN KEY (`role_id`) REFERENCES `system_role` (`role_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='角色菜单表';

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
  `username` varchar(160) NOT NULL COMMENT '中文姓名',
  `login_name` varchar(200) NOT NULL COMMENT '登陆名',
  `login_password` varchar(200) NOT NULL COMMENT '登陆密码',
  `mobile_phone` varchar(60) DEFAULT NULL COMMENT '手机号码',
  `status` varchar(4) DEFAULT '1' COMMENT '1=正常2=锁定',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '修改时间',
  `remark` varchar(200) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`userid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='系统用户表';

-- ----------------------------
-- Records of system_user
-- ----------------------------
INSERT INTO `system_user` VALUES ('08a694816bc14dff9186c4fafb9fbe2e', 'she840707', 'sheyujun1', 'e10adc3949ba59abbe56e057f20f883e', '123222', '2', '2014-05-20 15:21:20', '2014-05-20 15:29:06', '1111');
INSERT INTO `system_user` VALUES ('5db02080cfce4ddfab66ba32c911b2ba', 'she840707', 'sheyujun', 'e10adc3949ba59abbe56e057f20f883e', '123', '1', null, null, '11111');
INSERT INTO `system_user` VALUES ('888888', 'admin', 'admin', 'e10adc3949ba59abbe56e057f20f883e', null, '1', '2014-05-20 10:18:26', '2014-05-20 10:18:31', '系统管理员');
INSERT INTO `system_user` VALUES ('ae5384a21aef46b990d8c949a73c7a35', 'she840707@163.com', '13213213', 'e10adc3949ba59abbe56e057f20f883e', '12321', '1', '2014-05-20 16:04:44', null, '');

-- ----------------------------
-- Table structure for `system_user_role`
-- ----------------------------
DROP TABLE IF EXISTS `system_user_role`;
CREATE TABLE `system_user_role` (
  `user_id` varchar(32) NOT NULL COMMENT '用户ID ',
  `role_id` varchar(32) NOT NULL COMMENT '角色ID ',
  PRIMARY KEY (`user_id`,`role_id`),
  CONSTRAINT `user_role` FOREIGN KEY (`user_id`) REFERENCES `system_user` (`userid`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户角色关联表';

-- ----------------------------
-- Records of system_user_role
-- ----------------------------
INSERT INTO `system_user_role` VALUES ('888888', '1');



DROP TABLE IF EXISTS `brand`;
CREATE TABLE `brand` (
  `id` varchar(32) NOT NULL COMMENT 'PK',
  `brand_name` varchar(160) NOT NULL COMMENT '品牌名称',
  `brand_code` varchar(50) NOT NULL COMMENT '品牌编码',
  `status` smallint DEFAULT 1 COMMENT '1=正常2=锁定',
  `creator` varchar(50) DEFAULT NULL COMMENT '创建人',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '修改时间',
  `remark` varchar(200) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='品牌表';