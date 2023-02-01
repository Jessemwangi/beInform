create database blogger;

use blogger;

CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(225) NOT NULL,
  `description` varchar(4225) NOT NULL,
  `image` varchar(225) DEFAULT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `uid` int NOT NULL,
  `datecreated` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `CatID` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `uid_idx` (`uid`),
  KEY `CatID_idx` (`CatID`),
  CONSTRAINT `CatID` FOREIGN KEY (`CatID`) REFERENCES `category` (`catid`),
  CONSTRAINT `uid` FOREIGN KEY (`uid`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(225) NOT NULL,
  `email` varchar(225) NOT NULL,
  `password` varchar(225) NOT NULL,
  `image` varchar(225) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `category` (
  `catid` int NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(225) NOT NULL,
  PRIMARY KEY (`catid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



 insert into users (`email`,`username`,`password`) 
values ('kips@gmail.com','kips@gmail.com','$2a$10$sC4XvXGl/D1gvPzTEJQTzuJXsQTi/G4DqPOJQ2tKCon9HBXtZFGL6')

insert into category (`name`,`description`) values ( 'Art', 'This is ART');
insert into category (`name`,`description`) values ( 'Science', 'This is Science');
insert into category (`name`,`description`) values ( 'Design', 'This is Design');
insert into category (`name`,`description`) values ( 'Food', 'This is Food Cat');
insert into category (`name`,`description`) values ( 'Technology', 'This is Technology');
insert into category (`name`,`description`) values ( 'Cinema', 'This is Cinema and movies');
