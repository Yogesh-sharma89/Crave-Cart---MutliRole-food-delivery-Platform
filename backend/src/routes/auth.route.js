import express from "express";
import {  checkAuth, checkResetPasswordStatus, CheckResetToken, ForgotPassword, googleAuth, ResetPassword, SendEmailOtp, SignIn,  Signup, VerifyOtp } from "../controllers/auth.controller.js";
import { authLimiter, otpLimiter, resetLimiter } from "../middleware/rate.middleware.js";


const authRouter = express.Router();

authRouter.post("/signup",authLimiter,Signup);
authRouter.post("/login",authLimiter,SignIn);

authRouter.get("/check-auth", checkAuth);       

authRouter.post("/forgot-password",resetLimiter,ForgotPassword);

authRouter.post("/reset-password",resetLimiter,ResetPassword);

authRouter.post("/check-reset-token",resetLimiter,CheckResetToken)

authRouter.post("/google-auth",authLimiter,googleAuth);

authRouter.get("/check-reset-status",checkResetPasswordStatus)

//recover accout api 
authRouter.post("/send-otp",otpLimiter,SendEmailOtp);
authRouter.post("/verify-otp",otpLimiter,VerifyOtp);

export default authRouter;