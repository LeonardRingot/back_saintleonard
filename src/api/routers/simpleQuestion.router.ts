import { Router } from "express";
import { simpleQuestionHandler } from "~/injection";

export const simpleQuestionRouter = Router();

/**
 * @swagger
 * tags:
 *      name: SimpleQuestion
 *      description: Gestion des routes dédié aux Questions Simples
 */

/**
 * @openapi
 * /api/v1/simple_questions:
 *      get:
 *          tags: [SimpleQuestion]
 *          description: liste des Questions Simples
 *          responses:
 *              200:
 *                  description: la requète s'est bien déroulée.
 */
simpleQuestionRouter.get("/", simpleQuestionHandler.getSimpleQuestions);

/**
 * @openapi
 * /api/v1/simplequestions/{id}:
 *  get:
 *      tags: [SimpleQuestion]
 *      description: Trouver un utilisateur par son Id
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
simpleQuestionRouter.get("/:id", simpleQuestionHandler.getSimpleQuestionById);

/**
 * @openapi
 * /api/v1/simplequestions:
 *  post:
 *      tags: [SimpleQuestion]
 *      description: Crée un utilisateur
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
simpleQuestionRouter.post("/", simpleQuestionHandler.createSimpleQuestion);

/**
 * @openapi
 * /api/v1/simplequestions/{id}:
 *  put:
 *      tags: [SimpleQuestion]
 *      description: Modifier un utilisateur
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
simpleQuestionRouter.put("/:id", simpleQuestionHandler.updateSimpleQuestion);

/**
 * @openapi
 * /api/v1/simplequestions/{id}:
 *  delete:
 *      tags: [SimpleQuestion]
 *      description: Supprimer un utilisateur
 *      parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *      responses:
 *        200:
 *          description: La requête s'est bien déroulée.
 */
simpleQuestionRouter.delete("/:id", simpleQuestionHandler.deleteSimpleQuestion);