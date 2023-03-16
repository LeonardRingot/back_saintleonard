import { Request } from 'express';
import passport, { Profile } from 'passport';
import { Strategy as GoogleStrategy, VerifyCallback } from 'passport-google-oauth20';
import { User } from '~/modules/Models/utilisateur.model';
import { IRepository, IRepositoryUser } from '../core/repository.interface';
import { Token } from '../Models/token.model';
import { AuthentificationService } from './AuthToken.service';

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            callbackURL: process.env.GOOGLE_CALLBACK_URL!
        }, async (
            accessToken: string, 
            refreshToken: string, 
            profile: Profile, 
            done: VerifyCallback
        ) => {
            try {
                // Recherchez l'utilisateur dans la base de données par email
                const mail = profile.emails![0].value;
                const existingUser = await User.findAll({
                    where: {
                        email: mail
                    }
                });

                if (existingUser) {
                    // Si l'utilisateur existe, retournez-le
                    done(null, existingUser);
                } else {
                    // Sinon, créez un nouvel utilisateur avec les données du profil Google
                    const newUser = new User({
                        email: profile.emails![0].value,
                        firstName: profile.name?.givenName,
                        lastName: profile.name?.familyName
                    });

                    await newUser.save();
                    done(null, newUser);
                }
            } catch (err: any) {
                done(err, undefined);
            }
        }
    )
);

export class AuthGoogleService  {

    async loginGoogle(req: Request): Promise<any> {
        return new Promise((resolve, reject) => {
            passport.authenticate('google', { scope: ['profile', 'email'] })(req, (err: any, user: any) => {
                if (err) {
                    reject(err);
                } else if (!user) {
                    reject(new Error('Failed to authenticate user'));
                } else {
                    // Générer le token JWT et le renvoyer à l'utilisateur
                    const accessToken = AuthentificationService.generateAccessToken(user);
                    const refreshToken = AuthentificationService.generateRefreshToken(user);

                    resolve({ accessToken, refreshToken });
                }
            });
        });
    }
}