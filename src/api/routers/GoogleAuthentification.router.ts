import { Router } from "express";
import { googleAuthHandler } from "~/injection";

export const googleAuthentificationRouter = Router();

/**
 * @swagger
 * tags:
 *      name: Auth
 *      description: Routes qui s'occuppent de l'authentification
 */

/**
 * @openapi
 * /api/v1/auth/google:
 *  get:
 *      tags: [Auth]
 *      description: Login with Google
 *      responses:
 *        200:
 *          description: Redirects to Google OAuth2 login page
 */
googleAuthentificationRouter.get("/", googleAuthHandler.authenticateGoogle);

/**
 * @openapi
 * /api/v1/auth/google/callback:
 *  get:
 *      tags: [Auth]
 *      description: Callback for Google OAuth2 authentication
 *      responses:
 *        200:
 *          description: Returns access token and sets refresh token cookie
 */
googleAuthentificationRouter.get(
    "/callback",
    googleAuthHandler.authenticateGoogleCallback
);