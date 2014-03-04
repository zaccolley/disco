
/*

Queries for Q8
===============

Query 1
--------

+ List all nurses on ward N1 (5) with some of their details. This could be used by head nurses for scheduling.

   - Put it in a view
   - Use initial of forename
   - Order by surname in descending order
   - Have department type in brackets next to the ward
   - Nice titled columns

*/

CREATE VIEW Nurses AS

SELECT
   CONCAT_WS('. ',PERSON_TITLE,SUBSTR(PERSON_FNAME, 1, 1),PERSON_SNAME) AS 'Name',
   PERSON_TELEPHONE AS 'Telephone No.',
   CONCAT(WARD_NAME,' (',DEPARTMENT_NAME,')') AS 'Ward (Department)'

FROM
   Nurse N
   JOIN Person P ON N.PERSON_ID = P.PERSON_ID
   JOIN Ward W ON  N.WARD_ID = W.WARD_ID

WHERE
   W.WARD_ID = 6

GROUP BY PERSON_SNAME
ORDER BY PERSON_SNAME DESC;


/*

Query 2
--------

+ Find a list of people with invalid emails in the Queen Alexandra Hospital, to be used by admins to know who won’t receive emails and send them an automatic SMS to ask them to provide a correct email

   - Set initial as forename
   - Set email to uppercase
   - Use LIKE statement to match invalid emails
   - Order by email
   - Nice titled columns

*/

SELECT
   CONCAT_WS('. ',SUBSTR(PERSON_FNAME, 1, 1),PERSON_SNAME) AS 'Name',
   UPPER(PERSON_EMAIL) AS 'Email Address',
   PERSON_TELEPHONE AS 'Telephone Number'
FROM
   Person Pe
   JOIN Patient Pa ON Pa.PERSON_ID = Pe.PERSON_ID
   JOIN Ward W ON Pa.WARD_ID = W.WARD_ID
   JOIN Hospital H ON  W.HOSPITAL_ID = H.HOSPITAL_ID

WHERE 
   H.HOSPITAL_ID = 10 AND
   PERSON_EMAIL NOT LIKE '%@%.%'

ORDER BY PERSON_EMAIL ASC;

/*

Query 3
--------

+ Get list patients current drugs, their allergies and display any warnings if they are assigned a drug that they are allergic too. Could be used by nurses administering drugs.

   - Group all their drugs together
   - Display 'None' if they don't have an allergy
   - Display a personal message should they have a warning

*/

SELECT
   CONCAT(PERSON_SNAME,', ',PERSON_FNAME) AS 'Name',
   GROUP_CONCAT(CONCAT(DRUG_NAME,' (',PRESCRIPTION_DOSAGE,')') SEPARATOR ', ') AS 'Drugs (Dosage)',
   
   IFNULL(PATIENT_ALLERGY, 'None') AS 'Drug Allergy',

   CASE PATIENT_ALLERGY
      WHEN DRUG_NAME THEN CONCAT('Take "', PERSON_SNAME, '"" off "', DRUG_NAME, '"" immediately.')
      ELSE 'No warning'
   END AS '(Warning)'

FROM
   Person Pe
   JOIN Patient Pa ON Pe.PERSON_ID = Pa.PERSON_ID
   JOIN TreatmentHistory TH ON Pa.PERSON_ID = TH.PERSON_ID
   JOIN Treatment T ON TH.TREATMENT_ID = T.TREATMENT_ID 
   JOIN Prescription Pr ON T.TREATMENT_ID = Pr.TREATMENT_ID
   JOIN PrescriptionHistory PH ON Pr.PRESCRIPTION_ID = PH.PRESCRIPTION_ID
   JOIN Drug D ON PH.DRUG_ID = D.DRUG_ID

GROUP BY PERSON_FNAME

ORDER BY PATIENT_ALLERGY ASC;

/*

Query 4
--------

+ Find a list of all patients and their personal data
   
   - Set initial as forename
   - Set email to uppercase
   - Convert M, F, O char to the equivalent gender title
   - Format date of birth nicely
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
   Person Pe
   JOIN Patient Pa ON Pa.PERSON_ID = Pe.PERSON_ID
   JOIN Ward W ON  Pa.WARD_ID = W.WARD_ID
   JOIN Hospital H ON W.HOSPITAL_ID = H.HOSPITAL_ID 

ORDER BY PERSON_FNAME ASC;
