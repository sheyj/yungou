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

create table  brand
(
       Id                VARCHAR(40) not null,
       brand_name        VARCHAR(50) not null,
       brand_code        VARCHAR(20) not null,
       brand_desc        VARCHAR(200),
       creator           VARCHAR(20),
       create_time       DATETIME
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='品牌表';
alter  table brand
       add constraint PK_brand_Id primary key (Id);


create table  category
(
       Id                VARCHAR(40) not null,
       category_name     VARCHAR(50) not null,
       category_code     VARCHAR(20) not null,
       parent_id         VARCHAR(40)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='商品分类表';
alter  table category
       add constraint PK_category_Id primary key (Id);


/*
警告: 字段名可能非法 - status
*/
create table  goods
(
       Id                VARCHAR(40) not null,
       goods_name        VARCHAR(100) not null,
       goods_code        VARCHAR(40) not null,
       category_id       VARCHAR(40) not null,
       brand_id          VARCHAR(40) not null,
       `STATUS`            INTEGER not null,
       goods_desc        VARCHAR(2000),
       creator           VARCHAR(40),
       create_time       DATETIME,
       update_time       DATETIME,
       goods_price       INTEGER,
       limit_times       INTEGER,
       queue_num         INTEGER,
       is_recommend      INTEGER,
       cost_price        NUMERIC,
       queue_no          INTEGER,
       goods_title       VARCHAR(100)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='商品表';
alter  table goods
       add constraint PK_goods_Id primary key (Id);


create table  goods_pic
(
       Id                VARCHAR(40) not null,
       goods_id          VARCHAR(40),
       pic_type          INTEGER,
       pic_url           VARCHAR(200)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='商品图片表';
alter  table goods_pic
       add constraint PK_goods_pic_Id primary key (Id);


/*
警告: 字段名可能非法 - status
*/
create table  member_base
(
       Id                VARCHAR(40) not null,
       mobile_phone      VARCHAR(20),
       member_account    VARCHAR(50),
       member_password   VARCHAR(40),
       member_name       VARCHAR(40),
       member_image      VARCHAR(300),
       member_email      VARCHAR(4000),
       qq_no             VARCHAR(20),
       open_id           VARCHAR(40),
       birthday          DATETIME,
       create_time       DATETIME,
       update_time       DATETIME,
       register_ip       VARCHAR(4000),
       registre_source   VARCHAR(4000),
       STATUS            VARCHAR(4000),
       mobile_validate   INTEGER,
       email_validate    INTEGER,
       remark            VARCHAR(200),
       member_level      VARCHAR(10),
       invite_member_id  VARCHAR(40)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='会员基本信息表';
alter  table member_base
       add constraint PK_member_base_Id primary key (Id);


create table  member_bank
(
       Id                VARCHAR(40) not null,
       member_id         VARCHAR(40),
       integral          INTEGER,
       account_balance   INTEGER,
       create_time       DATETIME,
       update_time       VARCHAR(4000)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='会员资产表';
alter  table member_bank
       add constraint PK_member_bank_Id primary key (Id);


create table  member_bank_detail
(
       Id                VARCHAR(40) not null,
       member_id         VARCHAR(40),
       member_bank_id    VARCHAR(40),
       change_type       INTEGER,
       change_value      INTEGER,
       change_desc       VARCHAR(50),
       create_time       DATETIME
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='会员资产明细表';
alter  table member_bank_detail
       add constraint PK_member_bank_detail_Id primary key (Id);


create table  member_address
(
       Id                VARCHAR(40) not null,
       member_id         VARCHAR(40),
       province_code     VARCHAR(20),
       city_code         VARCHAR(20),
       area_code         VARCHAR(20),
       province_name     VARCHAR(40),
       city_name         VARCHAR(40),
       area_name         VARCHAR(40),
       detail_address    VARCHAR(200),
       postalcode        VARCHAR(10),
       is_default        INTEGER,
       contacts          VARCHAR(20),
       contact_phone     VARCHAR(20),
       create_time       DATETIME
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='会员收货地址表';
alter  table member_address
       add constraint PK_member_address_Id primary key (Id);


create table  home_page_pic
(
       Id                VARCHAR(40) not null,
       pic_name          VARCHAR(50),
       pic_url           VARCHAR(300),
       pic_link          VARCHAR(300),
       sort_value        INTEGER,
       create_time       DATETIME
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='主页轮播图表';
alter  table home_page_pic
       add constraint PK_home_page_pic_Id primary key (Id);


create table  member_share
(
       Id                VARCHAR(40) not null,
       member_id         VARCHAR(40),
       member_account    VARCHAR(50),
       order_id          VARCHAR(40),
       share_title       VARCHAR(100),
       share_desc        VARCHAR(200),
       create_time       DATETIME,
       click_num         INTEGER
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='会员分享表';
alter  table member_share
       add constraint PK_member_share_Id primary key (Id);


create table  member_share_pic
(
       Id                VARCHAR(40) not null,
       member_share_id   VARCHAR(40),
       pic_url           VARCHAR(300),
       sort_value        INTEGER,
       create_time       DATETIME
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='会员分享图片表';
alter  table member_share_pic
       add constraint PK_member_share_pic_Id primary key (Id);


/*
警告: 字段名可能非法 - status
*/
create table  member_circle
(
       Id                VARCHAR(40) not null,
       circle_name       VARCHAR(50),
       circle_desc       VARCHAR(300),
       create_time       DATETIME,
       `STATUS`            INTEGER
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='会员圈子表';
alter  table member_circle
       add constraint PK_member_circle_Id primary key (Id);


create table  circle_topic
(
       Id                VARCHAR(40) not null,
       circle_id         VARCHAR(4000),
       member_id         VARCHAR(40),
       member_account    VARCHAR(50),
       topic_name        VARCHAR(100),
       topic_desc        VARCHAR(300),
       create_time       DATETIME,
       creator           VARCHAR(20),
       good_num          INTEGER
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='圈子主题表';
alter  table circle_topic
       add constraint PK_circle_topic_Id primary key (Id);


create table  topic_reply
(
       Id                VARCHAR(40) not null,
       topic_id          VARCHAR(40),
       reply_desc        VARCHAR(300),
       member_id         VARCHAR(40),
       member_account    VARCHAR(50),
       create_time       DATETIME
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='主题回复表';
alter  table topic_reply
       add constraint PK_topic_reply_Id primary key (Id);


create table  member_level
(
       Id                VARCHAR(40) not null,
       level_name        VARCHAR(50),
       level_pic         VARCHAR(300),
       create_time       DATETIME
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='会员级别表';
alter  table member_level
       add constraint PK_member_level_Id primary key (Id);


create table  activity
(
       Id                VARCHAR(40) not null,
       goods_id          VARCHAR(40),
       goods_name        VARCHAR(200),
       goods_title       VARCHAR(200),
       queue_no          INTEGER,
       create_time       DATETIME,
       end_time          DATETIME,
       goods_price       VARCHAR(4000),
       buy_num           INTEGER,
       total_buy_num     INTEGER,
       prize_no          VARCHAR(20),
       winner_member_id  VARCHAR(40),
       winner_member_account VARCHAR(50),
       winner_draw_num   INTEGER,
       last_order_time   DATETIME
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='活动表';
alter  table activity
       add constraint PK_activity_Id primary key (Id);


/*
警告: 表名可能非法 - order
警告: 字段名可能非法 - status
*/
create table  order_info
(
       Id                VARCHAR(40) not null,
       activity_id       VARCHAR(40),
       create_time       DATETIME,
       member_id         VARCHAR(40),
       member_account    VARCHAR(50),
       draw_num          INTEGER,
       draw_ip           VARCHAR(50),
       draw_source       INTEGER,
       pay_type          INTEGER,
       pay_name          VARCHAR(50),
       pay_desc          VARCHAR(100),
       pay_id            VARCHAR(50),
       pay_time          DATETIME,
       `STATUS`            VARCHAR(4000),
       delivery_status   INTEGER,
       draw_value        INTEGER
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='订单表';
alter  table order_info
       add constraint PK_order_Id primary key (Id);


create table  order_ticket
(
       Id                INTEGER not null,
       order_id          VARCHAR(40),
       ticket_no         VARCHAR(20)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='订单券表';
alter  table order_ticket
       add constraint PK_order_ticket_Id primary key (Id);


create table  activity_result
(
       Id                VARCHAR(40) not null,
       activity_id       VARCHAR(40),
       order_id          VARCHAR(40)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='活动结果表';
alter  table activity_result
       add constraint PK_activity_result_Id primary key (Id);


create table  commission_detail
(
       Id                VARCHAR(40) not null,
       member_id         VARCHAR(40),
       invite_member_id  VARCHAR(40),
       order_id          VARCHAR(40),
       create_time       DATETIME,
       commission_value  NUMERIC,
       commission_id     VARCHAR(40)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='佣金明细表';
alter  table commission_detail
       add constraint PK_commission_detail_Id primary key (Id);


create table  commission
(
       Id                VARCHAR(40) not null,
       member_id         VARCHAR(40),
       total_commission  NUMERIC,
       fetch_commission  NUMERIC,
       create_time       DATETIME
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='佣金表';
alter  table commission
       add constraint PK_commission_Id primary key (Id);


/*
警告: 字段名可能非法 - status
*/
create table  complaint
(
       Id                VARCHAR(40) not null,
       member_id         VARCHAR(40),
       complaint_type    INTEGER,
       user_name         VARCHAR(20),
       mobile_no         VARCHAR(20),
       user_email        VARCHAR(20),
       complaint_desc    VARCHAR(300),
       `STATUS`            VARCHAR(4000),
       deal_result       VARCHAR(300),
       deal_time         DATETIME,
       create_time       DATETIME,
       deal_name         VARCHAR(50)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='投诉建议表';
alter  table complaint
       add constraint PK_complaint_Id primary key (Id);














































