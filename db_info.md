# MySQL db with docker and console

## Setup a MySQL server using Docker on port 3306
docker run --name demo-mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=password -d mysql:latest

## Execute MySQL server monitor
sudo docker exec -it demo-mysql mysql -uroot -p

## Instructions for first time run

## w3schools sql tutorial:
https://www.w3schools.com/sql/default.asp

### Create a new database
CREATE DATABASE db;

### Use newly-created database
USE db;

### Create a new table with one column
CREATE TABLE users (id INT);

### Insert a new entry in table
INSERT INTO users(id) VALUES(0);

### Delete an entry from table
DELETE FROM users WHERE id=0;

### View table
SELECT * FROM users;

### Delete an existing table;
DROP TABLE users;

### Create proper table
CREATE TABLE users( username VARCHAR(64) NOT NULL, password VARCHAR(64) NOT NULL, PRIMARY KEY ( username) );

### Insert password safely, encrypted using SHA256
INSERT INTO users VALUES ('admin', SHA2('pass',256));


### Fix Client Does Not Support Authentication Bug
https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server

ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'password';
flush privileges;


### Insert multiple countries in table
INSERT INTO countries VALUES ('France'),('Germany'),('Greece');


### DOCKER

### Start using docker-compose
sudo docker-compose up -d

### Edit db
sudo docker exec -it <name> bash
mysql -uroot -p

### See if docker is running
sudo docker ps -a

### Del a docker db
sudo docker rm <name>

### Show table fields
describe users;

TODO: add admin and countries on startup: https://stackoverflow.com/questions/53479741/run-program-on-init

### NOTE: SQL Scripts are numbered (0_ , 1_, etc) to control order, as they are executed alphabetically

### MySQL syntax checker:
https://en.rakko.tools/tools/36/

### Update Aug 1 2022:
Create mysql user dibid - dibid
Create database dibid
inject scripts 1_countries, 2_users, categories


## Updated first-time run (29 Aug 2022)

1. Install mysql-server

`sudo apt install mysql-server`

2. Fix root

`ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';`

3. exit

4. Run mysql as root

`mysql -u root -p`

5. Create dibid user

`CREATE USER 'dibid'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';`

6. Grant all privileges

`GRANT ALL PRIVILEGES ON *.* TO 'dibid'@'localhost';`

7. Flush privileges

`FLUSH PRIVILEGES`

8. exit and rerun as dibid

`mysql -u dibid -p`

9. `CREATE DATABASE dibid;`

10. `mysql -u dibid -p dibid < 1_countries.sql`
11. `mysql -u dibid -p dibid < 2_users.sql`
12. `mysql -u dibid -p dibid < categories.sql`

13. make sure that backend/ormconfig.json is set up correctly