import { Request, Response } from "express";
import { IService } from "../core/service.interface";
import { AnimationDto } from "../Dto/animation.dto";


export class AnimationHandler {
	private animationService: IService<AnimationDto>;

	constructor(animationService: IService<AnimationDto>) {
		this.animationService = animationService;
	}

	/**
     * 
     * @param req 
     * @param res 
     * @returns 
     */
	getAnimations = async (req: Request, res: Response) => {
		try {
			const result = await this.animationService.findAll();
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
	getAnimationById = async (req: Request, res: Response) => {
		try {
			const result = await this.animationService.findById(parseInt(req.params.id));
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
	createAnimation = async (req: Request, res: Response) => {
		try {
			const result = await this.animationService.create(req.body);
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
	updateAnimation = async (req: Request, res: Response) => {
		try {
			const result = await this.animationService.update(req.body, parseInt(req.params.id));
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
	deleteAnimation = async (req: Request, res: Response) => {
		try {
			const result = await this.animationService.delete(parseInt(req.params.id));
			return res
				.status(200)
				.json(result ? " Animation supprimé" : "Animation Non Supprimé");
		} catch (error) {
			return res.status(500).json(error);
		}
	};
}