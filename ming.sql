-- 22 June 2023 6:07:08 PM 
CREATE TABLE `mingbackend`.`users` (
	`id` int AUTO_INCREMENT,
	`userId` int,
	`userName` varchar(255),
	`firstName` varchar(255),
	`lastName` varchar(255),
	`email` varchar(255),
	`password` varchar(255),
	`phoneNumber` varchar(255),
	`dateTime` datetime,
	`date` date,
	`status` varchar(255),
	`lastLoginTime` datetime,
	PRIMARY KEY (id)
);

-- 22 June 2023 6:11:45 PM 
CREATE TABLE `mingbackend`.`addresss` (
	`id` int AUTO_INCREMENT,
	`addressId` int,
	`userId` int,
	`address` varchar(255),
	`apartment` varchar(255),
	`city` varchar(255),
	`state` varchar(255),
	`pinCode` int,
	`dateTime` datetime,
	`date` date,
	`defaultStatus` varchar(255),
	`status` varchar(255),
	PRIMARY KEY (id)
);

-- 22 June 2023 6:39:04 PM
ALTER TABLE `mingbackend`.`users`
ADD COLUMN `confirmPassword` varchar(255) NULL AFTER `lastLoginTime`;

-- 22 June 2023 6:56:20 PM
ALTER TABLE `mingbackend`.`users`
ADD COLUMN `accessToken` varchar(255) NULL AFTER `confirmPassword`;

-- 22 June 2023 7:36:09 PM
ALTER TABLE `mingbackend`.`addresss`
ADD COLUMN `country` varchar(255) NULL AFTER `status`;

-- 22 June 2023 7:20:38 PM
ALTER TABLE `mingbackend`.`addresss`
CHANGE `defaultStatus` `defaultStatus` boolean NULL;

-- 22 June 2023 7:21:39 PM
ALTER TABLE `mingbackend`.`addresss`
DROP COLUMN `defaultStatus`,
ADD COLUMN `defaultStatus` boolean NULL AFTER `country`;

-- 22 June 2023 7:55:37 PM
ALTER TABLE `mingbackend`.`addresss`
CHANGE `defaultStatus` `defaultStatus` varchar(255) NULL;

-- 22 June 2023 8:39:26 PM
ALTER TABLE `mingbackend`.`users`
ADD COLUMN `addressId` int NULL AFTER `accessToken`;