import mongoose, { model, Schema } from "mongoose";

const shopItemSchema = new Schema({
    itemName:{
         type:String,
        required:true,
        trim:true,
    },
    itemImageUrl:{
         type:String,
        required:true,
        trim:true
    },
    itemImagePublicId:{
         type:String,
        required:true,
        trim:true
    },
    shop:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"shop",
        required:true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"category",
        required:true
    },
    price:{
        type:Number,
        required:true,
        min:1
    },
    foodType:{
        type:String,
        enum:["veg","non-veg"],
        required:true
    }
},{timestamps:true})

shopItemSchema.index({shop:1,itemName:1},{unique:true});

const ShopItemModel = model("shopItem",shopItemSchema);

export default ShopItemModel;