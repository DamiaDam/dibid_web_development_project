CREATE DATABASE IF NOT EXISTS 'db';
USE DATABASE db;
CREATE TABLE countries (name VARCHAR(64));
INSERT INTO countries VALUES ('France'),('Germany'),('Greece');
INSERT INTO users VALUES ('admin','admin','admin@mail.com','6969696969','165432100','Greece','Home',0,0,1,'Admin','Admin');

#CREATE USER 'root'@'localhost' IDENTIFIED BY 'root';
#GRANT ALL PRIVILEGES ON *.* to 'root'@'%';

#INSERT INTO countries VALUES ('France'),('Germany'),('Greece');
