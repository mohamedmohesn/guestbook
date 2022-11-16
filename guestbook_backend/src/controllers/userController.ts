import express, { Request, Response } from 'express'
import { Guestbook, Guest} from '../models/userModel'
import jwt from "jsonwebtoken";

const book = new Guestbook()
const maxAge = 6 * 24 * 60 * 60;
const index = async (_req: Request, res: Response) => {
    try {

        const People = await book.index()
    res.json(People)
    
    } catch (error) {
        res.status(400)
        res.json(`Could not find People`)
    }
    
}

const show = async (req: Request, res: Response) => {
    try {
      const People = await book.show(req.params.id)
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
        // process.env.TOKEN as string
        const People = await book.create(guest)
        const token = jwt.sign({user: People}, 'hi')
        console.log(People);
        res.json({People,token})
    } catch(err) {
        res.status(400)
        res.json(`Could not add new Guest`)
    }
}


const authenticate = async (req: Request, res: Response) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        
        const loginUser = await book.authenticate(email,password)

        if (loginUser !== "Could not find use") {
        const token = jwt.sign({user: loginUser}, 'hi');
        res.json({loginUser,token})
        }
        res.json(`Could not login guest`)
    } catch(err) {
        res.status(400)
        res.json(`Could not login guest`)
    }
}

const GuestRoutes = (app: express.Application) => {
    app.get('/user', index)
    app.get('/user/:id', show)
    app.post('/signup', create)
    app.post('/login', authenticate)
  }
  
  export default GuestRoutes