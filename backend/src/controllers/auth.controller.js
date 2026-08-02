import UserModel from "../models/user.model.js";
import { verifyToken, GenerateJwtToken } from "../utils/token.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import crypto from "crypto";
import SendMail from "../utils/SendMail.js";
import { ForgotPasswordMailTemplate } from "../templates/ForgotPassword.js";
import { ResetPasswordTemplate } from "../templates/ResetPassword.js";
import { auth } from "../config/firebase.js";
import asyncHandler from "../utils/asyncHandler.js";

dotenv.configDotenv();


const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const Signup = async (req, res) => {
    try {

        const { fullname, email, password, phone, role } = req.body;

        if (!fullname.trim() || !email.trim() || !password.trim() || !phone.trim() || !role.trim()) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (fullname.length < 3 || fullname.length > 50) {
            return res.status(400).json({ message: "Invalid fullname , maintain fullname limit" })
        }

        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email" })
        }

        if (phone.length < 10) {
            return res.status(400).json({ message: "Phone number should be exact 10 digits long " })
        }

        ///check if this user already exists in db 

        const existingUser = await UserModel.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User Already exists" })
        }

        //If user not exists then create user in DB 
        const user = await UserModel.create({
            fullname,
            email,
            password,
            role,
            phone,
        })

        // generate token 
        const token = GenerateJwtToken(user._id);

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user
        })


    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
}

export const SignIn = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required" })
        }

        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email" })
        }


        const existingUser = await UserModel.findOne({ email });

        if (!existingUser) {
            return res.status(400).json({ message: "Please create you account before login" })
        }

        if (!existingUser.password) {
            return res.status(400).json({ message: "You don't have password! Continue with google " })
        }

        //then check the token from cookies and compare the password
        const isPasswordMatch = await bcrypt.compare(password, existingUser?.password);

        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Invalid email or password" })
        }

        const jwtToken = GenerateJwtToken(existingUser._id);

        res.cookie("token", jwtToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days

        });

        return res.status(200).json({
            message: "User login successfull", user: {
                ...existingUser, password: undefined
            }
        })

    } catch (err) {
        console.log(err)
        return res.status(400).json({ message: `error in user login controller ${err.message}` })
    }
}

export const SignOut = async (req, res) => {
    try {

        res.clearCookie("token");

        return res.status(200).json({ message: "User logout successfully" })

    } catch (err) {
        return res.status(500).json({ message: "Failed to logout . Interal server error" })
    }
}

export const checkAuth = async (req, res) => {

    const userId = req.userId;

    try {

        const user = await UserModel.findById(userId).select("-password");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            message: "User got successfully",
            success: true,
            user
        })




    } catch (err) {
        return res.status(400).json({
            message: "Failed to get user details",
            success: false
        })

    }
}

export const ForgotPassword = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return rs.status(400).json({
            message: "Email is required",
            success: false
        })
    }

    try {

        //find the user ;

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            })
        }

        //if user exists then create a strong reset token and save in db with expiry

        const token = crypto.randomBytes(32).toString("base64url");

        user.resetPasswordToken = token,
        user.resetPasswordTokenExpireAt = Date.now() + 30 * 60 * 1000; //30 minutes

        await user.save();

        //now send email

        await SendMail({
            subject: "Reset Your CraveCart Password 🔒",
            html: ForgotPasswordMailTemplate.replaceAll("{{token}}", user.resetPasswordToken),
            email: user.email
        })

        return res.status(200).json({
            message: "Verification link sent to your email",
            success: true
        })

    } catch (err) {

        return res.status(400).json({
            message: "Unable to process forgot password controller",
            success: false
        })

    }
}

export const ResetPassword = async (req, res) => {

    const { token, password } = req.body;
    if (!token || !password) {
        return res.status(400).json({
            message: "Invalid request , missing required credentials",
            success: false
        })
    }

    try {

        const user = await UserModel.findOne({
            resetPasswordToken: token,
            resetPasswordTokenExpireAt: { $gt: Date.now() }
        })

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            })
        }

        //then set the password to new password and delete token from db 
        user.password = password;
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpireAt = undefined;

        await user.save();

        await SendMail({
            subject: "✅ Your CraveCart Password Has Been Reset Successfully",
            html: ResetPasswordTemplate.replaceAll("{{USERNAME}}", user.fullname),
            email: user.email
        })


        return res.status(200).json({
            message: "Password reset successfully",
            success: true
        })

    } catch (err) {

        return res.status(400).json({
            message: "Failed to reset password",
            success: false
        })

    }
}

