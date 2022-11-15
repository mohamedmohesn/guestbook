import client from '../database';
import bcrypt from 'bcrypt';


export type Guest = {
    id?: string|number;
    email: string;
    fullname: string;
    phone: string;
    password?: string;
}

const pepper= 'meme';
const  saltRounds = 10;

export class Guestbook {
    async index(): Promise <string | Guest[]> {
      try{
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


        async create(guest: Guest): Promise<Guest> {
          try {
        const sql = 'INSERT INTO guests (email, fullname, phone ,password) VALUES($1, $2, $3 ,$4) RETURNING email,fullname,phone'
  
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


      async authenticate(email: string, password: string): Promise<Guest | null> {

        const conn = await client.connect()

        const sql = 'SELECT * FROM guests WHERE email=($1)'
    
        const result = await conn.query(sql, [email])
    
        // console.log(password+pepper)
    
        if(result.rows.length) {
    
          const guest = result.rows[0]
    
          // console.log(guest)
    
          if (bcrypt.compareSync(password+pepper, guest.password)) {
            const guests = {
              id: guest.id,
              email: guest.email,
              fullname: guest.fullname,
              phone: guest.phone,

            }
            return guests
          }
        }
    
        return null
      }

        }
        
    