import { AnimationHandler } from "./modules/Handler/animation.handler";
import { AuthentificationHandler } from "./modules/Handler/Authentification.handler";
import { BadgeHandler } from "./modules/Handler/badge.handler";
import { GoogleAuthHandler } from "./modules/Handler/googleAuthentification.handler";
import { ParcoursHandler } from "./modules/Handler/parcours.handler";
import { PointHandler } from "./modules/Handler/point.hadler";
import { QcmHandler } from "./modules/Handler/qcm.handler";
import { SimpleQuestionHandler } from "./modules/Handler/simpleQuestion.handler";
import { TokenHandler } from "./modules/Handler/token.handler";
import { UserHandler } from "./modules/Handler/utilisateur.handler";

import { AnimationRepository } from "./modules/Repository/animation.repository";
import { BadgeRepository } from "./modules/Repository/badge.repository";
import { ParcoursRepository } from "./modules/Repository/parcours.repository";
import { PointRepository } from "./modules/Repository/point.repository";
import { QcmRepository } from "./modules/Repository/qcm.repository";
import { SimpleQuestionRepository } from "./modules/Repository/simpleQuestion.repository";
import { TokenRepository } from "./modules/Repository/token.repository";
import { UserRepository } from "./modules/Repository/utilisateur.repository";

import { AnimationService } from "./modules/Service/animation.service";
import { GoogleAuthService } from "./modules/Service/GoogleAuthentification.service";
import { AuthentificationService } from "./modules/Service/AuthToken.service";
import { BadgeService } from "./modules/Service/badge.service";
import { ParcoursService } from "./modules/Service/parcours.service";
import { PointService } from "./modules/Service/point.service";
import { QcmService } from "./modules/Service/qcm.service";
import { SimpleQuestionService } from "./modules/Service/simpleQuestion.service";
import { TokenService } from "./modules/Service/token.service";
import { UserService } from "./modules/Service/utilisateur.service";

export const animationHandler = new AnimationHandler(new AnimationService(new AnimationRepository()));
export const badgeHandler = new BadgeHandler(new BadgeService(new BadgeRepository()));
export const parcoursHandler = new ParcoursHandler(new ParcoursService(new ParcoursRepository()));
export const pointHandler = new PointHandler(new PointService(new PointRepository()));
export const qcmHandler = new QcmHandler(new QcmService(new QcmRepository()));
export const simpleQuestionHandler = new SimpleQuestionHandler(new SimpleQuestionService(new SimpleQuestionRepository()));
export const tokenHandler = new TokenHandler(new TokenService(new TokenRepository()));
export const userHandler = new UserHandler(new UserService(new UserRepository()));
export const authentificationHandler = new AuthentificationHandler(new AuthentificationService(new TokenRepository(), new UserRepository()));
export const googleAuthHandler = new GoogleAuthHandler(new GoogleAuthService())