import { Request, Response } from 'express';
import { GoogleAuthService } from '../Service/GoogleAuthentification.service';


export class GoogleAuthHandler {
    private authService: GoogleAuthService;


    constructor(authService: GoogleAuthService) {
        this.authService = authService;
    }

    authenticateGoogle(req: Request, res: Response) {
        // Use passport to authenticate with Google
        this.authService.authenticateGoogle(req, res);
    }

    authenticateGoogleCallback(req: Request, res: Response) {
        // Use passport to handle the Google authentication callback
        this.authService.authenticateGoogleCallback(req, res);
    }
}