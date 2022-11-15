"use strict";
exports.__esModule = true;
var pg_1 = require("pg");
var client = new pg_1.Pool;
// const {
var POSTGRES_HOST = 'localhost';
var POSTGRES_DB = 'guestbook';
var POSTGRES_USER = 'postgres';
var POSTGRES_PASSWORD = '123456789';
// } = process.env
client = new pg_1.Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD
});
exports["default"] = client;
