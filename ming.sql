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

-- 23 June 2023 12:09:54 AM 
CREATE TABLE `mingbackend`.`admins` (
	`id` int AUTO_INCREMENT,
	`adminId` int,
	`adminName` varchar(255),
	`email` varchar(255),
	`password` varchar(255),
	`accessToken` varchar(255),
	`image` varchar(255),
	`privilege` varchar(1000),
	`dateTime` datetime,
	`date` date,
	`status` varchar(255),
	PRIMARY KEY (id)
);

-- 23 June 2023 12:18:55 AM
ALTER TABLE `mingbackend`.`admins`
ADD COLUMN `addedBy` int NULL AFTER `status`;

-- 23 June 2023 12:34:51 AM 
CREATE TABLE `mingbackend`.`categories` (
	`id` int AUTO_INCREMENT,
	`categoryId` int,
	`name` varchar(255),
	`image` varchar(255),
	`dateTime` datetime,
	`date` date,
	`addedBy` int,
	`status` varchar(255),
	PRIMARY KEY (id)
);

-- 23 June 2023 12:41:07 AM 
CREATE TABLE `mingbackend`.`products` (
	`id` int AUTO_INCREMENT,
	`productId` int,
	`categoryId` int,
	`name` varchar(255),
	`description` varchar(255),
	`weight` int,
	`type` varchar(255),
	`price` varchar(255),
	`addedBy` int,
	`dateTime` datetime,
	`date` date,
	`status` varchar(255),
	PRIMARY KEY (id)
);

-- 23 June 2023 12:46:13 AM
ALTER TABLE `mingbackend`.`products`
ADD COLUMN `image` varchar(255) NULL AFTER `status`;

-- 23 June 2023 1:32:21 AM
ALTER TABLE `mingbackend`.`products`
ADD COLUMN `images` varchar(1000) NULL AFTER `image`;

-- 23 June 2023 10:38:08 PM 
-- CREATE TABLE `mingbackend`.`product_purchases` (
-- 	`id` int AUTO_INCREMENT,
-- 	`userId` int,
-- 	`productId` int,
-- 	`purchaseId` int,
-- 	`totalPrice` int,
-- 	`productPrice` int,
-- 	`dateTime` datetime,
-- 	`date` date,
-- 	`quantity` int,
-- 	PRIMARY KEY (id)
-- );
-- Replace this table into Cart 
-- 24-6-2023
CREATE TABLE `mingbackend`.`carts` (
  `id` INT AUTO_INCREMENT,
  `purchaseId` INT NOT NULL,
  `userId` INT NOT NULL,
  `productId` INT NOT NULL,
  `dateTime` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date` DATE NOT NULL DEFAULT (CURDATE()),
  `totalPrice` INT NOT NULL,
  `productPrice` INT NOT NULL,
  `quantity` INT NOT NULL,
  `status` VARCHAR(255) NOT NULL DEFAULT 'active',
  PRIMARY KEY (`id`)
);


-- 23 June 2023 10:43:45 PM 
CREATE TABLE `mingbackend`.`total_purchases` (
	`id` int AUTO_INCREMENT,
	`purchaseId` int,
	`userId` int,
	`price` int,
	`dateTime` datetime,
	`date` date,
	`actionBy` int,
	PRIMARY KEY (id)
);

-- 24 June 2023 3:14:47 PM
ALTER TABLE `mingbackend`.`addresss`
ADD COLUMN `name` varchar(255) NULL AFTER `country`;

-- 24 June 2023 3:34:16 PM
ALTER TABLE `mingbackend`.`addresss`
ADD COLUMN `phoneNumber` varchar(255) NULL AFTER `name`;

-- 24 June 2023 11:25:15 PM 
CREATE TABLE `mingbackend`.`feed_backs` (
	`id` int AUTO_INCREMENT,
	`userName` varchar(255),
	`email` varchar(255),
	`phoneNumber` varchar(255),
	`subject` varchar(255),
	`message` varchar(255),
	`dateTime` datetime,
	`date` date,
	PRIMARY KEY (id)
);

-- 29 June 2023 11:25:18 PM 
CREATE TABLE `mingbackend`.`reviews` (
	`id` int AUTO_INCREMENT,
	`userId` int,
	`name` varchar(255),
	`email` varchar(255),
	`review` varchar(255),
	`star` int,
	`dateTime` datetime,
	`date` date,
	PRIMARY KEY (id)
);