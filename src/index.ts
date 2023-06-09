import dotenv from "dotenv";
dotenv.config();

import cors from 'cors'
import express from "express"
import { apiRouter } from './api/routers/api.router'
import unexpectedErrorMiddleware from './api/middlewares/error.global'
import { initDb, relations } from "./Database/relation";
import passport from "passport";
import swaggerUi from 'swagger-ui-express';
import { swaggerDocs } from "./swagger";

const app = express()

app.use(express.json())
app.use(cors())
const port = process.env.PORT

app.use(passport.initialize());

app.use(apiRouter)

app.use(unexpectedErrorMiddleware)

app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}...`)
})

relations()
// initDb();

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/api/v1', apiRouter);
export default app