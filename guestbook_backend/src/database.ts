import { Pool } from 'pg'
import * as dotenv from 'dotenv'
dotenv.config()
let client = new Pool;
const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD
} = process.env

client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
})


  export default client

