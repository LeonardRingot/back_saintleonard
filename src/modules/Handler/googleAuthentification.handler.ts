import { Request, Response } from 'express';
import { GoogleAuthService } from '../Service/GoogleAuthentification.service';


export class GoogleAuthHandler {
    private authService: GoogleAuthService;


    constructor(authService: GoogleAuthService) {
        this.authService = authService;
    }

    authenticateGoogle = async(req: Request, res: Response) => {
        try {
            // Use passport to authenticate with Google
            const result = await this.authService.authenticateGoogle(req, res);
            if (result === null) return res.status(404).send();
			if (!res.headersSent) {
                res.status(200).json(result);
            }
        } catch (error) {
            res.status(500).json(`problème au nivau de l'appel google : ${error}`);
        }
    }

    authenticateGoogleCallback = async(req: Request, res: Response) => {
        try {
            // Use passport to handle the Google authentication callback
            const result = await this.authService.authenticateGoogleCallback(req, res);
            if (result === null) return res.status(404).send();
			if (!res.headersSent) {
                res.status(200).json(result);
            };
        } catch (error) {
            res.status(500).json(`problème au nivau du callback google : ${error}`);
        }
    }
}