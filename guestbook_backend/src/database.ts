import { Pool } from 'pg'

let client = new Pool;
// const {
 const POSTGRES_HOST = 'localhost';
 const POSTGRES_DB='guestbook';
 const POSTGRES_USER='postgres';
 const POSTGRES_PASSWORD='123456789';
// } = process.env

client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
})



  export default client

