import { IRepository, IRepositoryUser } from "../core/repository.interface";
import { AuthIService } from "../core/service.interface";
import { TokenDto } from "../Dto/token.dto"; 
import { AuthAdminUserDto, AuthUserDto, FullUserDto, UserDto } from "../Dto/utilisateur.dto";
import { Token } from "../Models/token.model";

import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import passport from 'passport';
import passportJwt from 'passport-jwt';

const { Strategy: JwtStrategy, ExtractJwt } = passportJwt;

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'your_jwt_secret_here',
};

passport.use(
    new JwtStrategy(jwtOptions, (jwt_payload, done) => {
        done(null, jwt_payload);
    })
);

export class AuthentificationService implements AuthIService<AuthUserDto, TokenDto, AuthAdminUserDto> {

    private tokenRepository: IRepository<TokenDto>
    private userRepository: IRepositoryUser<FullUserDto, UserDto>

    constructor(_tokenRepository: IRepository<TokenDto>, _userRepository: IRepositoryUser<FullUserDto, UserDto>) {
        this.tokenRepository = _tokenRepository;
        this.userRepository = _userRepository;
    }
    async loginAdmin(credentials: AuthAdminUserDto): Promise<any> {
        try {
            const user = await this.userRepository.findByEmail(credentials.email)

            // TODO 404
            if (!user) return 
            if (!await bcrypt.compare(credentials.password, user.password)) {
                throw new Error('Invalid credentials')
            }
            
            const accessToken = AuthentificationService.generateAccessToken({ pseudo: user.pseudo, id: user.id_pseudo, isAdmin: user.is_admin });
            const refreshToken = AuthentificationService.generateRefreshToken({ pseudo: user.pseudo, id: user.id_pseudo, isAdmin: user.is_admin });

               // enregister le token en database
            
            // Trouver un token par id_pseudo
            // si occurence trouvé MODIFIER le token existant par le nouveau token
            // si aucune occurance Creer token 
            Token.create(
            {
                refresh_token: refreshToken,
                id_pseudo: user.id_pseudo,
            })
            const idPseudo = user.id_pseudo;
            return { refreshToken , accessToken, idPseudo }

        } catch (err) {
            console.log('service', err)
            throw err
        }
    }

    async login(credentials: AuthUserDto): Promise<any> {
        console.log("test service");

        try {
            const user = await this.userRepository.findByPseudo(credentials.pseudo)

            // TODO 404
            if (!user) return 
            if (!await bcrypt.compare(credentials.password, user.password)) {
                throw new Error('Invalid credentials')
            }
            
            const accessToken = AuthentificationService.generateAccessToken({ pseudo: user.pseudo, id: user.id_pseudo, isAdmin: user.is_admin });
            const refreshToken = AuthentificationService.generateRefreshToken({ pseudo: user.pseudo, id: user.id_pseudo, isAdmin: user.is_admin });

               // enregister le token en database
            
            // Trouver un token par id_pseudo
            // si occurence trouvé MODIFIER le token existant par le nouveau token
            // si aucune occurance Creer token 
            Token.create(
            {
                refresh_token: refreshToken,
                id_pseudo: user.id_pseudo,
            })
            const idPseudo = user.id_pseudo;
            return { refreshToken , accessToken, idPseudo }

        } catch (err) {
            console.log('service', err)
            throw err
        }
    }

    async refreshToken(token: TokenDto): Promise<any> {

        try {
            const tokens = await this.tokenRepository.findAll()
            let refreshTokens: any = []
            tokens.forEach((token: any) => {
                refreshTokens.push(token.token)
            })
            if (!refreshTokens.includes(token.refresh_token)) throw new Error('Forbidden')
            const decoded = jwt.verify(token.refresh_token, process.env.REFRESH_TOKEN_SECRET!) as JwtPayload;
            const user = await this.userRepository.findByPseudo(decoded.pseudo)
            if (!user) return
            const newAccessToken = AuthentificationService.generateAccessToken({ pseudo: user.pseudo, id: user.id_pseudo, isAdmin: user.is_admin });
            return { user_id: parseInt(decoded.id_pseudo), token: newAccessToken }
        } catch (err) {
            console.log('service', err)
            throw err
        }
    }

    // Fonction pour générer un nouveau Access Token
    static generateAccessToken(payload: any) {
        // Générer un nouveau Access Token avec une durée de vie limitée
        const token = jwt.sign(payload, 'your_jwt_secret_here', { expiresIn: '30m' });
        return token;
    }
    
      // Fonction pour générer un nouveau Refresh Token
    static generateRefreshToken(payload: any) {
        // Générer un nouveau Refresh Token avec une durée de vie plus longue
        const token = jwt.sign(payload, 'your_jwt_secret_here', { expiresIn: '7d' });
        return token;
    }
}

