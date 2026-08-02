import mongoose, { model, Schema } from "mongoose";


const shopSchema = new Schema({
    shopName:{
        type:String,
        required:true,
        trim:true,
    },
    shopImage:{
        type:String,
        required:true,
        trim:true
    },
    shopImgPublicId:{
        type:String,
        required:true,
        trim:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
        index:true
    },
    city:{
        type:String,
        required:true,
        trim:true,
    },
    state:{
        type:String,
        required:true,
        trim:true,
    },
    address:{
        type:String,
        trim:true,
        required:true
    },
    pincode:{
        type:String,
        required:true,
        trim:true
    },
    isDeleted:{
        type:Boolean,
        default:false,
        index:true,
    },
    country: { type: String, default: "IN",required:true },
},{timestamps:true})

// This ensures that the COMBINATION of owner + shopName must be completely unique.
shopSchema.index({ owner: 1, shopName: 1,isDeleted:1 }, { unique: true });


const ShopModel = model("shop",shopSchema);

export default ShopModel;