export const CheckResetToken = async (req, res) => {
    const { token } = req.body;

    if (!token || !token.trim()) {
        return res.status(400).json({ message: "Token is missing", success: false });
    }


    try {

        const user = await UserModel.findOne({ resetPasswordToken: token.trim() });

        // Error Type A: The token simply does not exist in the system at all
        if (!user) {
            return res.status(404).json({
                message: "This password reset link is invalid or has already been used.",
                success: false
            });
        }

        // 2. Check if the token's expiration timestamp has passed the current time
        const hasExpired = user.resetPasswordTokenExpireAt && user.resetPasswordTokenExpireAt.getTime() < Date.now();

        if (hasExpired) {
            // Self-cleaning step: Wipe out the expired token data fields immediately 
            user.resetPasswordToken = undefined;
            user.resetPasswordTokenExpireAt = undefined;
            await user.save();

            // : The token was real, but the user clicked it too late
            return res.status(410).json({ // 410 Gone is ideal for expired resources
                message: "This password reset link has expired. Please request a new one.",
                success: false
            });
        }


        return res.status(200).json({
            message: "Token is verified",
            success: true
        })
    } catch (err) {
        return res.status(400).json({
            message: "Failed to check token",
            success: false
        })
    }
}


export const googleAuth = async (req, res) => {

    const { idToken, role } = req.body;

    if (!role) {
        return res.status(400).json({
            success: false,
            message: 'Please select a role'
        })
    }

    try {

        const decoded = await auth.verifyIdToken(idToken);
        console.log(decoded)

        const { name, email, picture, email_verified, uid } = decoded;

        let user = await UserModel.findOne({ email }).select("-password");

        if (!user) {
            user = await UserModel.create({
                fullname: name,
                email,
                isVerified: {
                    email: email_verified
                },
                avatarUrl: picture,
                provider: "google",
                firebaseId: uid,
                role
            })
        }



        //now generate token 
        const token = GenerateJwtToken(user.toObject()._id);

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(201).json({
            success: true,
            message: "Google auth successfull",
            user
        })
    } catch (err) {
        return res.status(400).json({
            message: "Failed to authenticate with google",
            success: false,
            error: err.message
        })
    }


}

export const UpdatePhone = async (req, res) => {
    const { phone, email } = req.body;

    if (!phone || !phone.trim() || phone.length < 10) {
        return res.status(400).json({
            message: "Invalid phone number",
            success: false
        })
    }

    try {

        const user = await UserModel.findOne({ email }).select("-password");

        if (!user) {
            return res.status(401).json({
                message: "You are unauthenticated .Please register first",
                success: false
            })
        }

        if (!user.phone) {
            user.phone = phone;
            user.isVerified.phone = true;
            await user.save();

            return res.status(200).json({
                message: "Mobile number updated succesfully",
                success: true,
                user
            })
        }

        return res.status(400).json({
            message: "Mobile numebr already exists",
            success: false
        })

    } catch (err) {
        return res.status(400).json({
            message: "Failed to update number",
            success: false,
            error: err.message
        })

    }



}

export const checkResetPasswordStatus = asyncHandler(async (req, res) => {

    const { email } = req.query;

    if (!email) {
        return res.status(400).json({
            success: false,
            message: "Email is required to check status"
        })
    }

    //check if user has active reset token or not 
    const user = await UserModel.findOne({ email });

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User doesn't exists"
        })
    }

    if (user.resetPasswordToken && user.resetPasswordTokenExpireAt > new Date(Date.now())) {
        return res.status(200).json({
            success: true,
            message: "Reset token is valid",
            isResetCompleted: false
        })
    }

    return res.status(200).json({
        message: "Reset token expired",
        isResetCompleted: true
    })


})