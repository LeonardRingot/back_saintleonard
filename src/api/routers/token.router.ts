import { Router } from "express";
import { tokenHandler } from "~/injection";

export const tokenRouter = Router();

/**
 * @swagger
 * tags:
 *      name: Token
 *      description: Gestion des routes dédié aux tokens
 */

/**
 * @openapi
 * /api/v1/tokens:
 *      get:
 *          tags: [Token]
 *          description: liste des tokens
 *          responses:
 *              200:
 *                  description: la requète s'est bien déroulée.
 */
tokenRouter.get("/", tokenHandler.getTokens);

/**
 * @openapi
 * /api/v1/tokens/{id}:
 *  get:
 *      tags: [Token]
 *      description: Trouver un token par son Id
 *      parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *         default: 1
 *      responses:
 *        200:
 *          description: La requête s'est bien déroulée.
 */
tokenRouter.get("/:id", tokenHandler.getTokenById);

/**
 * @openapi
 * /api/v1/tokens:
 *  post:
 *      tags: [Token]
 *      description: Crée un token
 *      consumes:
 *       - application/json
 *      parameters:
 *       - name: JSON
 *         in: body
 *         required: true
 *         type: object
 *         default: {"refresh_token": "fnfijfnpgaetogdfbf5fg,gkflg6", "id_pseudo": 1 }
 *      responses:
 *        200:
 *          description: La requête s'est bien déroulée.
 */
tokenRouter.post("/", tokenHandler.createToken);

/**
 * @openapi
 * /api/v1/tokens/{id}:
 *  put:
 *      tags: [Token]
 *      description: Modifier un token
 *      consumes:
 *       - application/json
 *      parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *         default: 1
 *       - name: JSON
 *         in: body
 *         required: true
 *         type: formData
 *         default: {"refresh_token": "fnfijfnpgaetogdfbf5fg,gkflg6", "id_pseudo": 1 }
 *      responses:
 *        200:
 *          description: La requête s'est bien déroulée.
 */
tokenRouter.put("/:id", tokenHandler.updateToken);

/**
 * @openapi
 * /api/v1/tokens/{id}:
 *  delete:
 *      tags: [Token]
 *      description: Supprimer un token
 *      parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *      responses:
 *        200:
 *          description: La requête s'est bien déroulée.
 */
tokenRouter.delete("/:id", tokenHandler.deleteToken);