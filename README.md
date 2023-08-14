# dibid
DiBid is an online auction application

# Guide

## Prerequisites

The following are required to set up and deploy the full stack application.
You can skip anything that you already have on your computer.

1. Git

Check if git version control is installed in your machine using

`git version`.

If it is not installed, simply use

`sudo apt install git-all`.

2. MySQL Server

Check if mysql is already installed in your machine using

`systemctl status mysql.service`

If it is not installed, follow the instructions below

2.1. Install mysql using

`sudo apt install mysql-server`

2.2. Ensure that the server is running using

`sudo systemctl start mysql.service`

2.3. Run mysql as root (this may vary if you already have a root account)

`sudo mysql`

You will now enter the mysql console.

2.4. Create a new database

`CREATE DATABASE dibid;`

2.5. Create a dedicated user

`CREATE USER 'dibid'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';`

Please use a secure password instead of just 'password'.

2.6. Grant privileges to our user on our database

`GRANT ALL PRIVILEGES ON dibid.* TO 'dibid'@'localhost';`

`FLUSH PRIVILEGES;`

Now, we have created a fresh 'dibid' database, and a fresh 'dibid' user, with an appropriate password and full privileges on the dibid database. This will make it easier to follow the ormconfig instructions later.

3. npm

Check if npm is already installed in your machine using

`npm -version`

npm install -g npm

4. mkcert

Install mkcert

`sudo apt-get install wget libnss3-tools -y`

`wget https://github.com/FiloSottile/mkcert/releases/download/v1.4.3/mkcert-v1.4.3-linux-amd64`

`sudo mv mkcert-v1.4.3-linux-amd64 /usr/bin/mkcert`

`sudo chmod +x /usr/bin/mkcert`

`mkcert -install`


## Installation

Open your installation location on a terminal. eg /home/billy/Projects

1. Clone the repository locally:

`git clone https://github.com/vmarkop/dibid.git`

2. Move to the repository folder:

`cd dibid`

3. Initialize the database

`cat db/init/*.sql | mysql -u dibid -p`

This prompts you to insert the password for the dibid user we previously created.

Then, the Admin user is created, and the Countries and Categories are initialized in the database.

4. Create the local certificates for SSL

`mkcert localhost`

5. Setup and run backend

`cd backend`

Install dependencies

`npm i`

Change the password on ormconfig.json to the secure password you used for user 'dibid'.

`npm run start`

6. Setup and run frontend

`cd ../frontend`

Install dependencies

`npm i`

to start on https mode, use:

`npm run https`

The full stack is now ready to go!

Visit `https://localhost:3000` to get started.
