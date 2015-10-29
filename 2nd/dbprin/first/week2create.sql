/*  
  Creates Accommodation Office tables  */

/* DROP EXISTING TABLES ,IF ANY */

DROP TABLE Course CASCADE CONSTRAINTS;
DROP TABLE AdvisorOfStudies CASCADE CONSTRAINTS;
DROP TABLE Student CASCADE CONSTRAINTS;
DROP TABLE NextOfKin CASCADE CONSTRAINTS;

/* CREATE THE TABLES */
CREATE TABLE Course(
    courseNo INTEGER,
    courseTitle VARCHAR(20) NOT NULL,
    courseLeader VARCHAR(20) NOT NULL,
    leadersExtnNo VARCHAR(4),
    leadersOfficeNo VARCHAR(10) NOT NULL,
    department VARCHAR(20) NOT NULL,
    CONSTRAINT pCourse PRIMARY KEY(courseNo)
);

CREATE TABLE AdvisorOfStudies(
    advisorNo INTEGER,
    fName VARCHAR(20) NOT NULL,
    lName VARCHAR(20) NOT NULL,
    position VARCHAR(15) NOT NULL,
    nameOfDepartment VARCHAR(20) NOT NULL,
    extno VARCHAR(4) NOT NULL,
    officeNo VARCHAR(10) NOT NULL,   
    CONSTRAINT pAdvisorOfStudies PRIMARY KEY(advisorNo)
);

CREATE TABLE Student(
    studentid INTEGER,
    fName VARCHAR(20) NOT NULL,
    lName VARCHAR(20) NOT NULL,
    homeAddress1 VARCHAR(20) NOT NULL,
    homeCity VARCHAR(20) NOT NULL,
    homePostCode VARCHAR(8) NOT NULL,
    dob DATE NOT NULL,
    sex CHAR NOT NULL,
    courseNo INTEGER NOT NULL,
    advisorNo INTEGER NOT NULL,
    CONSTRAINT pStudent PRIMARY KEY(studentid),
    CONSTRAINT cSex1 CHECK (LOWER(sex) IN ('m','f')),
    CONSTRAINT fStudent1 FOREIGN KEY(courseNo) REFERENCES Course(courseNo),
    CONSTRAINT fStudent2 FOREIGN KEY(advisorNo) REFERENCES AdvisorOfStudies(advisorNo)
);

CREATE TABLE NextOfKin(
    studentid INTEGER,
    name VARCHAR(20) NOT NULL,           
    address1 VARCHAR(20) NOT NULL,
    city VARCHAR(20) NOT NULL,
    postcode VARCHAR(8) NOT NULL,
    contactTelNo VARCHAR(11) NOT NULL,
    CONSTRAINT pNextOfKin PRIMARY KEY(studentid),
    CONSTRAINT fStudent3 FOREIGN KEY(studentid) REFERENCES Student(studentid)
);