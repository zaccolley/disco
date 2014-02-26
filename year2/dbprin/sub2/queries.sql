
/*

Queries for Q8
===============

Query 1
--------

+ Get list patients current drugs and list any allergies

*/

SELECT
   CONCAT(PERSON_SNAME,', ',PERSON_FNAME) AS 'Name',
   GROUP_CONCAT(CONCAT(DRUG_NAME,' (',PRESCRIPTION_DOSAGE,')') SEPARATOR ', ') AS 'Drugs (Dosage)',
   PATIENT_ALLERGY AS 'Allergy'
   -- issue warning

FROM
   Person As Pe, Patient AS Pa, TreatmentHistory AS TH,
   Treatment AS T, Prescription AS Pr,
   PrescriptionHistory AS PH, Drug AS D 

WHERE
   Pe.PERSON_ID = Pa.PERSON_ID AND
   Pa.PERSON_ID = TH.PERSON_ID AND
   TH.TREATMENT_ID = T.TREATMENT_ID AND
   T.TREATMENT_ID = Pr.TREATMENT_ID AND
   Pr.PRESCRIPTION_ID = PH.PRESCRIPTION_ID AND
   PH.DRUG_ID = D.DRUG_ID

GROUP BY PERSON_FNAME

ORDER BY PATIENT_ALLERGY ASC;


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
   UPPER(PERSON_EMAIL) AS 'Email Address',
   HOSPITAL_NAME AS 'Hospital Name'
FROM
   Person AS Pe, Patient AS Pa, Ward AS W, Hospital AS H

WHERE
   Pa.PERSON_ID = Pe.PERSON_ID AND
   Pa.WARD_ID = W.WARD_ID AND
   W.HOSPITAL_ID = H.HOSPITAL_ID AND 
   H.HOSPITAL_ID = 10 AND
   PERSON_EMAIL NOT LIKE '%@%.%'

ORDER BY PERSON_EMAIL ASC;

/*

Query 3
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
   Nurse AS N, Person AS P, Staff AS S, Ward AS W

WHERE
   N.PERSON_ID = P.PERSON_ID AND
   N.WARD_ID = W.WARD_ID AND
   W.WARD_ID = 6

GROUP BY PERSON_SNAME
ORDER BY PERSON_SNAME DESC;


/*

Query 4
--------

+ Find a list of all patients and their data

- Set initial as forename
- Set email to uppercase
- Nice titled columns

*/

SELECT
   CONCAT_WS('. ',SUBSTR(PERSON_FNAME, 1, 1),PERSON_SNAME) AS 'Name',
   
   CASE PERSON_GENDER
      WHEN 'M' THEN 'Male'
      WHEN 'F' THEN 'Female'
      WHEN 'O' THEN 'Other'
      ELSE 'Unknown'
   END AS 'Gender',
   
   CONCAT_WS(', ',PERSON_HOUSENONAME, PERSON_STREET, PERSON_TOWNCITY, PERSON_COUNTY) AS Address,
   DATE_FORMAT(PERSON_DOB, '%D %M %Y (%d/%c/%Y)') AS 'Date of Birth',
   PERSON_TELEPHONE AS 'Telephone Number',
   UPPER(PERSON_EMAIL) AS 'Email Address',
   HOSPITAL_NAME AS 'Hospital Name'
FROM
   Person AS Pe, Patient AS Pa, Ward AS W, Hospital AS H

WHERE
   Pa.PERSON_ID = Pe.PERSON_ID AND
   Pa.WARD_ID = W.WARD_ID AND
   W.HOSPITAL_ID = H.HOSPITAL_ID 

ORDER BY PERSON_FNAME ASC;
