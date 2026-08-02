import { verifyToken } from "../utils/token.js";

export const ProtectRoute  = async(req,res,next)=>{

    const token = req.cookies?.token;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized",
        });
    }

    const payload = verifyToken(token);

    req.userId = payload.userId;

    next();
}