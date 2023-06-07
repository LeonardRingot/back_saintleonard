import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import { User } from '../Models/utilisateur.model';
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
            passport.authenticate('google', (error:Error | null , user: User | null, _info: any) => {
                if (error) {
                    throw error;
                }
                if (!user) {
                    return res.status(401).send('unauthorized');
                }
                // User successfully authenticated, return user object
                return res.status(200).json(user);
            })(req, res);
        } catch (error) {
            res.status(500).json(`problème au nivau du callback google : ${error}`);
        }
    }
}