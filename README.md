<<<<<<< HEAD
# GuestBook Project

## Table of Contents

- [GuestBook Project](#guestbook-project)
  - [Table of Contents](#table-of-contents)
  - [project description](#project-description)
- [technology](#technology)
     - [backend](#backend)
     - [frontend](#frontend)

  
## project description
it is project using express , typescript and postgres for database where guest can add messages in guestbook
## ports
### postgres
> ports 5432
### backend server
> ports 4000
### frontend clint
> ports 3000
##  connect to the database 
first download and install postgres (https://www.postgresql.org/download/) (my OS is windows)
open psql
```write[
  postgres=# CREATE ROLE "postgres" WITH LOGIN SUPERUSER INHERIT CREATEDB CREATEROLE NOREPLICATION PASSWORD '123456789';
  postgres=# CREATE DATABASE "guestbook" WITH OWNER = "postgres";
``` 
  # command to start
## backend
> npm install 

> db-migrate up

> npm run start || npm run watch

## frontend
> npm install 

> npm run start

# technology
## backend
`express` for building the API in backend \
`typescript` to reduce the code error and make easy to handling error\
`bcrypt` to hash password \
`jsonwebtoken` to handle token \
`pg` for the database \
`db-migrate` for making the database table use `db-migrate up` or `db-migrate down`
### Controllers
`messageController` functions of messages to display , create , edit and delete and for routing \
`userController`functions of messages to display , create , edit and delete and for routing 
### Models
`messageModel` for SQL queries of message table to create ,updata , delete and display messages\
`userModel`for SQL queries of guest table to create ,updata , delete and display guests\
### Src
`index` it is server file\
`database` to config and build connection with database \
`middleware` to verify the jwt 
## frontend
`axios` for building the API in frontend\
`jwt-decode` to decode the JWT\
`react-router-dom` for routing the frontend
### components
`login` for login form\
`Register` for Register form\
`message `to show , delete and edit messages\
`addMessage` for writting messages\
`Logout` to Logout

=======
under construction
>>>>>>> 4feb84740ca53389109696af572080a471c0825f
