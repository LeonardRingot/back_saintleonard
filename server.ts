import dotenv from "dotenv";
dotenv.config();

import cors from 'cors'
import express from "express"
import { Response, Request, NextFunction } from 'express';

const app = express()

app.use(express.json())
app.use(cors())
const port = process.env.PORT

app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}...`)
})

export default app