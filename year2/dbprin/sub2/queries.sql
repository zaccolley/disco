/*

Queries for Q8
===============

Query 1
--------

+ List all nurses on wards that are in a specific department with some of their details

- Set initial as forename
- Order by surname
- Nice titled columns

*/

CREATE VIEW Nurses AS

SELECT
CONCAT_WS('. ',PERSON_TITLE,SUBSTR(PERSON_FNAME, 1, 1),PERSON_SNAME) AS 'Name',
PERSON_TELEPHONE AS 'Telephone No.',
CONCAT(WARD_NAME,' (',DEPARTMENT_NAME,')') AS 'Ward (Department)'

FROM
Nurse, Person, Staff, Ward, Department

WHERE
Nurse.STAFF_ID = Staff.STAFF_ID AND 
Staff.PERSON_ID = Person.PERSON_ID AND
Nurse.WARD_ID = Ward.WARD_ID AND
Ward.DEPARTMENT_ID = Department.DEPARTMENT_ID AND
Department.DEPARTMENT_ID = 6

ORDER BY PERSON_SNAME DESC;

/*

Query 2
--------

+ Find a list of people with invalid emails in the Queen Mary Hospital

- Set initial as forename
- Set email to uppercase
- Order by email
- Nice titled columns

*/

SELECT
CONCAT_WS('. ',SUBSTR(PERSON_FNAME, 1, 1),PERSON_SNAME) AS 'Name',
-- CONCAT_WS(', ',PERSON_HOUSENONAME, PERSON_STREET, PERSON_TOWNCITY, PERSON_COUNTY) AS Address,
-- DATE_FORMAT(PERSON_DOB, '%D %M %Y (%d/%c/%Y)') AS 'Date of Birth',
UPPER(PERSON_EMAIL) AS 'Email',
HOSPITAL_NAME AS 'Hospital'
FROM
Person, Patient, Ward, Hospital

WHERE
Patient.PERSON_ID = Person.PERSON_ID AND
Patient.WARD_ID = Ward.WARD_ID AND
Ward.HOSPITAL_ID = Hospital.HOSPITAL_ID AND 
Hospital.HOSPITAL_ID = 10 AND
PERSON_EMAIL NOT LIKE '%@%.%'

ORDER BY PERSON_EMAIL ASC;

-- Then a count

SELECT COUNT(P.PERSON_EMAIL) AS 'Amount of Invalid Emails' FROM
(
SELECT PERSON_EMAIL FROM Person, Patient, Ward, Hospital
WHERE
Patient.PERSON_ID = Person.PERSON_ID AND
Patient.WARD_ID = Ward.WARD_ID AND
Ward.HOSPITAL_ID = Hospital.HOSPITAL_ID AND 
Hospital.HOSPITAL_ID = 10 AND
PERSON_EMAIL NOT LIKE '%@%.%'
) P;

