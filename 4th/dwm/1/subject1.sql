SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema dwm
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema dwm
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `dwm` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `dwm` ;

-- -----------------------------------------------------
-- Table `dwm`.`DVLA`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `dwm`.`DVLA` ;

CREATE TABLE IF NOT EXISTS `dwm`.`DVLA` (
  `DVLAID` INT NOT NULL,
  `DVLATaxExpires` DATETIME NULL,
  `DVLAMOTExpires` DATETIME NULL,
  `DVLADateRegistered` DATETIME NULL,
  `DVLASORNStatus` TINYINT(1) NULL,
  `DVLAColour` VARCHAR(45) NULL,
  `DVLAEngineSize` VARCHAR(45) NULL,
  `DVLAYearOfManufacture` DATETIME NULL,
  PRIMARY KEY (`DVLAID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dwm`.`Vehicle`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `dwm`.`Vehicle` ;

CREATE TABLE IF NOT EXISTS `dwm`.`Vehicle` (
  `VehicleID` INT NOT NULL,
  `NumberPlate` VARCHAR(45) NULL,
  `VehicleDescription` VARCHAR(255) NULL,
  `DVLAID` INT NOT NULL,
  PRIMARY KEY (`VehicleID`),
  INDEX `fk_Vehicle_DVLA1_idx` (`DVLAID` ASC),
  CONSTRAINT `fk_Vehicle_DVLA1`
    FOREIGN KEY (`DVLAID`)
    REFERENCES `dwm`.`DVLA` (`DVLAID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dwm`.`Time`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `dwm`.`Time` ;

CREATE TABLE IF NOT EXISTS `dwm`.`Time` (
  `TimeID` INT NOT NULL,
  `TimeWeek` DATETIME NULL,
  `TimeDay` DATETIME NULL,
  `TimeClockTime` DATETIME NULL,
  PRIMARY KEY (`TimeID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dwm`.`Owner`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `dwm`.`Owner` ;

CREATE TABLE IF NOT EXISTS `dwm`.`Owner` (
  `OwnerID` INT NOT NULL,
  `OwnerCompany` TINYINT(1) NULL,
  `OwnerDetails` VARCHAR(45) NULL,
  PRIMARY KEY (`OwnerID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dwm`.`LocalAuthority`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `dwm`.`LocalAuthority` ;

CREATE TABLE IF NOT EXISTS `dwm`.`LocalAuthority` (
  `LocalAuthorityID` INT NOT NULL,
  `LocalAuthorityName` VARCHAR(45) NULL,
  `LocalAuthorityPhone` VARCHAR(45) NULL,
  `LocalAuthorityLocation` VARCHAR(45) NULL,
  PRIMARY KEY (`LocalAuthorityID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dwm`.`StationRegion`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `dwm`.`StationRegion` ;

CREATE TABLE IF NOT EXISTS `dwm`.`StationRegion` (
  `StationRegionID` INT NOT NULL,
  `StationRegionName` VARCHAR(45) NULL,
  PRIMARY KEY (`StationRegionID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dwm`.`StationCIty`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `dwm`.`StationCIty` ;

CREATE TABLE IF NOT EXISTS `dwm`.`StationCIty` (
  `StationCityID` INT NOT NULL,
  `StationCityName` VARCHAR(255) NULL,
  `StationRegionID` INT NOT NULL,
  PRIMARY KEY (`StationCityID`),
  INDEX `fk_StationCIty_Region1_idx` (`StationRegionID` ASC),
  CONSTRAINT `fk_StationCIty_Region1`
    FOREIGN KEY (`StationRegionID`)
    REFERENCES `dwm`.`StationRegion` (`StationRegionID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dwm`.`Station`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `dwm`.`Station` ;

CREATE TABLE IF NOT EXISTS `dwm`.`Station` (
  `StationID` INT NOT NULL,
  `StationDescription` VARCHAR(255) NULL,
  `StationPoliceChief` VARCHAR(45) NULL,
  `StationCityID` INT NOT NULL,
  PRIMARY KEY (`StationID`),
  INDEX `fk_Station_StationLocation1_idx` (`StationCityID` ASC),
  CONSTRAINT `fk_Station_StationLocation1`
    FOREIGN KEY (`StationCityID`)
    REFERENCES `dwm`.`StationCIty` (`StationCityID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dwm`.`Reason`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `dwm`.`Reason` ;

CREATE TABLE IF NOT EXISTS `dwm`.`Reason` (
  `ReasonID` INT NOT NULL,
  `ReasonDescription` VARCHAR(45) NULL,
  `ReasonPlaceSeized` VARCHAR(45) NULL,
  `ReasonClaimInstruction` VARCHAR(45) NULL,
  `ReasonNoClaimConsequence` VARCHAR(45) NULL,
  `ReasonPower` VARCHAR(45) NULL,
  PRIMARY KEY (`ReasonID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dwm`.`SeizureNotice`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `dwm`.`SeizureNotice` ;

CREATE TABLE IF NOT EXISTS `dwm`.`SeizureNotice` (
  `SeizureNoticeID` INT NOT NULL,
  `VehicleID` INT NOT NULL,
  `TimeID` INT NOT NULL,
  `OwnerID` INT NOT NULL,
  `LocalAuthorityID` INT NOT NULL,
  `StationID` INT NOT NULL,
  `ReasonID` INT NOT NULL,
  PRIMARY KEY (`SeizureNoticeID`),
  INDEX `IX_FK_SeizedVehicles_Vehicle` (`VehicleID` ASC),
  INDEX `IX_FK_SeizedVehicles_Time` (`TimeID` ASC),
  INDEX `IX_FK_SeizedVehicles_Place` (`OwnerID` ASC),
  INDEX `IX_FK_SeizedVehicles_LocalAuthority` (`LocalAuthorityID` ASC),
  INDEX `IX_FK_SeizedVehicles_Station` (`StationID` ASC),
  INDEX `fk_SeizedVehicles_Reason1_idx` (`ReasonID` ASC),
  CONSTRAINT `FK_SeizedVehicles_Vehicle`
    FOREIGN KEY (`VehicleID`)
    REFERENCES `dwm`.`Vehicle` (`VehicleID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_SeizedVehicles_Time`
    FOREIGN KEY (`TimeID`)
    REFERENCES `dwm`.`Time` (`TimeID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_SeizedVehicles_Place`
    FOREIGN KEY (`OwnerID`)
    REFERENCES `dwm`.`Owner` (`OwnerID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_SeizedVehicles_LocalAuthority`
    FOREIGN KEY (`LocalAuthorityID`)
    REFERENCES `dwm`.`LocalAuthority` (`LocalAuthorityID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_SeizedVehicles_Station`
    FOREIGN KEY (`StationID`)
    REFERENCES `dwm`.`Station` (`StationID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_SeizedVehicles_Reason1`
    FOREIGN KEY (`ReasonID`)
    REFERENCES `dwm`.`Reason` (`ReasonID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
