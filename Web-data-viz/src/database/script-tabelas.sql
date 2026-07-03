CREATE DATABASE Tamarineira;
USE Tamarineira;

CREATE TABLE `user`(
  id int NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  password varchar(255) NOT NULL,
  createdAt datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY email (email)
);

CREATE TABLE quiz (
  id int NOT NULL AUTO_INCREMENT,
  userId int NOT NULL,
  theme varchar(30) DEFAULT NULL,
  title varchar(255) NOT NULL,
  points int DEFAULT NULL,
  description varchar(255) NOT NULL,
  createdAt datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY quiz_user (userId),
  CONSTRAINT quiz_user FOREIGN KEY (userId) REFERENCES user (id) ON DELETE CASCADE
);

CREATE TABLE question (
  id int NOT NULL AUTO_INCREMENT,
  quizId int NOT NULL,
  question varchar(255) NOT NULL,
  PRIMARY KEY (id),
  KEY question_quiz (quizId),
  CONSTRAINT question_quiz FOREIGN KEY (quizId) REFERENCES quiz (id) ON DELETE CASCADE
);

CREATE TABLE answer (
  id int NOT NULL AUTO_INCREMENT,
  questionId int NOT NULL,
  text varchar(255) NOT NULL,
  isRight tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (id),
  KEY answer_question (questionId),
  CONSTRAINT answer_question FOREIGN KEY (questionId) REFERENCES question (id) ON DELETE CASCADE
);

CREATE TABLE play (
  id int NOT NULL AUTO_INCREMENT,
  userId int NOT NULL,
  quizId int NOT NULL,
  wrong int NOT NULL DEFAULT '0',
  `right` int NOT NULL DEFAULT '0',
  startedAt datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY play_user (userId),
  KEY play_quiz (quizId),
  CONSTRAINT play_quiz FOREIGN KEY (quizId) REFERENCES quiz (id) ON DELETE CASCADE,
  CONSTRAINT play_user FOREIGN KEY (userId) REFERENCES user (id) ON DELETE CASCADE
);

CREATE TABLE play_answer (
  id int NOT NULL AUTO_INCREMENT,
  playId int NOT NULL,
  questionId int NOT NULL,
  answerId int NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq_play_question (playId,questionId),
  KEY pa_question (questionId),
  KEY pa_answer (answerId),
  CONSTRAINT pa_answer FOREIGN KEY (answerId) REFERENCES answer (id) ON DELETE CASCADE,
  CONSTRAINT pa_play FOREIGN KEY (playId) REFERENCES play (id) ON DELETE CASCADE,
  CONSTRAINT pa_question FOREIGN KEY (questionId) REFERENCES question (id) ON DELETE CASCADE
);