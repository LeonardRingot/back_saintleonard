import { Request, Response } from "express";
import { IService } from "../core/service.interface";
import { TokenDto } from "../Dto/token.dto";


export class TokenHandler {
	private tokenService: IService<TokenDto>;

	constructor(tokenService: IService<TokenDto>) {
		this.tokenService = tokenService;
	}

	/**
     * 
     * @param req 
     * @param res 
     * @returns 
     */
	getTokens = async (req: Request, res: Response) => {
		try {
			const result = await this.tokenService.findAll();
			if (result === null) return res.status(404).send();
			res.status(200).json(result);
		} catch (err) {
			// logger.error(err); for the errors log
			res.status(500).json(`problème au nivau de handler : ${err}`);
		}
	};

    /**
     * 
     * @param req 
     * @param res 
     * @returns 
     */
	getTokenById = async (req: Request, res: Response) => {
		try {
			const result = await this.tokenService.findById(parseInt(req.params.id));
			if (result === null) {
				return res.status(404).send();
			}
			return res.status(200).json(result);
		} catch (error) {
			return res.status(500).json(error);
		}
	};

    /**
     * 
     * @param req 
     * @param res 
     * @returns 
     */
	createToken = async (req: Request, res: Response) => {
		try {
			const result = await this.tokenService.create(req.body);
			return res.status(200).json(result);
		} catch (error) {
			return res.status(500).json(error);
		}
	};

    /**
     * 
     * @param req 
     * @param res 
     * @returns 
     */
	updateToken = async (req: Request, res: Response) => {
		try {
			const result = await this.tokenService.update(req.body, parseInt(req.params.id));
			return res.status(200).json(result);
		} catch (error) {
			return res.status(500).json(error);
		}
	};

    /**
     * 
     * @param req 
     * @param res 
     * @returns 
     */
	deleteToken = async (req: Request, res: Response) => {
		try {
			const result = await this.tokenService.delete(parseInt(req.params.id));
			return res
				.status(200)
				.json(result ? " Token supprimé" : "Token Non Supprimé");
		} catch (error) {
			return res.status(500).json(error);
		}
	};
}