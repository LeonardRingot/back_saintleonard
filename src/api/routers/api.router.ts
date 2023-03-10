import { Router } from "express";
import { animationRouter } from "./animation.router";
import { badgeRouter } from "./badge.router";
import { parcoursRouter } from "./parcours.router";
import { pointRouter } from "./point.router";
import { qcmRouter } from "./qcm.router";
import { router } from "./router";
import { simpleQuestionRouter } from "./simpleQuestion.router";
import { tokenRouter } from "./token.router";
import { userRouter } from "./utilisateur.router";

export const apiRouter = Router()

apiRouter.use('/api/v1', router)

apiRouter.use('/api/v1/animations', animationRouter)
apiRouter.use('/api/v1/badges', badgeRouter)
apiRouter.use('/api/v1/parcours', parcoursRouter)
apiRouter.use('/api/v1/points', pointRouter)
apiRouter.use('/api/v1/qcms', qcmRouter)
apiRouter.use('/api/v1/simplequestions', simpleQuestionRouter)
apiRouter.use('/api/v1/tokens', tokenRouter)
apiRouter.use('/api/v1/users', userRouter)