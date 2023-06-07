// import { Request, Response, NextFunction } from "express";
// import passport from "passport";
// import jwt from "jsonwebtoken";

// const handleJwtToken = (req: Request, res: Response, next: NextFunction) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({ error: "Unauthorized" });
//   }

//   const token = authHeader.slice(7);

//   try {
//     const decodedToken = jwt.verify(token, "secret-key");
//     req.user = decodedToken;
//     return next();
//   } catch (err: any) {
//     if (err.name === "TokenExpiredError") {
//       handleJwtTokenRefresh(req, res, next);
//     } else {
//       return res.status(401).json({ error: "Unauthorized" });
//     }
//   }
// };

// const handleGoogleToken = (req: Request, res: Response, next: NextFunction) => {
//   passport.authenticate(
//     "google",
//     { session: false },
//     async (err, user, info) => {
//       if (err) {
//         return res.status(401).json({ error: "Unauthorized" });
//       }

//       if (user) {
//         req.user = user;
//         return next();
//       }

//       if (info?.scope === "https://www.googleapis.com/auth/userinfo.profile") {
//         handleGoogleTokenRefresh(req, res, next);
//       } else {
//         return res.status(401).json({ error: "Unauthorized" });
//       }
//     }
//   )(req, res, next);
// };

// const handleJwtTokenRefresh = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const refreshToken = req.body.refreshToken;

//   if (!refreshToken) {
//     return res.status(401).json({ error: "Unauthorized" });
//   }

//   try {
//     const decodedToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
//     const accessToken = generateAccessToken(decodedToken.userId);
//     req.user = { userId: decodedToken.userId, accessToken };
//     return next();
//   } catch (err) {
//     return res.status(401).json({ error: "Unauthorized" });
//   }
// };

// const handleGoogleTokenRefresh = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const refreshToken = req.body.refreshToken;

//   if (!refreshToken) {
//     return res.status(401).json({ error: "Unauthorized" });
//   }

//   try {
//     const { tokens } = await oauth2Client.refreshToken(refreshToken);
//     const decodedToken = jwt.decode(tokens.id_token);
//     req.user = decodedToken;
//     return next();
//   } catch (err) {
//     return res.status(401).json({ error: "Unauthorized" });
//   }
// };

// export const authMiddleware = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   if (req.headers.authorization?.startsWith("Bearer ")) {
//     handleJwtToken(req, res, next);
//   } else {
//     handleGoogleToken(req, res, next);
//   }
// };
