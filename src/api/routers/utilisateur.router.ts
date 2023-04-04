import { Router } from "express";
import { userHandler } from "~/injection";

export const userRouter = Router();

/**
 * @swagger
 * tags:
 *      name: User
 *      description: Gestion des routes dédié aux utilisateurs
 */

/**
 * @openapi
 * /api/v1/users:
 *      get:
 *          tags: [User]
 *          description: liste des utilisateurs
 *          responses:
 *              200:
 *                  description: la requète s'est bien déroulée.
 */
userRouter.get("/", userHandler.getUsers);

/**
 * @openapi
 * /api/v1/users/{id}:
 *  get:
 *      tags: [User]
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
userRouter.get("/:id", userHandler.getUserById);

/**
 * @openapi
 * /api/v1/users:
 *  post:
 *      tags: [User]
 *      description: Crée un utilisateur
 *      consumes:
 *       - application/json
 *      parameters:
 *       - name: JSON
 *         in: body
 *         required: true
 *         type: object
 *         default: {"pseudo": "Raph", "password": "pizza", "email": "raph@ninja.piz", "birthdate": "05/05/1984", "is_admin": false }
 *      responses:
 *        200:
 *          description: La requête s'est bien déroulée.
 */
userRouter.post("/", userHandler.createUser);

/**
 * @openapi
 * /api/v1/users/{id}:
 *  put:
 *      tags: [User]
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
 *         default: {"pseudo": "Raph", "password": "pizza", "email": "raph@ninja.piz", "birthdate": "05/05/1984", "is_admin": false }
 *      responses:
 *        200:
 *          description: La requête s'est bien déroulée.
 */
userRouter.put("/:id", userHandler.updateUser);

/**
 * @openapi
 * /api/v1/users/{id}:
 *  delete:
 *      tags: [User]
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
userRouter.delete("/:id", userHandler.deleteUser);