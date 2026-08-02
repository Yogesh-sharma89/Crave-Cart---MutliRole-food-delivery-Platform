import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.configDotenv({debug:true})

const db_url = process.env.DB_URL;

const ConnectToDb = async ()=>{
    
     try{
        if(!db_url){
            throw new Error("Missing db connection string")
        }

        await mongoose.connect(db_url);
        console.log("Database connected ")

     }catch(err){
        console.log(`Error in connecting db ${err.message}`)
     }
}

export default ConnectToDb;