import { Router } from "express";
import { pointHandler } from "~/injection";

export const pointRouter = Router();

/**
 * @swagger
 * tags:
 *      name: Point
 *      description: Gestion des routes dédié aux points d'interet
 */

/**
 * @openapi
 * /api/v1/Points:
 *      get:
 *          tags: [Point]
 *          description: liste des points d'interet
 *          responses:
 *              200:
 *                  description: la requète s'est bien déroulée.
 */
pointRouter.get("/", pointHandler.getPoints);

/**
 * @openapi
 * /api/v1/Points/{id}:
 *  get:
 *      tags: [Point]
 *      description: Trouver un Point d'interet par son Id
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
pointRouter.get("/:id", pointHandler.getPointById);

/**
 * @openapi
 * /api/v1/Points:
 *  post:
 *      tags: [Point]
 *      description: Crée un Point d'interet
 *      consumes:
 *       - application/json
 *      parameters:
 *       - name: JSON
 *         in: body
 *         required: true
 *         type: object
 *         default: {"name": "Le vieux chateau", "main_description": "un très long texte", "small_description": "petit texte", "lon": "50.689784", "lat": "1.62799437", "qrcode": "./qrcode.png"}
 *      responses:
 *        200:
 *          description: La requête s'est bien déroulée.
 */
pointRouter.post("/", pointHandler.createPoint);

/**
 * @openapi
 * /api/v1/Points/{id}:
 *  put:
 *      tags: [Point]
 *      description: Modifier un Point d'interet
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
 *         default: {"name": "Le vieux chateau", "main_description": "un très long texte", "small_description": "petit texte", "lon": "50.689784", "lat": "1.62799437", "qrcode": "./qrcode.png"}
 *      responses:
 *        200:
 *          description: La requête s'est bien déroulée.
 */
pointRouter.put("/:id", pointHandler.updatePoint);

/**
 * @openapi
 * /api/v1/Points/{id}:
 *  delete:
 *      tags: [Point]
 *      description: Supprimer un Point d'interet
 *      parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *      responses:
 *        200:
 *          description: La requête s'est bien déroulée.
 */
pointRouter.delete("/:id", pointHandler.deletePoint);