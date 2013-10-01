-- POPULATE THE RELATIONS with some test data 
-- Course relation*/

INSERT INTO Course VALUES 
(1000,'Software Engineering','Rupert Lennox','3421', 'BT3.2','Computing');
INSERT INTO Course VALUES
(1001,'Internet Systems','Simon Roach','3255','BT1.4','Computing');

-- AdvisorOfStudies relation
INSERT INTO AdvisorOfStudies VALUES
(2000,'Sue','Allen','Senior Lecturer','Computing','2199','BK1.15');
INSERT INTO AdvisorOfStudies VALUES
(2001,'Andy','Bates','Lecturer','Computing','2975','BK1.09');
INSERT INTO AdvisorOfStudies VALUES
(2002,'Patrick','Philips','Senior Lecturer','Computing','3922','BT0.05');


INSERT INTO Student VALUES
(3000,'Angela','Harris','32 St Nevilles Way','Bradford','BR26 4SB','1985-09-12','f',1000,2001);
INSERT INTO Student VALUES
(3001,'Alan','peterSon','47 Grenville Gardens','Exeter','EX29 5FA','1986-01-01','m',1001,2000);
INSERT INTO Student VALUES
(3002,'Jenifer','Jackson','19 Denby Road','Liverpool','LP21 4QA','1984-10-19','f',1000,2001);
INSERT INTO Student VALUES
(3003,'alice','Wong','45 Dreary Crescent','Bolton','BT20 1SA','1985-05-04','f',1000,2001);
INSERT INTO Student VALUES
(3004,'Darren','Peters','4 Solent Way','Southampton','S022 4SA','1984-10-12','m',1001,2000);
INSERT INTO Student VALUES
(3005,'SuSan','WrighT','143 GreenHill Road','Portsmouth','PO21 4SA','1983-01-01','f',1000,2000);
INSERT INTO Student VALUES
(3006,'Jim','Laker','29 Digby Road','Plymouth','PY21 3QA','1984-10-19','m',1001,2001);
INSERT INTO Student VALUES
(3007,'Peter','Smythe','7 Sunny Crescent','Bolton','BT20 1SA','1985-05-04','m',1001,2001);
INSERT INTO Student VALUES
(3008,'Adrian','Peterson','4 Shefield Way','Southampton','S023 4SC','1984-11-15','m',1001,2000);
INSERT INTO Student VALUES
(3009,'Susan','Kemp','123 GreenHill Road','portsmouth','PO21 4SA','1984-06-28','f',1000,2001);
INSERT INTO Student VALUES
(3010,'Tony','FieldS','21 Portsea Avenue','Portsmouth','PO22 3QA','1984-09-12','m',1001,2001);
INSERT INTO Student VALUES
(3011,'Samantha','ellis','7 Woodbury Way','Portsmouth','PO20 1SA','1985-05-17','f',1001,2001);



-- NextOfKin relation 
INSERT INTO NextOfKin VALUES
(3000,'Martha Harris','32 St Nevilles Way','Bradford','BR26 4SB','01653278266');
INSERT INTO NextOfKin VALUES
(3001,'David Peterson','47 Grenville Gardens','Exeter','EX29 5FA','01793527829');
INSERT INTO NextOfKin VALUES
(3002,'Davina Jackson','19 Denby Road','Liverpool','LP21 4QA','01966789342');
INSERT INTO NextOfKin VALUES
(3003,'Arnold Wallace','36 Acasia Avenue','Blackburn','BL34 5LX','07845382981');
INSERT INTO NextOfKin VALUES
(3004,'Anthony Peters','4 Solent Way','Southampton','S022 4SA','02380453982');
INSERT INTO NextOfKin VALUES
(3005,'Phillipa Wright','143 GreenHill Road','Portsmouth','PO21 4SA','02392874381');
INSERT INTO NextOfKin VALUES
(3006,'Sheila Laker','29 Digby Road','Plymouth','PY21 3QA','03627893825');
INSERT INTO NextOfKin VALUES
(3007,'Margaret Atkins','14 Mulberry Crescent','Portsmouth','PO23 1SW','02392674637');
INSERT INTO NextOfKin VALUES
(3008,'Anthony Peterson','4 Shefield Way','Southampton','S022 4SA','02380453982');
INSERT INTO NextOfKin VALUES
(3009,'Adrian Kemp','123 GreenHill Road','Portsmouth','PO21 4SA','02392874381');
INSERT INTO NextOfKin VALUES
(3010,'Sheila Fields','21 Portsea Avenue','Portsmouth','P022 3QA','02392893825');
INSERT INTO NextOfKin VALUES
(3011,'Margaret Ellis','7 Woodbury Way','Portsmouth','PO20 1SA','02392674637');