import express, { Request, Response } from 'express'
import { Message, Messagebook } from '../models/messageModel'

const book = new Messagebook()

const index = async (_req: Request, res: Response) => {
    try {
        const message = await book.index()
        res.json(message)
    } catch (error) {
        res.status(400)
        res.json(`Could not find messages`)
    }
}


const create = async (req: Request, res: Response) => {
    try {
        const messageContainer: Message = {
            guests_id: req.body.guests_id,
            messagetext: req.body.messagetext,
        }

        const newMessage = await book.create(messageContainer)
        console.log(newMessage)
        res.json(newMessage)
    } catch (err) {
        res.status(400)
        res.json(`Could not add new Message`)
    }
}


const destroy = async (req: Request, res: Response) => {
    try {
        const deleted = await book.delete(req.params.id)
        res.json(deleted)
    } catch (error) {
        res.status(400)
        res.json(`Could not delete Message ${req.params.id}`)
    }
}

const updates = async (req: Request, res: Response) => {
    try {
        const messagetext = req.body.messagetext;

        const newMessage = await book.edit(req.params.id,messagetext)
        console.log(newMessage)
        res.json(newMessage)
    } catch (err) {
        res.status(400)
        res.json(`Could not add new Message con ${err}`)
    }
}


const MessageRoutes = (app: express.Application) => {
    app.get('/message', index)
    app.post('/message', create)
    app.delete('/message/:id', destroy)
    app.put('/message/edit/:id', updates)
}

export default MessageRoutes