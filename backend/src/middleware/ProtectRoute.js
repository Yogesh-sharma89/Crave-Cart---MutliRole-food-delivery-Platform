

export const ProtectRoute = async (req, res, next) => {

    if (!req.userId) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized. Please log in.",
        });
    }
    next();
}