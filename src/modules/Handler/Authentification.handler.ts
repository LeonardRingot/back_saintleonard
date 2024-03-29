import { Request, Response } from "express";
import { AuthIService } from "../core/service.interface";
import { TokenDto } from "../Dto/token.dto";
import { AuthUserDto, AuthAdminUserDto } from "../Dto/utilisateur.dto";


export class AuthentificationHandler {
    private authentificationService: AuthIService<AuthUserDto, TokenDto, AuthAdminUserDto>

    constructor(service: AuthIService<AuthUserDto, TokenDto,AuthAdminUserDto>) {
        this.authentificationService = service
    }

    login = async (req: Request, res: Response) => {
        try {
            const { pseudo, password } = req.body
            const result = await this.authentificationService.login({ pseudo, password })

            if (!result) {
                return res.status(404).json({ message: 'pseudo not in database.' });
            }
            res.status(200).json(result)

        } catch (err: any) {
            res.status(401).json(err.message)
        }

    };
    loginAdmin = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body
            const result = await this.authentificationService.loginAdmin({ email, password })

            if (!result) {
                return res.status(404).json({ message: 'email not in database.' });
            }
            res.status(200).json(result)

        } catch (err: any) {
            res.status(401).json(err.message)
        }

    };

    refreshToken = async (req: Request, res: Response) => {

        const refreshToken = req.body.token
        if (refreshToken == null) return res.sendStatus(400)

        try {
            const result = await this.authentificationService.refreshToken(req.body);
            res.status(200).json(result)

        } catch (err) {
            if (err instanceof Error) {
                res.status(403).json(err.message)
            }

            console.log('Unexpected error in handler', err);
        }

    };

}