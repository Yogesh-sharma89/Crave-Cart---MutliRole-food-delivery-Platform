import CategoryModel from "../models/category.model.js";
import ShopItemModel from "../models/shop-item.model.js";
import ShopModel from "../models/shop.model.js";
import { UploadToCloudinary } from "../service/cloudinary.service.js";
import asyncHandler from "../utils/asyncHandler.js";

export const AddItem = asyncHandler(async (req, res) => {

    const { itemName, price, foodType, categoryId } = req.body;
    const { shopId } = req.params;
    const file = req.file;

    if (!itemName || !price || !foodType || !categoryId || !shopId) {
        return res.status(400).json({
            message: "All fields are required",
            success: false
        })
    }

    if (isNaN(price) || price <= 0) {
        return res.status(400).json({
            message: "Invalid price.",
            success: false
        })
    }

    const shop = await ShopModel.findOne({ _id: shopId, isDeleted: false });

    if (!shop) {
        return res.status(404).json({ success: false, message: " Shop not found." });
    }

    if (shop.owner.toString() !== req.userId.toString()) {
        return res.status(403).json({
            success: false,
            message: "Access Denied: You do not have permission to add inventory items to this store."
        });
    }

    const category = await CategoryModel.findOne({ _id: categoryId, isActive: true });
    if (!category) {
        return res.status(400).json({ success: false, message: "Invalid or inactive item category selected." });
    }

    //then last check for req.file 

    if (!file) {
        return res.status(400).json({ success: false, message: "Please upload an item presentation image." });
    }

    //then upload file to cloudinary 
    const response = await UploadToCloudinary(file.path, "shop_items");

    //now insert item in db 
    const newItem = await ShopItemModel.create({
        itemName,
        price: Number(price),
        foodType,
        shop: shopId,
        category: categoryId,
        itemImageUrl: response?.secure_url,
        itemImagePublicId: response?.public_id,
    })

    return res.status(201).json({
        success: true,
        message: "Menu item successfully added to your store inventory!",
        item: newItem
    });

})


export const updateItem = asyncHandler(async (req, res) => {
    const { itemId } = req.params();
    const { itemName, price, foodType, categoryId } = req.body;

    //find item 
    const item = await ShopItemModel.findById(itemId);

    if (!item) {
        return res.status(404).json({ success: false, message: "Menu item not found." });
    }

    //found shop related to that item
    const shop = await ShopModel.findOne({ _id: item.shop, isDeleted: false });

    //if not shop then 
    if (!shop) {
        return res.status(404).json({ success: false, message: "Associated shop profile is inactive or missing." });
    }

    // Verify if the logged-in user matches the store owner signature
    if (shop.owner.toString() !== req.userId.toString()) {
        return res.status(403).json({ 
            success: false, 
            message: "Access Denied: You are not authorized to edit items in this store." 
        });
    }

    //if category chane then check category exist 
    if(categoryId){
        const catergory = await CategoryModel.findOne({_id:categoryId,isActive:true});
         if (!catergory) {
            return res.status(400).json({ success: false, message: "Selected category is invalid or inactive." });
        }
        item.category = categoryId;
    }

    if (req.file) {
        const newImageUrl = await UploadToCloudinary(req.file.path, "shop_items");
        item.itemImageUrl = newImageUrl;
    }

    // 6. Apply remaining text field updates safely
    if (itemName) item.itemName = itemName;
    if (price) item.price = Number(price);
    if (foodType) item.foodType = foodType;

    const updatedItem = await item.save();

    return res.status(200).json({
        success: true,
        message: "Menu item updated successfully!",
        item: updatedItem
    });



})