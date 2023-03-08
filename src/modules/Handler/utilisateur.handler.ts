import { Request, Response } from "express";
import { UserDto } from "../Dto/utilisateur.DTO";
import { IService } from "../Service/utilisateur.service";

const bcrypt = require("bcrypt");

export class UserHandler {
	private userService: IService<UserDto>;

	constructor(userService: IService<UserDto>) {
		this.userService = userService;
	}

	/**
     * 
     * @param req 
     * @param res 
     * @returns 
     */
	getUsers = async (req: Request, res: Response) => {
		try {
			const result = await this.userService.findAll();
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
			const result = await this.userService.findById(parseInt(req.params.id));
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
			req.body.password = await bcrypt.hash(req.body.password, 10);
			const result = await this.userService.create(req.body);
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
			if (req.body.password) {
				let hashedPassword = await bcrypt.hash(req.body.password, 10);
				req.body = { ...req.body, password: hashedPassword };
			}
			const result = await this.userService.update(req.body, parseInt(req.params.id));
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
			const result = await this.userService.delete(parseInt(req.params.id));
			return res
				.status(200)
				.json(result ? " Utilisateur supprimé" : "Utilisateur Non Supprimé");
		} catch (error) {
			return res.status(500).json(error);
		}
	};
}