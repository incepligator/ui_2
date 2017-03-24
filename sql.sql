
DROP SCHEMA `sql9165055`;
CREATE SCHEMA `sql9165055` ;

#creating class table
CREATE TABLE `sql9165055`.`classtbl` (
  `classid` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NOT NULL,
  `active` INT NOT NULL,
  PRIMARY KEY (`classid`),
  UNIQUE INDEX `classid_UNIQUE` (`classid` ASC));

#inserting information for classtable
INSERT INTO `sql9165055`.`classtbl` (`title`, `active`) VALUES ('Java', '1');
INSERT INTO `sql9165055`.`classtbl` (`title`, `active`) VALUES ('.NET', '1');
INSERT INTO `sql9165055`.`classtbl` (`title`, `active`) VALUES ('VMWare', '1');
INSERT INTO `sql9165055`.`classtbl` (`title`, `active`) VALUES ('Angular', '1');
INSERT INTO `sql9165055`.`classtbl` (`title`, `active`) VALUES ('linux', '0');

#creating sql9165055 table
CREATE TABLE `sql9165055`.`workstatustbl` (
  `workstatusid` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NOT NULL,
  `active` INT NOT NULL,
  PRIMARY KEY (`workstatusid`),
  UNIQUE INDEX `workstatusid_UNIQUE` (`workstatusid` ASC));
  
#inserting information table
INSERT INTO `sql9165055`.`workstatustbl` (`title`, `active`) VALUES ('US Citizen', '1');
INSERT INTO `sql9165055`.`workstatustbl` (`title`, `active`) VALUES ('Green Card', '1');
INSERT INTO `sql9165055`.`workstatustbl` (`title`, `active`) VALUES ('EAD (GC)', '1');
INSERT INTO `sql9165055`.`workstatustbl` (`title`, `active`) VALUES ('Work Permit', '1');
INSERT INTO `sql9165055`.`workstatustbl` (`title`, `active`) VALUES ('EAD(TPS)', '1');
INSERT INTO `sql9165055`.`workstatustbl` (`title`, `active`) VALUES ('EAD(OPT)', '1');
INSERT INTO `sql9165055`.`workstatustbl` (`title`, `active`) VALUES ('EAD(CPT)', '1');

CREATE TABLE `sql9165055`.`consultanttbl` (
  `consultantid` INT NOT NULL AUTO_INCREMENT,
  `firsrname` VARCHAR(20) NOT NULL,
  `lastname` VARCHAR(20) NOT NULL,
  `middlename` VARCHAR(15) NULL,
  `phone` VARCHAR(20) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `address` VARCHAR(45) NULL,
  `city` VARCHAR(45) NULL,
  `state` VARCHAR(45) NULL,
  `zip` VARCHAR(45) NULL,
  `dob` DATETIME NULL,
  `ssn` VARCHAR(11) NULL,
  `workstatusid` INT NULL,
  `driverlicense` VARCHAR(45) NULL,
  `issuedstate` VARCHAR(2) NULL,
  `trainingprogram` INT NULL,
  PRIMARY KEY (`consultantid`),
  UNIQUE INDEX `consultantid_UNIQUE` (`consultantid` ASC),
  INDEX `workstatusid_idx` (`workstatusid` ASC),
  INDEX `trainingid_idx` (`trainingprogram` ASC),
  CONSTRAINT `workstatusid`
    FOREIGN KEY (`workstatusid`)
    REFERENCES `sql9165055`.`workstatustbl` (`workstatusid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `trainingid`
    FOREIGN KEY (`trainingprogram`)
    REFERENCES `sql9165055`.`classtbl` (`classid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

INSERT INTO `sql9165055`.`consultanttbl` (`firsrname`, `lastname`, `phone`, `email`, `address`, `city`, `state`, `zip`, `ssn`, `workstatusid`, `driverlicense`, `issuedstate`, `trainingprogram`) VALUES ('George', 'Harrison', '123-123-1233', 'george@gmail.com', 'test street', 'abby', 'MN', '21230', '123-12-1233', '1', '123', 'MN', '1');

INSERT INTO `sql9165055`.`consultanttbl` (`firsrname`, `lastname`, `middlename`, `phone`, `email`, `address`, `city`, `state`, `zip`, `ssn`, `workstatusid`) VALUES ('Donald', 'Trump', 'dumbass', '123-123-1233', 'trump@gmail.com', 'wall street', 'New York', 'NY', '12312', '123-12-1234', '7');