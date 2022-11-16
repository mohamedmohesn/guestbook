import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import cookieParser   from "cookie-parser";
import cors from "cors";

import GuestRoutes from './controllers/userController';
import MessageRoutes from './controllers/messageController';

const app: express.Application = express()
const address: string = "0.0.0.0:4000"

app.use(cors())
app.use(cookieParser());

app.use(bodyParser.json())


app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

GuestRoutes(app);
MessageRoutes(app)
app.listen(4000, function () {
    console.log(`starting app on: ${address}`)
})
export default app