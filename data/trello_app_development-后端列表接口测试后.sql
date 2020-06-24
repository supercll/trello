/*
 Navicat Premium Data Transfer

 Source Server         : 我的数据库
 Source Server Type    : MySQL
 Source Server Version : 80019
 Source Host           : localhost
 Source Database       : trello_app_development

 Target Server Type    : MySQL
 Target Server Version : 80019
 File Encoding         : utf-8

 Date: 03/16/2020 15:34:00 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `Attachment`
-- ----------------------------
DROP TABLE IF EXISTS `Attachment`;
CREATE TABLE `Attachment` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `userId` int unsigned NOT NULL,
  `originName` varchar(255) NOT NULL DEFAULT '',
  `name` varchar(255) NOT NULL DEFAULT '',
  `type` varchar(50) NOT NULL,
  `size` int unsigned NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
--  Records of `Attachment`
-- ----------------------------
BEGIN;
INSERT INTO `Attachment` VALUES ('1', '1', 'originName-1', 'attachment-1', 'image/png', '10000', '2020-03-14 16:02:21', '2020-03-14 16:02:21'), ('2', '1', 'originName-2', 'attachment-2', 'image/png', '10000', '2020-03-14 16:02:21', '2020-03-14 16:02:21'), ('3', '2', 'originName-3', 'attachment-3', 'image/gif', '10000', '2020-03-14 16:02:21', '2020-03-14 16:02:21'), ('4', '2', 'originName-4', 'attachment-4', 'image/jpeg', '10000', '2020-03-14 16:02:21', '2020-03-14 16:02:21'), ('5', '1', 'originName-5', 'attachment-5', 'image/git', '10000', '2020-03-14 16:02:21', '2020-03-14 16:02:21'), ('6', '2', 'originName-6', 'attachment-6', 'image/png', '10000', '2020-03-14 16:02:21', '2020-03-14 16:02:21'), ('7', '1', 'originName-7', 'attachment-7', 'image/png', '10000', '2020-03-14 16:02:21', '2020-03-14 16:02:21'), ('8', '3', 'originName-8', 'attachment-8', 'image/png', '10000', '2020-03-14 16:02:21', '2020-03-14 16:02:21'), ('9', '2', 'originName-9', 'attachment-9', 'image/png', '10000', '2020-03-14 16:02:21', '2020-03-14 16:02:21'), ('10', '3', 'originName-10', 'attachment-10', 'image/png', '10000', '2020-03-14 16:02:21', '2020-03-14 16:02:21');
COMMIT;

-- ----------------------------
--  Table structure for `Board`
-- ----------------------------
DROP TABLE IF EXISTS `Board`;
CREATE TABLE `Board` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `userId` int unsigned NOT NULL,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
--  Records of `Board`
-- ----------------------------
BEGIN;
INSERT INTO `Board` VALUES ('1', '1', 'eos voluptatem rerum', '2020-03-14 16:02:21', '2020-03-14 16:04:03'), ('2', '1', 'board-2', '2020-03-14 16:02:21', '2020-03-14 16:02:21'), ('3', '2', 'board-3', '2020-03-14 16:02:21', '2020-03-14 16:02:21'), ('4', '2', 'board-4', '2020-03-14 16:02:21', '2020-03-14 16:02:21'), ('5', '1', 'board-5', '2020-03-14 16:02:21', '2020-03-14 16:02:21'), ('6', '2', 'board-6', '2020-03-14 16:02:21', '2020-03-14 16:02:21'), ('7', '1', 'board-7', '2020-03-14 16:02:21', '2020-03-14 16:02:21'), ('8', '3', 'board-8', '2020-03-14 16:02:21', '2020-03-14 16:02:21'), ('9', '2', 'board-9', '2020-03-14 16:02:21', '2020-03-14 16:02:21'), ('10', '3', 'board-10', '2020-03-14 16:02:21', '2020-03-14 16:02:21'), ('11', '1', 'corrupti ut consequatur', '2020-03-14 16:02:58', '2020-03-14 16:02:58'), ('13', '1', 'et suscipit veniam', '2020-03-14 16:03:59', '2020-03-14 16:03:59'), ('15', '1', 'est quam a', '2020-03-14 16:04:01', '2020-03-14 16:04:01'), ('17', '1', 'dolorem et distinctio', '2020-03-14 16:04:03', '2020-03-14 16:04:03'), ('23', '1', 'abc', '2020-03-15 21:23:34', '2020-03-15 21:23:34'), ('24', '1', 'bbbb', '2020-03-15 21:23:55', '2020-03-15 21:23:55'), ('25', '1', 'cccc', '2020-03-15 21:24:00', '2020-03-15 21:24:00');
COMMIT;

-- ----------------------------
--  Table structure for `BoardList`
-- ----------------------------
DROP TABLE IF EXISTS `BoardList`;
CREATE TABLE `BoardList` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `userId` int unsigned NOT NULL,
  `boardId` int unsigned NOT NULL,
  `name` varchar(255) NOT NULL,
  `order` float NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
--  Records of `BoardList`
-- ----------------------------
BEGIN;
INSERT INTO `BoardList` VALUES ('1', '1', '1', 'omnis non eius', '632', '2020-03-14 16:02:21', '2020-03-16 15:33:10'), ('2', '1', '1', 'board-list-2', '131072', '2020-03-14 16:02:21', '2020-03-14 16:02:21'), ('3', '1', '2', 'board-list-3', '196608', '2020-03-14 16:02:21', '2020-03-14 16:02:21'), ('4', '2', '3', 'board-list-4', '262144', '2020-03-14 16:02:21', '2020-03-14 16:02:21'), ('5', '2', '4', 'board-list-5', '327680', '2020-03-14 16:02:21', '2020-03-14 16:02:21'), ('6', '1', '5', 'board-list-6', '393216', '2020-03-14 16:02:21', '2020-03-14 16:02:21'), ('7', '2', '6', 'board-list-7', '458752', '2020-03-14 16:02:21', '2020-03-14 16:02:21'), ('8', '1', '7', 'board-list-8', '524288', '2020-03-14 16:02:21', '2020-03-14 16:02:21'), ('9', '2', '3', 'board-list-9', '589824', '2020-03-14 16:02:21', '2020-03-14 16:02:21'), ('10', '1', '2', 'board-list-10', '655360', '2020-03-14 16:02:21', '2020-03-14 16:02:21'), ('11', '1', '1', 'maiores in sit', '65535', '2020-03-16 15:32:56', '2020-03-16 15:32:56');
COMMIT;

-- ----------------------------
--  Table structure for `BoardListCard`
-- ----------------------------
DROP TABLE IF EXISTS `BoardListCard`;
CREATE TABLE `BoardListCard` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `userId` int unsigned NOT NULL,
  `boardListId` int unsigned NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(2000) NOT NULL DEFAULT '',
  `order` float NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
--  Records of `BoardListCard`
-- ----------------------------
BEGIN;
INSERT INTO `BoardListCard` VALUES ('1', '1', '1', 'board-list-card-1', 'board-list-card-content-1', '65536', '2020-03-14 16:02:21', '2020-03-14 16:02:21'), ('2', '1', '2', 'board-list-card-2', 'board-list-card-content-2', '131072', '2020-03-14 16:02:21', '2020-03-14 16:02:21'), ('3', '1', '2', 'board-list-card-3', 'board-list-card-content-3', '196608', '2020-03-14 16:02:21', '2020-03-14 16:02:21'), ('4', '1', '3', 'board-list-card-4', 'board-list-card-content-4', '262144', '2020-03-14 16:02:21', '2020-03-14 16:02:21'), ('5', '2', '4', 'board-list-card-5', 'board-list-card-content-5', '327680', '2020-03-14 16:02:21', '2020-03-14 16:02:21'), ('6', '1', '2', 'board-list-card-6', 'board-list-card-content-6', '393216', '2020-03-14 16:02:21', '2020-03-14 16:02:21'), ('7', '2', '5', 'board-list-card-7', 'board-list-card-content-7', '458752', '2020-03-14 16:02:21', '2020-03-14 16:02:21'), ('8', '2', '5', 'board-list-card-8', 'board-list-card-content-8', '524288', '2020-03-14 16:02:21', '2020-03-14 16:02:21'), ('9', '2', '7', 'board-list-card-9', 'board-list-card-content-9', '589824', '2020-03-14 16:02:21', '2020-03-14 16:02:21'), ('10', '1', '10', 'board-list-card-10', 'board-list-card-content-10', '655360', '2020-03-14 16:02:21', '2020-03-14 16:02:21');
COMMIT;

-- ----------------------------
--  Table structure for `CardAttachment`
-- ----------------------------
DROP TABLE IF EXISTS `CardAttachment`;
CREATE TABLE `CardAttachment` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `userId` int unsigned NOT NULL,
  `boardListCardId` int unsigned NOT NULL,
  `attachmentId` int unsigned NOT NULL,
  `isCover` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
--  Records of `CardAttachment`
-- ----------------------------
BEGIN;
INSERT INTO `CardAttachment` VALUES ('1', '1', '1', '1', '1', '2020-03-14 16:02:21', '2020-03-14 16:02:21'), ('2', '1', '2', '2', '1', '2020-03-14 16:02:21', '2020-03-14 16:02:21'), ('3', '2', '3', '3', '1', '2020-03-14 16:02:21', '2020-03-14 16:02:21'), ('4', '2', '4', '4', '1', '2020-03-14 16:02:21', '2020-03-14 16:02:21'), ('5', '1', '5', '5', '1', '2020-03-14 16:02:21', '2020-03-14 16:02:21'), ('6', '2', '3', '6', '0', '2020-03-14 16:02:21', '2020-03-14 16:02:21'), ('7', '1', '2', '7', '0', '2020-03-14 16:02:21', '2020-03-14 16:02:21'), ('8', '3', '5', '8', '0', '2020-03-14 16:02:21', '2020-03-14 16:02:21'), ('9', '2', '7', '9', '1', '2020-03-14 16:02:21', '2020-03-14 16:02:21'), ('10', '3', '2', '10', '0', '2020-03-14 16:02:21', '2020-03-14 16:02:21');
COMMIT;

-- ----------------------------
--  Table structure for `Comment`
-- ----------------------------
DROP TABLE IF EXISTS `Comment`;
CREATE TABLE `Comment` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `userId` int unsigned NOT NULL,
  `boardListCardId` int unsigned NOT NULL,
  `content` varchar(2000) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
--  Records of `Comment`
-- ----------------------------
BEGIN;
INSERT INTO `Comment` VALUES ('1', '1', '1', 'comment-content-1', '2020-03-14 16:02:21', '2020-03-14 16:02:21'), ('2', '1', '1', 'comment-content-2', '2020-03-14 16:02:21', '2020-03-14 16:02:21'), ('3', '2', '1', 'comment-content-3', '2020-03-14 16:02:21', '2020-03-14 16:02:21'), ('4', '2', '2', 'comment-content-4', '2020-03-14 16:02:21', '2020-03-14 16:02:21'), ('5', '1', '1', 'comment-content-5', '2020-03-14 16:02:21', '2020-03-14 16:02:21'), ('6', '2', '2', 'comment-content-6', '2020-03-14 16:02:21', '2020-03-14 16:02:21'), ('7', '1', '3', 'comment-content-7', '2020-03-14 16:02:21', '2020-03-14 16:02:21'), ('8', '3', '6', 'comment-content-8', '2020-03-14 16:02:21', '2020-03-14 16:02:21'), ('9', '2', '6', 'comment-content-9', '2020-03-14 16:02:21', '2020-03-14 16:02:21'), ('10', '3', '6', 'comment-content-10', '2020-03-14 16:02:21', '2020-03-14 16:02:21');
COMMIT;

-- ----------------------------
--  Table structure for `SequelizeMeta`
-- ----------------------------
DROP TABLE IF EXISTS `SequelizeMeta`;
CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
--  Records of `SequelizeMeta`
-- ----------------------------
BEGIN;
INSERT INTO `SequelizeMeta` VALUES ('initAttachment.js'), ('initBoard.js'), ('initBoardList.js'), ('initBoardListCard.js'), ('initCardAttachment.js'), ('initComment.js'), ('initUser.js');
COMMIT;

-- ----------------------------
--  Table structure for `User`
-- ----------------------------
DROP TABLE IF EXISTS `User`;
CREATE TABLE `User` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `password` varchar(32) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
--  Records of `User`
-- ----------------------------
BEGIN;
INSERT INTO `User` VALUES ('1', 'zMouse', 'e10adc3949ba59abbe56e057f20f883e', '2020-03-14 16:02:21', '2020-03-14 16:02:21'), ('2', 'mt', 'e10adc3949ba59abbe56e057f20f883e', '2020-03-14 16:02:21', '2020-03-14 16:02:21'), ('3', 'leo', 'e10adc3949ba59abbe56e057f20f883e', '2020-03-14 16:02:21', '2020-03-14 16:02:21'), ('4', 'reci', 'e10adc3949ba59abbe56e057f20f883e', '2020-03-14 16:02:21', '2020-03-14 16:02:21');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
