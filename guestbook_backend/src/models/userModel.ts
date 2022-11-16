import client from '../database';
import bcrypt from 'bcrypt';


export type Guest = {
  id?: string | number;
  email: string;
  fullname: string;
  phone: string;
  password?: string;
} 

const pepper = process.env.PEPPER 
const saltRounds = process.env.SALT

export class Guestbook {
  async index(): Promise<string | Guest[]> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT id,email,fullname,phone FROM guests'
      const result = await conn.query(sql)
      conn.release()
      console.log('get');

      if (!result.rows[0]) {
        return `Could not find User`
      } else {
        return result.rows
      }

    } catch (error: any) {
      throw new Error(`Could not get User. Error: ${error}`)
    }
  }

  async show(id: string): Promise<string | Guest> {
    try {

      const sql = 'SELECT id,email,fullname,phone FROM guests WHERE id=($1) '
      const conn = await client.connect()

      const result = await conn.query(sql, [id])

      conn.release()

      if (!result.rows[0]) {
        return `Could not find user ${id}`
      } else {
        return result.rows[0]
      }

    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`)
    }

  }

  async create(guest: Guest): Promise<Guest> {
    try {
      const sql = 'INSERT INTO guests (email, fullname, phone ,password) VALUES($1, $2, $3 ,$4) RETURNING id,email,fullname,phone'

      const conn = await client.connect()

      const hash = bcrypt.hashSync(
        guest.password as string + pepper,
        Number(saltRounds)
      );

      const result = await conn
        .query(sql, [guest.email, guest.fullname, guest.phone, hash])

      const users = result.rows[0]

      conn.release()

      return users
    } catch (err) {
      throw new Error(`Could not add new user ${guest.fullname}. Error: ${err}`)
    }
  }


  async authenticate(email: string, password: string): Promise<Guest | string > {

    try {
      const conn = await client.connect()

      const sql = 'SELECT * FROM guests WHERE email=($1)'

      const result = await conn.query(sql, [email])
      conn.release()
      // console.log(result.rows.length )

      if (!result.rows[0]) {
        throw new Error (`Could not find use`)
      }

      const guest = result.rows[0]

        // console.log(result)

        if (!bcrypt.compareSync(password + pepper, guest.password)) {
          throw new Error (`wrong password`)
        }
        const guests = {
          id: guest.id,
          email: guest.email,
          fullname: guest.fullname, 
          phone: guest.phone,

        }
        return guests
      
      

    } catch (error) {
      throw new Error(`${error}` )
    }
  }

}

