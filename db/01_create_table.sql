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
      `Id`              VARCHAR(40) not null comment '编号 ID',
       `goods_name`      VARCHAR(100) not null comment '商品名称 商品名称',
       `goods_code`      VARCHAR(40) not null comment '商品编码 商品编码',
       `category_id`     VARCHAR(40) not null comment '分类ID 分类ID',
       `brand_id`        VARCHAR(40) not null comment '品牌ID 品牌ID',
       `status`          INT not null comment '状态 状态1上架2下架',
       `goods_desc`      VARCHAR(2000) comment '商品描述 商品描述',
       `creator`         VARCHAR(40) comment '创建人 创建人',
       `create_time`     DATETIME comment '创建时间 创建时间',
       `update_time`     DATETIME comment '修改时间 修改时间',
       `goods_price`     INT comment '商品价格 商品价格',
       `limit_times`     INT comment '限制次数 限制次数',
       `queue_num`       INT comment '总期数 总期数',
       `is_recommend`    INT comment '是否推荐 是否推荐  1是 2否',
       `cost_price`      DOUBLE comment '成本价 成本价',
       `queue_no`        INT comment '当前期号 当前期号',
       `goods_title`     VARCHAR(100) comment '商品标题 商品标题'
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
      `Id`              VARCHAR(40) not null comment 'ID ID',
       `mobile_phone`    VARCHAR(20) comment '移动电话',
       `member_account`  VARCHAR(50) comment '会员账号 ',
       `member_password` VARCHAR(40) comment '会员密码',
       `member_name`     VARCHAR(40) comment '会员名称 ',
       `member_image`    VARCHAR(300) comment '会员头像图片',
       `member_email`    VARCHAR(4000) comment '会员邮箱 ',
       `qq_no`           VARCHAR(20) comment 'QQ号码',
       `open_id`         VARCHAR(40) comment '微信ID',
       `birthday`        DATETIME comment '生日',
       `create_time`     DATETIME comment '创建时间',
       `update_time`     DATETIME comment '修改时间',
       `register_ip`     VARCHAR(4000) comment '注册IP',
       `registre_source` VARCHAR(4000) comment '注册来源',
       `status`          VARCHAR(4000) comment '状态1 正常 2锁定',
       `mobile_validate` INT comment '手机验证 1是 2否',
       `email_validate`  INT comment '邮箱验证1验证2否',
       `remark`          VARCHAR(200) comment '备注',
       `member_level`    VARCHAR(10) comment '会员级别',
       `invite_member_id` VARCHAR(40) comment '邀请人ID'
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='会员基本信息表';
alter  table member_base
       add constraint PK_member_base_Id primary key (Id);


