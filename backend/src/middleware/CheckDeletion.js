import UserModel from "../models/user.model.js";

export const CheckDeletion = async (req, res, next) => {

    if (!req.userId) {
        return next();
    }

    try {
        const user = await UserModel.findById(req.userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        req.user = user;
      
        if (user.deletedAt) {
            return res.status(403).json({
                success: false,
                status: "scheduled_for_deletion",
                message: "This account is scheduled for deletion and is currently frozen.",
            });
        }

        next();
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error" });
    }

}