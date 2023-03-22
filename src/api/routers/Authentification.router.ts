import { Router } from "express";
import { authentificationHandler } from "~/injection";

export const authRouter = Router();

/**
 * @swagger
 * tags:
 *      name: Auth
 *      description: Routes qui s'occuppent de l'authentification
 */

/**
 * @openapi
 * /api/v1/auth/login:
 *  post:
 *      tags: [Auth]
 *      description: login
 *      consumes:
 *       - application/json
 *      parameters:
 *       - name: JSON
 *         in: body
 *         required: true
 *         type: object
 *         default: {"pseudo": "raph", "password": "pizza" }
 *      responses:
 *        200:
 *          description: La requête s'est bien déroulée.
 */
authRouter.post("/login", authentificationHandler.login);

/**
 * @openapi
 * /api/v1/auth/refresh:
 *  post:
 *      tags: [Auth]
 *      description: login
 *      consumes:
 *       - application/json
 *      parameters:
 *       - name: JSON
 *         in: body
 *         required: true
 *         type: object
 *         default: {"name": "feuille", "image": "image.png", "id_point": 2}
 *      responses:
 *        200:
 *          description: La requête s'est bien déroulée.
 */
authRouter.post("/refresh", authentificationHandler.refreshToken);