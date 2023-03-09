import { Request, Response } from "express";
import { IService } from "../core/service.interface";
import { PointDto } from "../Dto/points.dto";


export class PointHandler {
	private PointService: IService<PointDto>;

	constructor(PointService: IService<PointDto>) {
		this.PointService = PointService;
	}

	/**
     * 
     * @param req 
     * @param res 
     * @returns 
     */
	getUsers = async (req: Request, res: Response) => {
		try {
			const result = await this.PointService.findAll();
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
	getUserById = async (req: Request, res: Response) => {
		try {
			const result = await this.PointService.findById(parseInt(req.params.id));
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
	createUser = async (req: Request, res: Response) => {
		try {
			const result = await this.PointService.create(req.body);
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
	updateUser = async (req: Request, res: Response) => {
		try {
			const result = await this.PointService.update(req.body, parseInt(req.params.id));
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
	deleteUser = async (req: Request, res: Response) => {
		try {
			const result = await this.PointService.delete(parseInt(req.params.id));
			return res
				.status(200)
				.json(result ? " Point d'interet supprimé" : "Point d'interet Non Supprimé");
		} catch (error) {
			return res.status(500).json(error);
		}
	};
}