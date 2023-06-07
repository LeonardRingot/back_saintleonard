import { Router } from "express";
import { animationRouter } from "./animation.router";
import { authRouter } from "./Authentification.router";
import { badgeRouter } from "./badge.router";
import { googleAuthentificationRouter } from "./GoogleAuthentification.router";
import { parcoursRouter } from "./parcours.router";
import { pointRouter } from "./point.router";
import { qcmRouter } from "./qcm.router";
import { simpleQuestionRouter } from "./simpleQuestion.router";
import { tokenRouter } from "./token.router";
import { userRouter } from "./utilisateur.router";

export const apiRouter = Router()

apiRouter.use('/api/v1/auth', authRouter)
apiRouter.use('/api/v1/auth/google', googleAuthentificationRouter)

apiRouter.use('/api/v1/animations', animationRouter)
apiRouter.use('/api/v1/badges', badgeRouter)
apiRouter.use('/api/v1/parcours', parcoursRouter)
apiRouter.use('/api/v1/points', pointRouter)
apiRouter.use('/api/v1/qcms', qcmRouter)
apiRouter.use('/api/v1/simplequestions', simpleQuestionRouter)
apiRouter.use('/api/v1/tokens', tokenRouter)
apiRouter.use('/api/v1/users', userRouter)