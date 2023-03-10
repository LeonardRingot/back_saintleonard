import { Request, Response } from "express";
import { IService } from "../core/service.interface";
import { BadgeDto } from "../Dto/badge.dto";


export class BadgeHandler {
	private badgeService: IService<BadgeDto>;

	constructor(badgeService: IService<BadgeDto>) {
		this.badgeService = badgeService;
	}

	/**
     * 
     * @param req 
     * @param res 
     * @returns 
     */
	getBadges = async (req: Request, res: Response) => {
		try {
			const result = await this.badgeService.findAll();
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
	getBadgeById = async (req: Request, res: Response) => {
		try {
			const result = await this.badgeService.findById(parseInt(req.params.id));
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
	createBadge = async (req: Request, res: Response) => {
		try {
			const result = await this.badgeService.create(req.body);
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
	updateBadge = async (req: Request, res: Response) => {
		try {
			const result = await this.badgeService.update(req.body, parseInt(req.params.id));
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
	deleteBadge = async (req: Request, res: Response) => {
		try {
			const result = await this.badgeService.delete(parseInt(req.params.id));
			return res
				.status(200)
				.json(result ? " Badge supprimé" : "Badge Non Supprimé");
		} catch (error) {
			return res.status(500).json(error);
		}
	};
}