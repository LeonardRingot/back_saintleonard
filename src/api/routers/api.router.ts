import { Router } from "express";
import { router } from "./router";
import { userRouter } from "./utilisateur.router";

export const apiRouter = Router()

apiRouter.use('/api/v1', router)
apiRouter.use('/api/v1/users', userRouter)