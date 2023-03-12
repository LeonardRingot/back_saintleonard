import { Router } from "express";
import { parcoursHandler } from "~/injection";

export const parcoursRouter = Router();

/**
 * @swagger
 * tags:
 *      name: Parcours
 *      description: Gestion des routes dédié aux parcours
 */

/**
 * @openapi
 * /api/v1/parcours:
 *      get:
 *          tags: [Parcours]
 *          description: liste des parcours
 *          responses:
 *              200:
 *                  description: la requète s'est bien déroulée.
 */
parcoursRouter.get("/", parcoursHandler.getParcours);

/**
 * @openapi
 * /api/v1/parcours/{id}:
 *  get:
 *      tags: [Parcours]
 *      description: Trouver un parcours par son Id
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
parcoursRouter.get("/:id", parcoursHandler.getParcoursById);

/**
 * @openapi
 * /api/v1/parcours:
 *  post:
 *      tags: [Parcours]
 *      description: Crée un parcours
 *      consumes:
 *       - application/json
 *      parameters:
 *       - name: JSON
 *         in: body
 *         required: true
 *         type: object
 *         default: {"name": "Le Parcours",}
 *      responses:
 *        200:
 *          description: La requête s'est bien déroulée.
 */
parcoursRouter.post("/", parcoursHandler.createParcours);

/**
 * @openapi
 * /api/v1/parcours/{id}:
 *  put:
 *      tags: [Parcours]
 *      description: Modifier un parcours
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
 *         default: {"name": "Le Parcours",}
 *      responses:
 *        200:
 *          description: La requête s'est bien déroulée.
 */
parcoursRouter.put("/:id", parcoursHandler.updateParcours);

/**
 * @openapi
 * /api/v1/parcours/{id}:
 *  delete:
 *      tags: [Parcours]
 *      description: Supprimer un parcours
 *      parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *      responses:
 *        200:
 *          description: La requête s'est bien déroulée.
 */
parcoursRouter.delete("/:id", parcoursHandler.deleteParcours);