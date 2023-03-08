import { Router } from "express";
import handler from "../../modules/Handler/handler";

export const router = Router();

router.get('/hello', handler.getHello);