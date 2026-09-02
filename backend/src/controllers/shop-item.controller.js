import cloudinary from "../config/cloudinary.js";
import ShopItemModel from "../models/shop-item.model.js";
import { UploadToCloudinary } from "../service/cloudinary.service.js";
import asyncHandler from "../utils/asyncHandler.js";

export const AddItem = asyncHandler(async (req, res) => {

    const {
        itemName,
        price,
        category,
        description,
        isAvailable,
        foodType,
        preparationTime
    } = req.body;

    const { shopId } = req.params;

    if (!shopId) {
        res.status(400);
        throw new Error("Invalid Shop Id.");
    }

    const itemImage = req.file;

    if (!itemName || !price || !category || !foodType || !preparationTime || !description) {
        res.status(400);
        throw new Error("All fields are mandatory.");
    }

    if (!itemImage) {
        res.status(400);
        throw new Error("Please upload an item image.");
    }

    // Check clean string trimming
    if (itemName.trim() === "" || category.trim() === "") {
        res.status(400);
        throw new Error("Item name or category cannot be empty spaces.");
    }

    // Validate Price 
    const parsedPrice = Number(price);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
        res.status(400);
        throw new Error("Price must be a valid number greater than zero.");
    }

    const parsedPrepTime = Number(preparationTime);
    if (isNaN(parsedPrepTime) || parsedPrepTime < 1) {
        res.status(400);
        throw new Error("Preparation time must be at least 1 minute.");
    }

    const allowedFoodTypes = ['veg', 'non-veg'];
    if (!allowedFoodTypes.includes(foodType.toLowerCase())) {
        res.status(400);
        throw new Error("Invalid food type. Must be veg, non-veg");
    }

    //upload to cloudinary
    const uploadRes = await UploadToCloudinary(itemImage.path, "shopItems");

    const newItem = {
        itemName: itemName.trim(),
        price: parsedPrice,
        category: category.trim(),
        description: description ? description.trim() : "",
        isAvailable: isAvailable === 'true' || isAvailable === true,
        foodType: foodType.toLowerCase(),
        preparationTime: parsedPrepTime,
        itemImageUrl: uploadRes?.secure_url,
        itemImagePublicId: uploadRes?.public_id,
        shop: shopId
    };

    const Item = await ShopItemModel.create(newItem);

    res.status(201).json({
        success: true,
        message: "Item added successfully!",
        item: Item
    });


})

export const EditItem = asyncHandler(async (req, res) => {

    const {
        itemName,
        price,
        category,
        description,
        isAvailable,
        foodType,
        preparationTime
    } = req.body;

    const { shopId, itemId } = req.params;

    if(!shopId || !itemId) {
        res.status(400);
        throw new Error("Missing Shop ID or Item ID parameters.");
    }

    const itemImage = req.file;

    const updateFields = {};
    
    if (itemName !== undefined) {
        if (itemName.trim() === "") {
            res.status(400);
            throw new Error("Item name cannot be empty spaces.");
        }
        updateFields.itemName = itemName.trim();
    }

    if (price !== undefined) {
        const parsedPrice = Number(price);
        if (isNaN(parsedPrice) || parsedPrice <= 0) {
            res.status(400);
            throw new Error("Price must be a valid number greater than zero.");
        }
        updateFields.price = parsedPrice;
    }

    if (category !== undefined) {
        if (category.trim() === "") {
            res.status(400);
            throw new Error("Category field cannot be blank.");
        }
        updateFields.category = category.trim();
    }

    if (description !== undefined) {
        updateFields.description =description.trim();
    }

    if (isAvailable !== undefined) {
        updateFields.isAvailable = isAvailable === 'true' || isAvailable === true;
    }

    if (req.body.foodType !== undefined) {
        const allowedFoodTypes = ['veg', 'non-veg'];
        const formattedFoodType = foodType.toLowerCase().trim();

        if (!allowedFoodTypes.includes(formattedFoodType)) {
            res.status(400);
            throw new Error("Invalid food type. Must be veg, non-veg");
        }
        updateFields.foodType = formattedFoodType;
    }

    if (preparationTime !== undefined) {
        const parsedPrepTime = Number(preparationTime);
        if (isNaN(parsedPrepTime) || parsedPrepTime < 1) {
            res.status(400);
            throw new Error("Preparation time must be at least 1 minute.");
        }
        updateFields.preparationTime = parsedPrepTime;
    }

    const item = await ShopItemModel.findById(itemId);

    if(!item){
        res.status(404);
        throw new Error("Item not found")
    }

    let oldItemPublicid = item.itemImagePublicId;

    if(itemImage){
         
        //upload it 

        const uploadRes = await UploadToCloudinary(itemImage.path,"shopItems");

        updateFields.itemImagePublicId = uploadRes.public_id;
        updateFields.itemImageUrl = uploadRes.secure_url;

        if(oldItemPublicid){
            await cloudinary.uploader.destroy(oldItemPublicid);
        }
    }

    if (Object.keys(updateFields).length === 0) {
        res.status(400);
        throw new Error("No fields provided for modification.");
    }

    const updatedItem = await ShopItemModel.findOneAndUpdate(
        {_id:itemId,shop:shopId},
        {$set:updateFields},
        {runValidators:true,returnDocument:"after"}
    ).lean();

    res.status(200).json({
        success: true,
        message: "Menu item updated successfully! 🛠️",
        item: updatedItem
    });
})

export const DeleteItem = asyncHandler(async (req, res) => {

    const {shopId,itemId} = req.params;

    if(!shopId.trim() || !itemId.trim()){
        res.status(400);
        throw new Error("Invalid request , wrong params");
    }

    const validShopId = shopId.trim();
    const validItemId = itemId.trim();

    const item = await ShopItemModel.findOne({_id:validItemId,shop:validShopId});

    if(!item){
        res.status(404);
        throw new Error("Item doesn't exists");
    }

    //delete the cloudinary image 
    if(item.itemImageUrl){
        await cloudinary.uploader.destroy(item.itemImagePublicId)
    }

   //then delete the item 
    await ShopItemModel.deleteOne({_id:validItemId,shop:validShopId});

    res.status(200).json({
        success:true,
        message:"Item deleted successfully",
    })

})

export const GetAllItems = asyncHandler(async (req, res) => {

    const { shopId } = req.params;

    if (!shopId) {
        res.status(400);
        throw new Error("Invalid request - ShopId is missing")
    }

    const allItems = await ShopItemModel.find({ shop: shopId }).sort({ createdAt: -1 }).lean().populate("category", "name icon slug type isActive");

    res.status(200).json({
        success: true,
        messag: "All items got successfully",
        items: allItems
    })

})