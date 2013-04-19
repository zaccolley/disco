CREATE DATABASE WorldCupSystem;
USE WorldCupSystem;

CREATE TABLE Team(
  Team_ID TINYINT NOT NULL,
  Team_Name VARCHAR(45) NOT NULL,
  Team_Qualified BINARY NOT NULL,
  Team_Phase VARCHAR(15) NOT NULL,
  Team_Group CHAR(1) NOT NULL,
  PRIMARY KEY (Team_ID)
  );

CREATE TABLE Player(
  Play_ID SMALLINT NOT NULL,
  Play_Forename VARCHAR(35) NOT NULL,
  Play_Surname VARCHAR(35) NOT NULL,
  Play_Position VARCHAR(25) NOT NULL,
  Team_ID TINYINT NOT NULL,
  PRIMARY KEY (Play_ID, Team_ID),
  FOREIGN KEY (Team_ID) REFERENCES Team (Team_ID)
  );

CREATE INDEX Player_Team_ID_Index ON Player (Team_ID ASC);

CREATE TABLE Venue(
  Venue_ID TINYINT NOT NULL,
  Venue_Type VARCHAR(25) NOT NULL,
  Venue_Name VARCHAR(100) NOT NULL,
  Venue_Location VARCHAR(100) NOT NULL,
  PRIMARY KEY (Venue_ID)
  );

CREATE TABLE Game(
  Game_ID TINYINT NOT NULL,
  Game_StartTime DATETIME NOT NULL,
  Game_FinalScore VARCHAR(5) NOT NULL,
  Game_ExtraTime DATETIME NULL,
  Game_Played BINARY NOT NULL,
  Venue_ID TINYINT NOT NULL,
  PRIMARY KEY (Game_ID),
  FOREIGN KEY (Venue_ID) REFERENCES Venue (Venue_ID)
  );

CREATE INDEX Game_Venue_ID_Index ON Game (Venue_ID ASC);

CREATE TABLE Coach(
  Coach_ID SMALLINT NOT NULL,
  Coach_Forename VARCHAR(35) NOT NULL,
  Coach_Surname VARCHAR(35) NOT NULL,
  Coach_Position BINARY NOT NULL,
  Team_ID TINYINT NOT NULL,
  PRIMARY KEY (Coach_ID),
  FOREIGN KEY (Team_ID) REFERENCES Team (Team_ID)
  );

CREATE INDEX Coach_Team_ID_Index ON Coach (Team_ID ASC);

CREATE TABLE GameTeam(
  Game_ID TINYINT NOT NULL,
  Team_ID TINYINT NOT NULL,
  WinningTeam BINARY NOT NULL,
  PRIMARY KEY (Game_ID, Team_ID),
  FOREIGN KEY (Team_ID) REFERENCES Team (Team_ID),
  FOREIGN KEY (Game_ID) REFERENCES Game (Game_ID)
  );

CREATE INDEX GameTeam_Team_ID_Index ON GameTeam (Team_ID ASC);
CREATE INDEX GameTeam_Game_ID_Index ON GameTeam (Game_ID ASC);

CREATE TABLE Referee(
  Ref_ID SMALLINT NOT NULL,
  Ref_Forename VARCHAR(35) NOT NULL,
  Ref_Surname VARCHAR(35) NOT NULL,
  Ref_OfficialPosition TINYINT NOT NULL,
  PRIMARY KEY (Ref_ID)
  );

CREATE TABLE Goal(
  Goal_ID SMALLINT NOT NULL,
  Goal_Time DATETIME NOT NULL,
  Goal_Final BINARY NOT NULL,
  Play_ID SMALLINT NOT NULL,
  Game_ID TINYINT NOT NULL,
  PRIMARY KEY (Goal_ID),
  FOREIGN KEY (Play_ID) REFERENCES Player (Play_ID),
  FOREIGN KEY (Game_ID) REFERENCES Game (Game_ID)
  );

CREATE INDEX Goals_Play_ID_Index ON Goal (Play_ID ASC);
CREATE INDEX Goal_Game_ID_Index ON Goal (Game_ID ASC);

CREATE TABLE VenueTeam(
  Venue_ID TINYINT NOT NULL,
  Team_ID TINYINT NOT NULL,
  PRIMARY KEY (Venue_ID, Team_ID),
  FOREIGN KEY (Venue_ID) REFERENCES Venue (Venue_ID),
  FOREIGN KEY (Team_ID) REFERENCES Team (Team_ID)
  );

CREATE INDEX VenueTeam_Venue_ID_Index ON VenueTeam (Venue_ID ASC);
CREATE INDEX VenueTeam_Team_ID_INdex ON VenueTeam (Team_ID ASC);

CREATE TABLE Room(
  Room_ID SMALLINT NOT NULL,
  Venue_ID TINYINT NOT NULL,
  PRIMARY KEY (Room_ID, Venue_ID),
  FOREIGN KEY (Venue_ID) REFERENCES Venue (Venue_ID)
  );

CREATE INDEX Room_Venue_ID_Index ON Room (Venue_ID ASC);

CREATE TABLE Complaint(
  Complaint_ID SMALLINT NOT NULL,
  Complaint_Time DATETIME NOT NULL,
  Complaint_Description VARCHAR(1024) NULL,
  Room_ID SMALLINT NOT NULL,
  Coach_ID SMALLINT NOT NULL,
  PRIMARY KEY (Complaint_ID),
  FOREIGN KEY (Room_ID) REFERENCES Room (Room_ID),
  FOREIGN KEY (Coach_ID) REFERENCES Coach (Coach_ID)
  );

CREATE INDEX fk_Complaint_Room1_idx ON Complaint (Room_ID ASC);
CREATE INDEX fk_Complaint_Coach1_idx ON Complaint (Coach_ID ASC);

CREATE TABLE RefereeGame(
  Ref_ID SMALLINT NOT NULL,
  Game_ID TINYINT NOT NULL,
  PRIMARY KEY (Ref_ID, Game_ID),
  FOREIGN KEY (Ref_ID) REFERENCES Referee (Ref_ID),
  FOREIGN KEY (Game_ID) REFERENCES Game (Game_ID)
  );

CREATE INDEX RefereeGame_Game1_Index ON RefereeGame (Game_ID ASC);
CREATE INDEX RefereeGame_Referee1_Index ON RefereeGame (Ref_ID ASC);

CREATE TABLE Substitution(
  Sub_ID TINYINT NOT NULL,
  Sub_Time DATETIME NOT NULL,
  Play_ID_Off SMALLINT NOT NULL,
  Team_ID_Off TINYINT NOT NULL,
  Play_ID_On SMALLINT NOT NULL,
  Team_ID_On TINYINT NOT NULL,
  Game_ID TINYINT NOT NULL,
  PRIMARY KEY (Sub_ID),
  FOREIGN KEY (Play_ID_Off, Team_ID_Off) REFERENCES Player (Play_ID, Team_ID),
  FOREIGN KEY (Play_ID_On, Team_ID_On) REFERENCES Player (Play_ID, Team_ID),
  FOREIGN KEY (Game_ID) REFERENCES Game (Game_ID)
  );

CREATE INDEX Substitution_Player_Off_Index ON Substitution (Play_ID_Off ASC, Team_ID_Off ASC);
CREATE INDEX Substitution_Player_On_Index ON Substitution (Play_ID_On ASC, Team_ID_On ASC);
CREATE INDEX Substitution_Game_ID_Index ON Substitution (Game_ID ASC);