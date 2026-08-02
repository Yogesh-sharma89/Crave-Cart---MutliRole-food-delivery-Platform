import asyncHandler from "../utils/asyncHandler.js";
import UserModel from "../models/user.model.js";

export const checkOwner = asyncHandler(async(req,res,next)=>{
    const userId = req?.userId;

    if(!userId){
        return res.status(401).json({
            message:"Unauthorized acess",
            success:false
        })
    }

    const user = await UserModel.findById(userId);

    if(!user){
         return res.status(401).json({
            message:"User doesn't exists",
            success:false
        })
    }

    if(user?.role!=="owner"){
       return  res.status(403).json({
            message:"Access denied",
            success:false
        })
    }

    next();
})