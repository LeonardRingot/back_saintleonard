import { Router } from "express";
import { badgeHandler } from "~/injection";

export const badgeRouter = Router();

/**
 * @swagger
 * tags:
 *      name: Badge
 *      description: Gestion des routes dédié aux badges
 */

/**
 * @openapi
 * /api/v1/badges:
 *      get:
 *          tags: [Badge]
 *          description: liste des badges
 *          responses:
 *              200:
 *                  description: la requète s'est bien déroulée.
 */
badgeRouter.get("/", badgeHandler.getBadges);

/**
 * @openapi
 * /api/v1/badges/{id}:
 *  get:
 *      tags: [Badge]
 *      description: Trouver un badge par son Id
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
badgeRouter.get("/:id", badgeHandler.getBadgeById);

/**
 * @openapi
 * /api/v1/badges:
 *  post:
 *      tags: [Badge]
 *      description: Crée un badge
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
badgeRouter.post("/", badgeHandler.createBadge);

/**
 * @openapi
 * /api/v1/badges/{id}:
 *  put:
 *      tags: [Badge]
 *      description: Modifier un badge
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
 *         default: {"name": "feuille", "image": "image.png", "id_point": 2}
 *      responses:
 *        200:
 *          description: La requête s'est bien déroulée.
 */
badgeRouter.put("/:id", badgeHandler.updateBadge);

/**
 * @openapi
 * /api/v1/badges/{id}:
 *  delete:
 *      tags: [Badge]
 *      description: Supprimer un badge
 *      parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *      responses:
 *        200:
 *          description: La requête s'est bien déroulée.
 */
badgeRouter.delete("/:id", badgeHandler.deleteBadge);