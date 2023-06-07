import dotenv from "dotenv";
dotenv.config();

import cors from 'cors'
import express from "express"
import { apiRouter } from './api/routers/api.router'
import unexpectedErrorMiddleware from './api/middlewares/error.global'
import swaggerUi from 'swagger-ui-express';
import { initDb, relations } from "./Database/relation";
import passport from "passport";

const swaggerJsDoc = require('swagger-jsdoc')
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

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'API OUATISL',
            description: 'API Project Once Upon A Time In Saint-Leonard',
            contact: {
                name: 'Florent'
            },
            // servers: [{ url: '/api' }]
            servers: [{
                url:`http://localhost:${process.env.PORT}`,
                description: 'localhost'
            },],
        },
        securityDefinitions: {
            bearerAuth: {
                type: 'apiKey',
                name: 'Authorization',
                scheme: 'bearer',
                in: 'header',
            },
        },
        security: [
            {
                bearerAuth: []
            }
        ],
    },
    apis: [`./src/api/routers/*.ts`]
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.use('/api/v1', apiRouter)
export default app