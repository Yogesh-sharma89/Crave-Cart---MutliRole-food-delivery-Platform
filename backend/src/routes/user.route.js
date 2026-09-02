import express from "express";
import { UpdatePassword, UpdateProfileAvatar } from "../controllers/user.controller.js";
import { upload } from "../middleware/upload.middleware.js";
import {  CompleteProfile, DeleteAccount, SignOut } from "../controllers/auth.controller.js";

const userRouter = express.Router();


 
userRouter.patch("/complete-profile", CompleteProfile); 
userRouter.post("/delete-account", DeleteAccount);     
userRouter.post("/logout", SignOut); 

userRouter.patch("/update-avatar",upload.single("avatar"),UpdateProfileAvatar);
userRouter.post("/update-password",UpdatePassword)


export default userRouter;