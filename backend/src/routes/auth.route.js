import express from "express";
import { checkAuth, checkResetPasswordStatus, CheckResetToken, ForgotPassword, googleAuth, ResetPassword, SignIn, SignOut, Signup, UpdatePhone } from "../controllers/auth.controller.js";
import { ProtectRoute } from "../middleware/ProtectRoute.js";

const authRouter = express.Router();

authRouter.post("/signup",Signup);
authRouter.post("/login",SignIn);
authRouter.post("/logout",ProtectRoute,SignOut);
authRouter.get("/check-auth",ProtectRoute,checkAuth);
authRouter.post("/forgot-password",ForgotPassword);

authRouter.post("/reset-password",ResetPassword);

authRouter.post("/check-reset-token",CheckResetToken)

authRouter.post("/google-auth",googleAuth);

authRouter.post("/update-phone",UpdatePhone)

authRouter.get("/check-reset-status",checkResetPasswordStatus)

export default authRouter;