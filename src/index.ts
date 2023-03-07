import dotenv from "dotenv";
dotenv.config();

import cors from 'cors'
import express from "express"
import { apiRouter } from './api/routers/api.router'
import unexpectedErrorMiddleware from './api/middlewares/error.global'

const app = express()

app.use(express.json())
app.use(cors())
const port = process.env.PORT


app.use(apiRouter)

app.use(unexpectedErrorMiddleware)

app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}...`)
})

export default app