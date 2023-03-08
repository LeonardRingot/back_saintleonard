import { Request, Response } from "express";

function getHello(req: Request, res: Response) {

    res.status(200).json("Hello world !")
}

const handler = {getHello}

export default handler;