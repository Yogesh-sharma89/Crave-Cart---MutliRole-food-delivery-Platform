import ShopModel from "../models/shop.model.js";
import { UploadToCloudinary } from "../service/cloudinary.service.js";
import asyncHandler from "../utils/asyncHandler.js";


export const createShop = asyncHandler(async (req, res) => {

    const { shopName, city, state, address, pincode, country } = req.body;

    if (!shopName || !city || !state || !address || !pincode || !country) {
        return res.status(404).json({
            message: "All fields are required",
            success: false
        })
    }

    const file = req.file;

    const ownerId = req.userId;

    if (!file) {
        return res.status(400).json({ success: false, message: "Please upload a shop image file." });
    }

    const uploadRes = await UploadToCloudinary(file.path, "shops");

    //now create a shop 
    const newShop = await ShopModel.create({
        shopName,
        city,
        state,
        address,
        pincode,
        country,
        owner: ownerId,
        shopImage: uploadRes?.secure_url,
        shopImgPublicId: uploadRes?.public_id
    })

    await newShop.populate("owner");

    return res.status(201).json({
        success: true,
        message: "Shop created succesfully",
        shop: newShop
    })
})

export const UpdateShop = asyncHandler(async (req, res) => {

    const { shopId } = req.params;
    const userId = req.userId;
    const file = req.file;
    const { shopName, city, state, address, pincode, country } = req.body;

    const shop = await ShopModel.findOne({_id:shopId,isDeleted:false});

    if (!shop) {
        return res.status(404).json({ success: false, message: "Shop  not found." });
    }

    if (shop._id.toString() !== userId.toString()) {
        return res.status(403).json({
            success: false,
            message: "Access Denied: You do not have permission to modify this shop."
        });
    }

    if (file) {
        const response = await UploadToCloudinary(file.path, "shops");
        shop.shopImage = response?.secure_url;
        shop.shopImgPublicId = response?.public_id
    }

    if (shopName) shop.shopName = shopName;
    if (city) shop.city = city;
    if (state) shop.state = state;
    if (address) shop.address = address;
    if (pincode) shop.pincode = pincode;
    if (country) shop.pincode = country;

    const updatedShop = await shop.save();

    return res.status(200).json({
        success: true,
        message: "Shop profile updated successfully",
        shop: updatedShop
    });


})

export const DeleteShop = asyncHandler(async (req, res) => {

    const { shopId } = req.params;
    const userId = req.userId;

    const shop = await ShopModel.findOne({_id:shopId,isDeleted:false});

    if (!shop) {
        return res.status(404).json({ success: false, message: "Shop  not found." });
    }

    if (shop._id.toString() !== userId.toString()) {
        return res.status(403).json({
            success: false,
            message: "Access Denied: You do not have permission to modify this shop."
        });
    }

   shop.isDeleted = true;
   await shop.save();

    return res.status(200).json({ 
        success: true, 
        message: "Shop  deactivated successfully" ,
    });


})

export const GetAllShopByOwner = asyncHandler(async (req, res) => {

   const ownerId = req.userId;

   //find by owner by owner Id 
   const shopsOfOwner = await ShopModel.find({owner:ownerId});

   if(!shopsOfOwner || shopsOfOwner.length===0 ){
    return res.status(404).json({
        success:true,
        message:"No shops found for this owner"
    })
   }

   return res.status(200).json({
    message:"Shops get successfully",
    success:true,
    shops:shopsOfOwner
   })

})



