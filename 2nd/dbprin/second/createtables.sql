/* Database reset and creation */

DROP DATABASE DBPRIN;
CREATE DATABASE DBPRIN;
USE DBPRIN;

CREATE TABLE Hospital (
	HOSPITAL_ID INT NOT NULL,
	HOSPITAL_NAME VARCHAR(30),
	HOSPITAL_STREET VARCHAR(30),
	HOSPITAL_TOWNCITY VARCHAR(20),
	HOSPITAL_COUNTY VARCHAR(20),
	PRIMARY KEY (HOSPITAL_ID)
);

CREATE TABLE Ward (
	WARD_ID INT NOT NULL,
	HOSPITAL_ID INT NOT NULL,
	WARD_NAME VARCHAR(30) NOT NULL,
	DEPARTMENT_NAME VARCHAR(20),
	PRIMARY KEY(WARD_ID),
	FOREIGN KEY (HOSPITAL_ID) REFERENCES Hospital(HOSPITAL_ID)
);

CREATE TABLE Equipment (
	EQUIPMENT_ID INT NOT NULL,
	EQUIPMENT_NAME VARCHAR(20) NOT NULL,
	WARD_ID INT NOT NULL,
	PRIMARY KEY (EQUIPMENT_ID),
	FOREIGN KEY (WARD_ID) REFERENCES Ward(WARD_ID)
);

CREATE TABLE Bed (
	BED_ID INT NOT NULL,
	WARD_ID INT,
	PRIMARY KEY (BED_ID),
	FOREIGN KEY (WARD_ID) REFERENCES Ward(WARD_ID)
);

CREATE TABLE Person (
	PERSON_ID INT NOT NULL,
	PERSON_TITLE VARCHAR(20),
	PERSON_FNAME VARCHAR(20) NOT NULL,
	PERSON_SNAME VARCHAR(20) NOT NULL,
	PERSON_GENDER CHAR NOT NULL,
	PERSON_DOB DATE NOT NULL,
	PERSON_HOUSENONAME VARCHAR(20) NOT NULL,
	PERSON_STREET VARCHAR(20) NOT NULL,
	PERSON_TOWNCITY VARCHAR(20) NOT NULL,
	PERSON_COUNTY VARCHAR(20),
	PERSON_TELEPHONE VARCHAR(13),
	PERSON_EMAIL VARCHAR(20),
	PRIMARY KEY (PERSON_ID)
);

CREATE TABLE Team(
	TEAM_ID INT NOT NULL,
	TEAM_NAME VARCHAR(30),
	PRIMARY KEY (TEAM_ID)
);

CREATE TABLE Staff (
	PERSON_ID INT NOT NULL,
	TEAM_ID INT,
	PRIMARY KEY (PERSON_ID),
	FOREIGN KEY (PERSON_ID) REFERENCES Person(PERSON_ID),
	FOREIGN KEY (TEAM_ID) REFERENCES Team(TEAM_ID)
);

CREATE TABLE Nurse (
	PERSON_ID INT NOT NULL,
	WARD_ID INT NOT NULL,
	PRIMARY KEY (PERSON_ID),
	FOREIGN KEY (WARD_ID) REFERENCES Ward(WARD_ID)
);

CREATE TABLE Consultant (
	PERSON_ID INT NOT NULL,
	WARD_ID INT NOT NULL,
	SPECIALISM_NAME VARCHAR(20) NOT NULL,
	PRIMARY KEY (PERSON_ID),
	FOREIGN KEY (WARD_ID) REFERENCES Ward(WARD_ID)
);

CREATE TABLE JuniorDoctor (
	PERSON_ID INT NOT NULL,	
	SPECIALISM_NAME VARCHAR(20) NOT NULL,
	PRIMARY KEY (PERSON_ID)
);

CREATE TABLE Patient (
	PERSON_ID INT NOT NULL,
	WARD_ID INT NOT NULL,
	BED_ID INT,
	TEAM_ID INT,
	PATIENT_ALLERGY VARCHAR(40),
	FOREIGN KEY (PERSON_ID) REFERENCES Person(PERSON_ID),
	FOREIGN KEY (WARD_ID) REFERENCES Ward(WARD_ID),
	FOREIGN KEY (BED_ID) REFERENCES Bed(BED_ID),
	FOREIGN KEY (TEAM_ID) REFERENCES Team(TEAM_ID)
);

CREATE TABLE Treatment (
	TREATMENT_ID INT NOT NULL,
	TREATMENT_NAME VARCHAR(30) NOT NULL,
	PRIMARY KEY (TREATMENT_ID)
);

CREATE TABLE Prescription (
	PRESCRIPTION_ID INT NOT NULL,
	TREATMENT_ID INT NOT NULL,
	TEAM_ID INT NOT NULL,
	PRIMARY KEY (PRESCRIPTION_ID),
	FOREIGN KEY (TREATMENT_ID) REFERENCES Treatment(TREATMENT_ID),
	FOREIGN KEY (TEAM_ID) REFERENCES Team(TEAM_ID)
);

CREATE TABLE TreatmentHistory (
	TREATMENT_ID INT NOT NULL,
	PERSON_ID INT NOT NULL,
	TREATMENTHISTORY_DATE DATETIME NOT NULL,
	PRIMARY KEY (TREATMENT_ID, PERSON_ID),
	FOREIGN KEY (TREATMENT_ID) REFERENCES Treatment(TREATMENT_ID),
	FOREIGN KEY (PERSON_ID) REFERENCES Patient(PERSON_ID)
);

CREATE TABLE Drug (
	DRUG_ID INT NOT NULL,
	DRUG_NAME VARCHAR(50) NOT NULL,
	DRUG_AMOUNT INT,
	PRIMARY KEY (DRUG_ID)
);

CREATE TABLE PrescriptionHistory (
	PRESCRIPTION_ID INT NOT NULL,
	DRUG_ID INT NOT NULL,
	PRESCRIPTIONHISTORY_DATE DATETIME NOT NULL,
	PRESCRIPTION_DOSAGE VARCHAR(50),
	PRIMARY KEY (PRESCRIPTION_ID, DRUG_ID),
	FOREIGN KEY (PRESCRIPTION_ID) REFERENCES Prescription(PRESCRIPTION_ID),
	FOREIGN KEY (DRUG_ID) REFERENCES Drug(DRUG_ID)
);