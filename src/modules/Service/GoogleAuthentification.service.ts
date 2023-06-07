import passport from 'passport';
import { Strategy as GoogleStrategy, Profile, VerifyCallback } from 'passport-google-oauth20';
import { User } from '../Models/utilisateur.model';


export class GoogleAuthService {
    constructor() {
        passport.use(
            new GoogleStrategy(
                {
                clientID: process.env.GOOGLE_CLIENT_ID!,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
                callbackURL: `${process.env.API_BASE_URL}/api/v1/auth/google/callback`,
                },
                async (accessToken: string,
                    refreshToken: string,
                    profile: Profile,
                    done: VerifyCallback) => {
                    try {
                        const email = profile.emails?.[0].value;
                        const firstName = profile.name?.givenName;
                        let user = await User.findOne({
                            where: {
                                email: email
                            }
                        });
                        if (!user) {
                        user = await User.create({ email:email, pseudo: firstName });
                        } 
                        done(null, { id: user.id_pseudo, email: user.email, accessToken, refreshToken });
                    } catch (err: any) {
                        console.error(err);
                    }
                }
            )
        );
    }

    public authenticateGoogle = passport.authenticate('google', {
        scope: ['profile', 'email'],
        session: false,
    });
}