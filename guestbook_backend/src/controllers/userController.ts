import express, { Request, Response } from 'express'
import { Guestbook, Guest} from '../models/userModel'

const book = new Guestbook()

const index = async (_req: Request, res: Response) => {
    try {

        const People = await book.index()
    res.json(People)
    
    } catch (error) {
        res.status(400)
        res.json(`Could not find People`)
    }
    
}

const create = async (req: Request, res: Response) => {
    try {
        const guest: Guest = {
            email: req.body.email,
            fullname: req.body.fullname,
            phone: req.body.phone,
            password: req.body.password,
        }

        const People = await book.create(guest)
        
        res.json(People)
    } catch(err) {
        res.status(400)
        res.json(`Could not add new Product`)
    }
}


const authenticate = async (req: Request, res: Response) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        
        const loginUser = await book.authenticate(email,password)

        // if (newProduct !== null) {
        // const token = jwt.sign({user: newProduct}, process.env.TOKEN as string);
        // res.setHeader('authorization', 'Bearer '+token)  
        // }
       
        // console.log(newProduct)
        res.json(loginUser)

    } catch(err) {
        res.status(400)
        res.json(`Could not login guest`)
    }
}

const GuestRoutes = (app: express.Application) => {
    app.get('/user', index)
    app.post('/signup', create)
    app.post('/login', authenticate)
  }
  
  export default GuestRoutes