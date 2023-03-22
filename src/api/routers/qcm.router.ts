import { Router } from "express";
import { qcmHandler } from "~/injection";

export const qcmRouter = Router();

/**
 * @swagger
 * tags:
 *      name: QCM
 *      description: Gestion des routes dédié aux QCM
 */

/**
 * @openapi
 * /api/v1/qcms:
 *      get:
 *          tags: [QCM]
 *          description: liste des QCM
 *          responses:
 *              200:
 *                  description: la requète s'est bien déroulée.
 */
qcmRouter.get("/", qcmHandler.getQcms);

/**
 * @openapi
 * /api/v1/qcms/{id}:
 *  get:
 *      tags: [QCM]
 *      description: Trouver un QCM par son Id
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
qcmRouter.get("/:id", qcmHandler.getQcmById);

/**
 * @openapi
 * /api/v1/qcms:
 *  post:
 *      tags: [QCM]
 *      description: Crée un QCM
 *      consumes:
 *       - application/json
 *      parameters:
 *       - name: JSON
 *         in: body
 *         required: true
 *         type: object
 *         default: {question: "Quel est la bonne réponse ?", correct_response: "d", optiona: "a", optionb: "b", optionc: "c", optiond: "La reponse D",}
 *      responses:
 *        200:
 *          description: La requête s'est bien déroulée.
 */
qcmRouter.post("/", qcmHandler.createQcm);

/**
 * @openapi
 * /api/v1/qcms/{id}:
 *  put:
 *      tags: [QCM]
 *      description: Modifier un QCM
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
 *         default: {question: "Quel est la réponse ?", correct_response: "d", optiona: "a", optionb: "b", optionc: "c", optiond: "La reponse D",}
 *      responses:
 *        200:
 *          description: La requête s'est bien déroulée.
 */
qcmRouter.put("/:id", qcmHandler.updateQcm);

/**
 * @openapi
 * /api/v1/qcms/{id}:
 *  delete:
 *      tags: [QCM]
 *      description: Supprimer un QCM
 *      parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *      responses:
 *        200:
 *          description: La requête s'est bien déroulée.
 */
qcmRouter.delete("/:id", qcmHandler.deleteQcm);