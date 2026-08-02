import mongoose, { model, Schema } from "mongoose";
import bcrypt from "bcryptjs";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const userSchema = new Schema({

    fullname:{
        type:String,
        trim:true,
        required:[true,"Fullname is required"],
        minlength: [3, "Full name must be at least 3 characters long"],
        maxlength: [80, "Full name cannot exceed 80 characters"]
    },
    email:{
        type:String,
        trim:true,
        required:[true,"Email is required"],
        lowercase:true,
        match: [emailRegex, "Please provide a valid email address"] 
    },
    password:{
        type:String,
        trim:true,
    },
    phone:{
        type:String,
        default:null,
        trim:true
    },
    role:{
        type:String,
        enum:["user","owner","deliveryBoy"],
        required:true,
        default:"user"
    },
    resetPasswordToken:String,
    resetPasswordTokenExpireAt:Date,
    isVerified:{
        email:{
            type:Boolean,
            default:false
        },
        phone:{
            type:Boolean,
            default:false
        }
    },
    avatarUrl:String,
    provider:{
        type:String,
        enum:["local","google"],
        default:"local"
    },
    firebaseId:String

},{timestamps:true})


userSchema.pre('save',async function(){
    const user = this;

    if(!user.isModified("password")){
        return 
    }
    try{

       user.password = await bcrypt.hash(user.password,10);
       

    }catch(err){
        throw err;
    }   
})

const UserModel = model("user",userSchema);

export default  UserModel;