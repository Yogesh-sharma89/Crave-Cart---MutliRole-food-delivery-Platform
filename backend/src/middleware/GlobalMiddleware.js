
import { verifyToken } from "../utils/token.js";

export const GlobalMiddleware = async (req, res, next) => {

    const token = req.cookies?.token;

    if (!token) {
        req.userId = null;
        return next();
    }

    try {
        const payload = verifyToken(token);
        req.userId = payload.userId; 
    } catch (err) {
        req.userId = null; // Token was malformed or expired
    }

    next();
}