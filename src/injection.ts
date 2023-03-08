import { UserHandler } from "./modules/Handler/utilisateur.handler";
import { UserRepository } from "./modules/Repository/utilisateur.repository";
import { UserService } from "./modules/Service/utilisateur.service";

export const userHandler = new UserHandler(new UserService(new UserRepository()));