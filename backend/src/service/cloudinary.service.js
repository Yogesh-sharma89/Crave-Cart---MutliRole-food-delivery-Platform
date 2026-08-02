import cloudinary from "../config/cloudinary.js";

import fs from "fs";

export const UploadToCloudinary = async(filepath,folder)=>{
    if(!filepath) return null;

    try{

        const response  = await cloudinary.uploader.upload(filepath,{
            folder,
            resource_type:"auto"
        })

       fs.unlinkSync(filepath);

       return response;

    }catch(err){
       if(fs.existsSync(filepath)){
        fs.unlinkSync(filepath);
       }

       console.error("Cloudinary upload failed:", error);
       return null;
    }
}