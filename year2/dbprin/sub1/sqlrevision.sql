CREATE DATABASE sqlrevision;
USE sqlrevision;

CREATE TABLE lecturer
(lec_id CHAR(2) PRIMARY KEY,
forename VARCHAR(20) NOT NULL,
surname VARCHAR(20) NOT NULL,
dept VARCHAR(15));

INSERT INTO lecturer VALUES (0, 'Zac', 'Colley', 'Alchemy');
INSERT INTO lecturer VALUES (1, 'Russell', 'Murray', 'Dream Library');
INSERT INTO lecturer VALUES (2, 'Peter', 'Jones', 'Potions');
INSERT INTO lecturer VALUES (3, 'Thomas', 'Henderson', 'Quidditch');

SELECT forename, dept FROM lecturer WHERE forename = 'Thomas';