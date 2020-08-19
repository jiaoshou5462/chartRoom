/*
Navicat MySQL Data Transfer

Source Server         : 本地
Source Server Version : 50716
Source Host           : localhost:3306
Source Database       : node_sql

Target Server Type    : MYSQL
Target Server Version : 50716
File Encoding         : 65001

Date: 2020-08-19 15:55:24
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for contacts
-- ----------------------------
DROP TABLE IF EXISTS `contacts`;
CREATE TABLE `contacts` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `user_id` int(11) DEFAULT NULL COMMENT 'user表外键，用于查询该用户的联系人',
  `contact_id` int(11) DEFAULT NULL COMMENT '所有联系人id，逗号隔开',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of contacts
-- ----------------------------
INSERT INTO `contacts` VALUES ('3', '7', '8');
INSERT INTO `contacts` VALUES ('4', '8', '7');
INSERT INTO `contacts` VALUES ('11', '15', '7');
INSERT INTO `contacts` VALUES ('12', '7', '15');
INSERT INTO `contacts` VALUES ('13', '8', '15');
INSERT INTO `contacts` VALUES ('14', '15', '8');

-- ----------------------------
-- Table structure for contact_record
-- ----------------------------
DROP TABLE IF EXISTS `contact_record`;
CREATE TABLE `contact_record` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL COMMENT 'chat表外键，用于查询聊天记录',
  `contact_id` int(11) DEFAULT NULL,
  `submit_id` int(11) DEFAULT NULL,
  `content` varchar(1000) DEFAULT NULL,
  `time` varchar(255) DEFAULT NULL,
  `timestamp` bigint(16) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=162 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of contact_record
-- ----------------------------
INSERT INTO `contact_record` VALUES ('155', '7', '15', '7', '1212', '2020/08/19 15:11:35', '1597821095561');
INSERT INTO `contact_record` VALUES ('156', '15', '7', '15', '1212', '2020/08/19 15:11:52', '1597821112600');
INSERT INTO `contact_record` VALUES ('157', '15', '7', '15', '2323', '2020/08/19 15:13:28', '1597821208641');
INSERT INTO `contact_record` VALUES ('158', '7', '15', '7', '2323', '2020/08/19 15:13:34', '1597821214824');
INSERT INTO `contact_record` VALUES ('159', '7', '15', '7', '2323', '2020/08/19 15:26:58', '1597822018463');
INSERT INTO `contact_record` VALUES ('160', '7', '15', '7', '1212', '2020/08/19 15:29:52', '1597822192902');
INSERT INTO `contact_record` VALUES ('161', '15', '7', '15', '1', '2020/08/19 15:29:58', '1597822198541');

-- ----------------------------
-- Table structure for message
-- ----------------------------
DROP TABLE IF EXISTS `message`;
CREATE TABLE `message` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `message` varchar(255) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `add_user_id` int(11) DEFAULT NULL COMMENT '通知发起人id',
  `type` varchar(255) DEFAULT '' COMMENT '通知类型，1：添加联系人，',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of message
-- ----------------------------
INSERT INTO `message` VALUES ('1', '黄一帆1请求加您为好友', '12', '7', '1');

-- ----------------------------
-- Table structure for record
-- ----------------------------
DROP TABLE IF EXISTS `record`;
CREATE TABLE `record` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `content` varchar(1000) DEFAULT NULL,
  `time` varchar(255) DEFAULT NULL,
  `timestamp` bigint(16) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=118 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of record
-- ----------------------------
INSERT INTO `record` VALUES ('20', '7', '1', '2020/08/04 13:55:23', '1596520523463');
INSERT INTO `record` VALUES ('21', '7', '1', '2020/08/04 15:06:49', '1596524809222');
INSERT INTO `record` VALUES ('22', '7', '11', '2020/08/04 15:07:24', '1596524844715');
INSERT INTO `record` VALUES ('23', '7', '1', '2020/08/04 15:07:40', '1596524860795');
INSERT INTO `record` VALUES ('24', '7', '12', '2020/08/04 15:15:33', '1596525333848');
INSERT INTO `record` VALUES ('25', '7', '12', '2020/08/04 15:15:45', '1596525345334');
INSERT INTO `record` VALUES ('26', '7', '12', '2020/08/04 15:17:36', '1596525456312');
INSERT INTO `record` VALUES ('27', '7', '1212', '2020/08/04 16:43:22', '1596530602688');
INSERT INTO `record` VALUES ('28', '15', '1212', '2020/08/04 16:43:26', '1596530606858');
INSERT INTO `record` VALUES ('29', '7', '1', '2020/08/04 16:44:11', '1596530651247');
INSERT INTO `record` VALUES ('30', '15', '2', '2020/08/04 16:44:21', '1596530661055');
INSERT INTO `record` VALUES ('31', '7', '撒大声地', '2020/08/04 16:44:59', '1596530699615');
INSERT INTO `record` VALUES ('32', '7', '撒大声地', '2020/08/04 16:45:00', '1596530700695');
INSERT INTO `record` VALUES ('33', '7', '撒大声地', '2020/08/04 16:45:01', '1596530701591');
INSERT INTO `record` VALUES ('34', '7', '撒大声地', '2020/08/04 16:45:02', '1596530702503');
INSERT INTO `record` VALUES ('35', '7', '撒大声地', '2020/08/04 16:45:03', '1596530703502');
INSERT INTO `record` VALUES ('36', '7', '撒大声地', '2020/08/04 16:45:04', '1596530704431');
INSERT INTO `record` VALUES ('37', '7', '撒大声地', '2020/08/04 16:45:05', '1596530705367');
INSERT INTO `record` VALUES ('38', '7', '撒大声地', '2020/08/04 16:45:06', '1596530706358');
INSERT INTO `record` VALUES ('39', '7', '撒大声地', '2020/08/04 16:45:07', '1596530707272');
INSERT INTO `record` VALUES ('40', '15', '1212', '2020/08/04 16:45:50', '1596530750159');
INSERT INTO `record` VALUES ('41', '15', '1212', '2020/08/04 16:45:52', '1596530752745');
INSERT INTO `record` VALUES ('42', '15', '1212', '2020/08/04 16:45:53', '1596530753624');
INSERT INTO `record` VALUES ('43', '15', '1212', '2020/08/04 16:45:54', '1596530754583');
INSERT INTO `record` VALUES ('44', '15', '1212', '2020/08/04 16:45:55', '1596530755575');
INSERT INTO `record` VALUES ('45', '15', '1212', '2020/08/04 16:45:56', '1596530756480');
INSERT INTO `record` VALUES ('46', '15', '1212', '2020/08/04 16:45:57', '1596530757465');
INSERT INTO `record` VALUES ('47', '7', '1212', '2020/08/04 16:47:11', '1596530831783');
INSERT INTO `record` VALUES ('48', '7', '1212', '2020/08/04 16:47:15', '1596530835631');
INSERT INTO `record` VALUES ('49', '7', '1212', '2020/08/04 16:47:16', '1596530836672');
INSERT INTO `record` VALUES ('50', '7', '1212', '2020/08/04 16:47:17', '1596530837360');
INSERT INTO `record` VALUES ('51', '7', '1212', '2020/08/04 16:47:17', '1596530837967');
INSERT INTO `record` VALUES ('52', '7', '1212', '2020/08/04 16:47:18', '1596530838591');
INSERT INTO `record` VALUES ('53', '7', '1212', '2020/08/04 16:47:19', '1596530839232');
INSERT INTO `record` VALUES ('54', '7', '1212', '2020/08/04 16:47:19', '1596530839825');
INSERT INTO `record` VALUES ('55', '7', '1212', '2020/08/04 16:47:20', '1596530840431');
INSERT INTO `record` VALUES ('56', '7', '1212', '2020/08/04 16:47:22', '1596530842927');
INSERT INTO `record` VALUES ('57', '7', '1212', '2020/08/04 16:47:23', '1596530843583');
INSERT INTO `record` VALUES ('58', '7', '1212', '2020/08/04 16:47:24', '1596530844529');
INSERT INTO `record` VALUES ('59', '7', '是的', '2020/08/04 16:47:26', '1596530846255');
INSERT INTO `record` VALUES ('60', '7', '撒大声地', '2020/08/04 16:47:27', '1596530847154');
INSERT INTO `record` VALUES ('61', '7', '梵蒂冈发个', '2020/08/04 16:47:27', '1596530847952');
INSERT INTO `record` VALUES ('62', '7', '是多少', '2020/08/04 16:47:28', '1596530848911');
INSERT INTO `record` VALUES ('63', '7', '问问', '2020/08/04 16:47:30', '1596530850063');
INSERT INTO `record` VALUES ('64', '7', '分隔符', '2020/08/04 16:47:31', '1596530851040');
INSERT INTO `record` VALUES ('65', '7', '吃是CV ', '2020/08/04 16:47:33', '1596530853680');
INSERT INTO `record` VALUES ('66', '7', '问问', '2020/08/04 16:47:35', '1596530855329');
INSERT INTO `record` VALUES ('67', '7', '刷刷刷', '2020/08/04 16:47:36', '1596530856545');
INSERT INTO `record` VALUES ('68', '7', '对对对', '2020/08/04 16:47:37', '1596530857790');
INSERT INTO `record` VALUES ('69', '7', '搞搞搞', '2020/08/04 16:47:38', '1596530858896');
INSERT INTO `record` VALUES ('70', '7', '加加加', '2020/08/04 16:47:40', '1596530860143');
INSERT INTO `record` VALUES ('71', '7', '嗯嗯嗯', '2020/08/04 16:47:41', '1596530861343');
INSERT INTO `record` VALUES ('72', '7', '加加加', '2020/08/04 16:47:42', '1596530862624');
INSERT INTO `record` VALUES ('73', '7', '不不不', '2020/08/04 16:47:43', '1596530863986');
INSERT INTO `record` VALUES ('74', '7', '加加加', '2020/08/04 16:47:45', '1596530865267');
INSERT INTO `record` VALUES ('75', '7', '咳咳咳', '2020/08/04 16:47:46', '1596530866627');
INSERT INTO `record` VALUES ('76', '7', '嘤嘤嘤', '2020/08/04 16:47:47', '1596530867647');
INSERT INTO `record` VALUES ('77', '7', '擦擦擦', '2020/08/04 16:47:49', '1596530869103');
INSERT INTO `record` VALUES ('78', '15', '带的饭', '2020/08/04 16:47:53', '1596530873975');
INSERT INTO `record` VALUES ('79', '15', '撒大声地', '2020/08/04 16:47:55', '1596530875231');
INSERT INTO `record` VALUES ('80', '15', '撒大声地', '2020/08/04 16:47:56', '1596530876576');
INSERT INTO `record` VALUES ('81', '15', '撒大声地', '2020/08/04 16:47:57', '1596530877610');
INSERT INTO `record` VALUES ('82', '7', '撒大声地', '2020/08/04 16:47:59', '1596530879728');
INSERT INTO `record` VALUES ('83', '7', 'sdsd', '2020/08/04 16:48:00', '1596530880736');
INSERT INTO `record` VALUES ('84', '7', 'sdsd', '2020/08/04 16:48:01', '1596530881712');
INSERT INTO `record` VALUES ('85', '15', '撒大声地', '2020/08/04 16:48:03', '1596530883665');
INSERT INTO `record` VALUES ('86', '15', '撒大声地', '2020/08/04 16:48:04', '1596530884784');
INSERT INTO `record` VALUES ('87', '15', '撒大声地', '2020/08/04 16:48:06', '1596530886448');
INSERT INTO `record` VALUES ('88', '15', '撒大声地', '2020/08/04 16:48:07', '1596530887808');
INSERT INTO `record` VALUES ('89', '15', '是多少', '2020/08/04 16:48:08', '1596530888939');
INSERT INTO `record` VALUES ('90', '7', '是多少', '2020/08/04 16:48:10', '1596530890743');
INSERT INTO `record` VALUES ('91', '7', '是多少', '2020/08/04 16:48:11', '1596530891903');
INSERT INTO `record` VALUES ('92', '7', '是多少', '2020/08/04 16:48:14', '1596530894264');
INSERT INTO `record` VALUES ('93', '7', '是的', '2020/08/04 16:48:15', '1596530895471');
INSERT INTO `record` VALUES ('94', '15', '撒大声地', '2020/08/04 16:48:17', '1596530897655');
INSERT INTO `record` VALUES ('95', '7', '是多少', '2020/08/04 16:48:19', '1596530899490');
INSERT INTO `record` VALUES ('96', '7', '1212', '2020/08/04 16:54:42', '1596531282034');
INSERT INTO `record` VALUES ('97', '7', '1212', '2020/08/04 16:55:07', '1596531307010');
INSERT INTO `record` VALUES ('98', '15', '啊啊啊', '2020/08/04 16:56:12', '1596531372460');
INSERT INTO `record` VALUES ('99', '8', '嗨咯今天早上几点来的黄风顺', '2020/08/18 10:21:54', '1597717314454');
INSERT INTO `record` VALUES ('100', '7', '啥', '2020/08/18 11:03:45', '1597719825331');
INSERT INTO `record` VALUES ('101', '15', '啊', '2020/08/18 14:31:02', '1597732262810');
INSERT INTO `record` VALUES ('102', '7', '1', '2020/08/18 17:16:33', '1597742193549');
INSERT INTO `record` VALUES ('103', '7', '2323', '2020/08/19 10:18:40', '1597803520576');
INSERT INTO `record` VALUES ('104', '7', '232', '2020/08/19 10:18:41', '1597803521856');
INSERT INTO `record` VALUES ('105', '7', '1', '2020/08/19 10:21:39', '1597803699339');
INSERT INTO `record` VALUES ('106', '7', '111 23', '2020/08/19 10:31:23', '1597804283514');
INSERT INTO `record` VALUES ('107', '7', '2323 23', '2020/08/19 10:31:32', '1597804292880');
INSERT INTO `record` VALUES ('108', '7', '2323', '2020/08/19 10:31:39', '1597804299512');
INSERT INTO `record` VALUES ('109', '7', '11', '2020/08/19 10:32:54', '1597804374626');
INSERT INTO `record` VALUES ('110', '7', '231 123', '2020/08/19 10:34:29', '1597804469002');
INSERT INTO `record` VALUES ('111', '7', '343', '2020/08/19 10:37:05', '1597804625378');
INSERT INTO `record` VALUES ('112', '7', '233', '2020/08/19 10:37:39', '1597804659545');
INSERT INTO `record` VALUES ('113', '7', '3434', '2020/08/19 10:40:04', '1597804804186');
INSERT INTO `record` VALUES ('114', '7', '343', '2020/08/19 10:49:46', '1597805386876');
INSERT INTO `record` VALUES ('115', '15', '2323', '2020/08/19 14:16:05', '1597817765011');
INSERT INTO `record` VALUES ('116', '8', '33\n', '2020/08/19 14:30:52', '1597818652800');
INSERT INTO `record` VALUES ('117', '8', '哈哈', '2020/08/19 14:35:33', '1597818933359');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT '',
  `password` varchar(255) DEFAULT '',
  `account` varchar(255) NOT NULL DEFAULT '',
  `face` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`,`account`),
  UNIQUE KEY `user_account` (`account`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('7', '黄一帆1', '1212', '1212', '1595831389200userID7.jpg');
INSERT INTO `user` VALUES ('8', '彭于晏的女朋友', '123456', 'ningmin', '1595831564358userID8.jpg');
INSERT INTO `user` VALUES ('10', 'hello', '123456', 'hubin', null);
INSERT INTO `user` VALUES ('11', '123', 'aaa', 'aaa', null);
INSERT INTO `user` VALUES ('12', 'zwd', '123456', 'zhangweidong', null);
INSERT INTO `user` VALUES ('13', 'aaa', '1223', 'huangzizhen', null);
INSERT INTO `user` VALUES ('14', 'sdsd', '3434', '3434', null);
INSERT INTO `user` VALUES ('15', '黄风顺', '2323', '2323', '1596530562822userID15.png');