create table  member_bank
(
       `Id`              VARCHAR(40) not null comment '编号',
       `member_id`       VARCHAR(40) comment ' 会员账号ID',
       `integral`        INT comment ' 积分',
       `account_balance` INT comment ' 账号余额',
       `create_time`     DATETIME comment ' 创建时间',
       `update_time`     DATETIME comment ' 修改时间'
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='会员资产表';
alter  table member_bank
       add constraint PK_member_bank_Id primary key (Id);


create table  member_bank_detail
(
      `Id`              VARCHAR(40) not null comment '编号 ID',
       `member_id`       VARCHAR(40) comment '会员ID 会员ID',
       `member_bank_id`  VARCHAR(40) comment '会员财务ID',
       `change_type`     INT comment '变更类型 1 积分  2 账号余额',
       `change_value`    INT comment ' 变化值',
       `change_desc`     VARCHAR(50) comment ' 变更描述',
       `create_time`     DATETIME comment '创建时间'
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='会员资产明细表';
alter  table member_bank_detail
       add constraint PK_member_bank_detail_Id primary key (Id);


create table  member_address
(
       `Id`              VARCHAR(40) not null comment '编号',
       `member_id`       VARCHAR(40) comment '会员ID 会员ID',
       `province_code`   VARCHAR(20) comment '省份代码',
       `city_code`       VARCHAR(20) comment '城市代码 城市代码',
       `area_code`       VARCHAR(20) comment '地区 地区',
       `province_name`   VARCHAR(40) comment '省份名称 省份名称',
       `city_name`       VARCHAR(40) comment '城市名称 城市名称',
       `area_name`       VARCHAR(40) comment '地区名称 地区名称',
       `detail_address`  VARCHAR(200) comment '详细地址 详细地址',
       `postalcode`      VARCHAR(10) comment '邮政编码 邮政编码',
       `is_default`      INT comment '是否默认收货地址 是否默认收货地址  1 是 2 否',
       `contacts`        VARCHAR(20) comment '联系人 联系人',
       `contact_phone`   VARCHAR(20) comment '联系电话 联系电话',
       `create_time`     DATETIME comment '创建时间 创建时间'
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
      `Id`              VARCHAR(40) not null comment '编号',
       `member_id`       VARCHAR(40) comment '会员ID',
       `member_account`  VARCHAR(50) comment '会员账号 会员账号',
       `order_id`        VARCHAR(40) comment '订单ID 订单ID',
       `share_title`     VARCHAR(100) comment '分享标题 分享标题',
       `share_desc`      VARCHAR(200) comment '分享描述 分享描述',
       `create_time`     DATETIME comment '创建时间 创建时间',
       `click_num`       INT comment '点击数量 点击数量'
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
       `Id`              VARCHAR(40) not null comment '编号',
       `circle_id`       VARCHAR(4000) comment '圈子ID',
       `member_id`       VARCHAR(40) comment '会员ID',
       `member_account`  VARCHAR(50) comment '会员账号',
       `topic_name`      VARCHAR(100) comment ' 话题名称',
       `topic_desc`      VARCHAR(300) comment '话题描述',
       `create_time`     DATETIME comment '创建时间',
       `creator`         VARCHAR(20) comment ' 创建人',
       `good_num`        INT comment '赞数量'
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
       `Id`              VARCHAR(40) not null comment '编号',
       `goods_id`        VARCHAR(40) comment '商品ID',
       `goods_name`      VARCHAR(200) comment '商品名称',
       `goods_title`     VARCHAR(200) comment '商品标题',
       `queue_no`        INT comment '期号 ',
       `create_time`     DATETIME comment ' 创建时间',
       `end_time`        DATETIME comment '结结束时间',
       `goods_price`     INT comment '商品价值',
       `buy_num`         INT comment ' 购买人次',
       `total_buy_num`   INT comment '总需购买人次',
       `prize_no`        VARCHAR(20) comment ' 中奖编号',
       `winner_member_id` VARCHAR(40) comment '中奖会员ID',
       `winner_member_account` VARCHAR(50) comment ' 中奖会员账号',
       `winner_draw_num` INT comment '中奖人参与次数',
       `last_order_time` DATETIME comment '最后购买订单时间'
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='活动表';
alter  table activity
       add constraint PK_activity_Id primary key (Id);


/*
警告: 表名可能非法 - order
警告: 字段名可能非法 - status
*/
create table  order_info
(
      `Id`              VARCHAR(40) not null comment '编号',
       `activity_id`     VARCHAR(40) comment ' 活动ID',
       `create_time`     DATETIME comment '创建时间',
       `member_id`       VARCHAR(40) DEFAULT NULL comment ' 会员ID',
       `member_account`  VARCHAR(50) DEFAULT NULL comment ' 会员账号',
       `draw_num`        INT comment '参与人次 ',
       `draw_ip`         VARCHAR(50) DEFAULT NULL comment ' 抽奖IP',
       `draw_source`     INT comment '抽奖来源  1PC 2手机 3 平板',
       `pay_type`        INT comment '支付方式  1积分 2账号余额 3 在线支付',
       `pay_name`        VARCHAR(50)DEFAULT NULL comment ' 支付名称',
       `pay_desc`        VARCHAR(100) DEFAULT NULL comment ' 支付描述',
       `pay_id`          VARCHAR(50) DEFAULT NULL comment ' 支付描述',
       `pay_time`        DATETIME comment '支付时间',
       `status`          INT DEFAULT NULL comment '订单状态 1已中奖 2未中奖',
       `delivery_status` INT DEFAULT NULL comment '发货状态 1 未发货 2已发货',
       `draw_value`      INT DEFAULT NULL comment ' 抽奖时间值'
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='订单表';
alter  table order_info
       add constraint PK_order_Id primary key (Id);


create table  order_ticket
(
       Id                INTEGER not null,
       order_id          VARCHAR(40) DEFAULT NULL,
       ticket_no         VARCHAR(20) DEFAULT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='订单券表';
alter  table order_ticket
       add constraint PK_order_ticket_Id primary key (Id);


create table  activity_result
(
       Id                VARCHAR(40) not null,
       activity_id       VARCHAR(40) DEFAULT NULL,
       order_id          VARCHAR(40) DEFAULT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='活动结果表';
alter  table activity_result
       add constraint PK_activity_result_Id primary key (Id);


create table  commission_detail
(
       `Id`              VARCHAR(40) not null comment '编号',
       `member_id`       VARCHAR(40) DEFAULT NULL comment '会员ID 会员ID',
       `invite_member_id` VARCHAR(40) DEFAULT NULL comment '邀请人ID 邀请人ID',
       `order_id`        VARCHAR(40) DEFAULT NULL comment '订单ID 订单ID',
       `create_time`     DATETIME comment '创建时间 创建时间',
       `commission_value` DOUBLE DEFAULT 0 comment '佣金值 佣金值',
       `commission_id`   VARCHAR(40) comment '佣金ID 佣金ID'
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='佣金明细表';
alter  table commission_detail
       add constraint PK_commission_detail_Id primary key (Id);


create table  commission
(
        `Id`              VARCHAR(40) not null comment '编号',
       `member_id`       VARCHAR(40) DEFAULT NULL comment '会员ID',
       `total_commission` DOUBLE comment '总共获取佣金',
       `fetch_commission` DOUBLE comment '总提取佣金',
       `create_time`     DATETIME comment '创建时间'
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='佣金表';
alter  table commission
       add constraint PK_commission_Id primary key (Id);


/*
警告: 字段名可能非法 - status
*/
create table  complaint
(
       `Id`              VARCHAR(40) not null comment '编号',
       `member_id`       VARCHAR(40) DEFAULT NULL comment '会员ID ',
       `complaint_type`  INT comment '投诉类型  1投诉与建议 2商品配送 3售后服务',
       `user_name`       VARCHAR(20) DEFAULT NULL comment '联系人',
       `mobile_no`       VARCHAR(20) DEFAULT NULL comment '联系电话 ',
       `user_email`      VARCHAR(20) DEFAULT NULL comment '联系邮箱',
       `complaint_desc`  VARCHAR(300) DEFAULT NULL comment '投诉内容 ',
       `status`          INT DEFAULT 1 comment '状态1未处理  2已处理',
       `deal_result`     VARCHAR(300) DEFAULT NULL comment '处理结果',
       `deal_time`       DATETIME comment '处理时间',
       `create_time`     DATETIME comment '创建时间',
       `deal_name`       VARCHAR(50) comment '处理人名称'
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='投诉建议表';
alter  table complaint
       add constraint PK_complaint_Id primary key (Id);














































