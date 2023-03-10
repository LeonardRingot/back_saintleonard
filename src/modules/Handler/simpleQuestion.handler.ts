import { Request, Response } from "express";
import { IService } from "../core/service.interface";
import { SimpleQuestionDto } from "../Dto/simpleQuestion.dto";


export class SimpleQuestionHandler {
	private simpleQuestionService: IService<SimpleQuestionDto>;

	constructor(simpleQuestionService: IService<SimpleQuestionDto>) {
		this.simpleQuestionService = simpleQuestionService;
	}

	/**
     * 
     * @param req 
     * @param res 
     * @returns 
     */
	getSimpleQuestions = async (req: Request, res: Response) => {
		try {
			const result = await this.simpleQuestionService.findAll();
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
	getSimpleQuestionById = async (req: Request, res: Response) => {
		try {
			const result = await this.simpleQuestionService.findById(parseInt(req.params.id));
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
	createSimpleQuestion = async (req: Request, res: Response) => {
		try {

			const result = await this.simpleQuestionService.create(req.body);
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
	updateSimpleQuestion = async (req: Request, res: Response) => {
		try {
			const result = await this.simpleQuestionService.update(req.body, parseInt(req.params.id));
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
	deleteSimpleQuestion = async (req: Request, res: Response) => {
		try {
			const result = await this.simpleQuestionService.delete(parseInt(req.params.id));
			return res
				.status(200)
				.json(result ? " Question Simple supprimé" : "Question Simple Non Supprimé");
		} catch (error) {
			return res.status(500).json(error);
		}
	};
}