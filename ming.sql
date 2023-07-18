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

-- 30 June 2023 12:28:31 AM
ALTER TABLE `mingbackend`.`reviews`
ADD COLUMN `productId` int NULL AFTER `date`;


-- 4 July 2023 11:46:01 AM 
CREATE TABLE `mingbackend`.`discounts` (
	`id` int AUTO_INCREMENT,
	`discount_id` int,
	`discount_code` varchar(255),
	`amount` int,
	`start_date` datetime,
	`end_date` datetime,
	`status` varchar(255),
	PRIMARY KEY (id)
);

-- 4 July 2023 12:08:05 PM
ALTER TABLE `mingbackend`.`discounts`
ADD COLUMN `added_by` int NULL AFTER `status`;

CREATE TABLE `mingbackend`.`Cart` (
  `id` INT AUTO_INCREMENT,
  `userId` INT NOT NULL,
  `productId` INT NOT NULL,
  `quantity` INT NOT NULL,
  `dateTime` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `date` date,
  `status` VARCHAR(255) DEFAULT 'active',
  PRIMARY KEY (`id`),
  FOREIGN KEY (`productId`) REFERENCES `Product`(`productId`)
);

--july 4 2023 5:15
CREATE TABLE `mingbackend`.`users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `addressId` int DEFAULT NULL,
  `userName` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `confirmPassword` varchar(255) DEFAULT NULL,
  `phoneNumber` varchar(255) DEFAULT NULL,
  `accessToken` varchar(255) DEFAULT NULL,
  `dateTime` datetime DEFAULT NULL,
  `date` date DEFAULT NULL,
  `lastLoginTime` datetime DEFAULT NULL,
  `status` varchar(255) DEFAULT 'ACTIVE',
  PRIMARY KEY (`id`)
) 
--july 4 2023 5:15
CREATE TABLE `mingbackend`.`addresss` (
  `id` int NOT NULL AUTO_INCREMENT,
  `addressId` int DEFAULT NULL,
  `userId` int DEFAULT NULL,
  `contact` varchar(255) DEFAULT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `phoneNumber` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `apartment` varchar(255) NOT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `pinCode` varchar(255) DEFAULT NULL,
  `dateTime` datetime DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `defaultStatus` varchar(255) DEFAULT 'INACTIVE',
  `status` varchar(255) DEFAULT 'ACTIVE',
  PRIMARY KEY (`id`)
)
--july 4 2023 5:15
CREATE TABLE `mingbackend`.`carts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `productId` int NOT NULL,
  `quantity` int NOT NULL,
  `dateTime` datetime NOT NULL,
  `date` date NOT NULL,
  `status` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) 

-- 8 July 2023 4:00:43 PM
CREATE TABLE `mingbackend`.`tokens` (`id` int AUTO_INCREMENT,`userId` int,`token` varchar(255),`expiresAt` datetime, PRIMARY KEY (id));

-- 8 July 2023 4:47:46 PM
ALTER TABLE `mingbackend`.`users`
ADD COLUMN `verified` boolean NULL AFTER `addressId`;

ALTER TABLE `mingbackend`.`products`
ADD COLUMN `categoryType` VARCHAR(255) COMMENT '' AFTER `images`;