import { Router } from "express";
import { animationHandler } from "~/injection";

export const animationRouter = Router();

/**
 * @swagger
 * tags:
 *      name: Animation
 *      description: Gestion des routes dédié aux animations
 */

/**
 * @openapi
 * /api/v1/animations:
 *      get:
 *          tags: [Animation]
 *          description: liste des animations
 *          responses:
 *              200:
 *                  description: la requète s'est bien déroulée.
 */
animationRouter.get("/", animationHandler.getAnimations);

/**
 * @openapi
 * /api/v1/animations/{id}:
 *  get:
 *      tags: [Animation]
 *      description: Trouver un animation par son Id
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
animationRouter.get("/:id", animationHandler.getAnimationById);

/**
 * @openapi
 * /api/v1/animations:
 *  post:
 *      tags: [Animation]
 *      description: Crée un animation
 *      consumes:
 *       - application/json
 *      parameters:
 *       - name: JSON
 *         in: body
 *         required: true
 *         type: object
 *         default: {"firstname": "Fabrice",}
 *      responses:
 *        200:
 *          description: La requête s'est bien déroulée.
 */
animationRouter.post("/", animationHandler.createAnimation);

/**
 * @openapi
 * /api/v1/animations/{id}:
 *  put:
 *      tags: [Animation]
 *      description: Modifier un animation
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
 *         default: {"firstname": "Fabrice",}
 *      responses:
 *        200:
 *          description: La requête s'est bien déroulée.
 */
animationRouter.put("/:id", animationHandler.updateAnimation);

/**
 * @openapi
 * /api/v1/animations/{id}:
 *  delete:
 *      tags: [Animation]
 *      description: Supprimer un animation
 *      parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *      responses:
 *        200:
 *          description: La requête s'est bien déroulée.
 */
animationRouter.delete("/:id", animationHandler.deleteAnimation);