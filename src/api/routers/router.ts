import { Router } from "express";
import handler from "./handler";

export const router = Router();

router.get('/hello', handler.getHello);