import cloudinary from "../config/cloudinary.js";
import UserModel from "../models/user.model.js";
import { UploadToCloudinary } from "../service/cloudinary.service.js";
import asyncHandler from "../utils/asyncHandler.js";
import CheckPassword from "../utils/checkPassword.js";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>_\-\\[\]/+=~`';])\S{8,64}$/

export const UpdateProfileAvatar = asyncHandler(async (req, res) => {

    const profileFile = req.file;

    const user = await UserModel.findById(req.userId).select("-password");


    if (!user) {
        res.status(404);
        throw new Error("User not found")
    }


    let oldProfileId = user.avatarId;

    if (profileFile) {

        const uploadRes = await UploadToCloudinary(profileFile.path, "avatars");

        user.avatarUrl = uploadRes.secure_url;
        user.avatarId = uploadRes.public_id;

        //delete the old one 

        if (oldProfileId) {
            await cloudinary.uploader.destroy(oldProfileId);
        }

        await user.save();
    }

    res.status(200).json({
        success: true,
        message: "Avatar updated successfully",
        user
    })

})

export const UpdatePassword = asyncHandler(async (req, res) => {

    const { oldPassword, newPassword } = req.body;

    if (!oldPassword.trim() || !newPassword.trim()) {
        res.status(400).json({
            success: false,
            message: "Invalid password"
        })
    }

    if (!passwordRegex.test(newPassword)) {
        res.status(400).json({
            success: false,
            message: "Password must be 8–64 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character. Spaces are not allowed"
        })
    }

    const userId = req.userId;

    const user = await UserModel.findById(userId);

    if(!user){
        res.status(404).json({
            success:false,
            message:"User not found"
        })
        return;
    }

    if(!user.password){
        return res.status(400).json({
            success:false,
            message:"You don't have any password"
        })
    }

    //check if this password exists
    const isPasswordMatch = await CheckPassword(oldPassword,user.password);

    if(!isPasswordMatch){
        res.status(400).json({
            success:false,
            message:"Invalid old password"
        })
    }

    //Password match , then update it's password
    user.password = newPassword;
    await user.save();

    return res.status(200).json({
        success:true,
        message:"Password updated successfully",
    })
})