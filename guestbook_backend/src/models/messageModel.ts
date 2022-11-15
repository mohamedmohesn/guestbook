import client from '../database';

export type Message = {
    id?: string|number;
    guests_id: string|number;
    messagetext: string;
}

export class Messagebook {
    async index(): Promise<string | Message[]> {
      try {

        const conn = await client.connect()
        const sql = 'SELECT * FROM messages'
  
        const result = await conn.query(sql)
  
        conn.release()
  
        if (!result.rows[0]) {
            return `Could not find Message`
        } else {
            return result.rows}
            
      } catch (err) {
        throw new Error(`Could not get Message. Error: ${err}`)
      }
    }

    async create(message: Message): Promise<string|Message> {
        try {
            try {
                const sql2 = 'SELECT id FROM guests WHERE id=($1)'
                const conn = await client.connect()
                const result2 = await conn.query(sql2, [message.guests_id])
                conn.release()
                if (!result2.rows[0]) {
                    return `Could not find user ${message.guests_id}`
                }
            } catch (error) {
                throw new Error(`Could not find user ${message.guests_id}. Error: ${error}`)
            }

      const sql = 'INSERT INTO messages (guests_id, messagetext) VALUES($1, $2) RETURNING *'

      const conn = await client.connect()
  
      const result = await conn
          .query(sql, [message.guests_id, message.messagetext])
  
      const messages = result.rows[0]
  
      conn.release()
      
      return messages
        } catch (err) {
            throw new Error(`Could not add new message ${message.id}. Error: ${err}`)
        }
    }


    async delete(id: string): Promise<string | Message> {
        try {
      const sql = 'DELETE FROM messages WHERE id=($1) RETURNING *'
      const conn = await client.connect()
      const result = await conn.query(sql, [id])
      const messages = result.rows[0]
  
      conn.release()

        if (!messages) {
            return `Could not delete messages ${id}`
         } else {
            return messages}

        } catch (err) {
            throw new Error(`Could not delete messages ${id}. Error: ${err}`)
        }
    }

    async edit(id: string ,text: string): Promise<string | Message> {
        try {
      const sql = 'UPDATE messages SET messagetext=($1) WHERE id=($2) RETURNING *'
      const conn = await client.connect()
      const result = await conn.query(sql, [text,id])
      const messages = result.rows[0]
  
      conn.release()

        if (!messages) {
            return `Could not edit messages ${id}`
         } else {
            return messages}

        } catch (err) {
            throw new Error(`Could not edit messages ${id}. Error: ${err}`)
        }
    }

}
    
