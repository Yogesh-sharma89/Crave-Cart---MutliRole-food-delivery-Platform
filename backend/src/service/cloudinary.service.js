import cloudinary from "../config/cloudinary.js";
import axios from "axios";
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

       console.error("Cloudinary upload failed:", err);
       return null;
    }
}


export  const UploadAvatar = async(avatarUrl)=>{

    try{
        //downlaod the google avatar
        const response = await axios.get(avatarUrl,{
            responseType:"arraybuffer"
        })
    
        const buffer = Buffer.from(response.data);
    
        const result = await new Promise((resolve,reject)=>{
    
            const stream =  cloudinary.uploader.upload_stream({
                folder:"avatars",
                resource_type:"auto"
            },
            (error,result)=>{
                if(error) reject(error);
                else resolve(result);
            }
            );
    
           stream.end(buffer)
    
        })
    
        return result;
    }catch(err){
      console.log("Avatar upload failed :",err);
      throw err;
    }

}