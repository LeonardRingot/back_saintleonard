const swaggerJsDoc = require('swagger-jsdoc');

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

export const swaggerDocs = swaggerJsDoc(swaggerOptions);
