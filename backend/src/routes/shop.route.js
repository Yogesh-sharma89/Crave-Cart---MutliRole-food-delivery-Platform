import express from "express";
import { ProtectRoute } from "../middleware/ProtectRoute.js";
import { checkOwner } from "../middleware/checkOwner.js";
import { createShop, DeleteShop, GetAllCategories, GetAllShopByOwner, GetShopById, UpdateShop } from "../controllers/shop.controller.js";
import { upload } from "../middleware/upload.middleware.js";
import { AddItem, DeleteItem, EditItem, GetAllItems } from "../controllers/shop-item.controller.js";

const shopRouter = express.Router();

shopRouter.use(checkOwner);

shopRouter.post("/create-shop",upload.single("shopImage"),createShop);

shopRouter.get("/all-shops",GetAllShopByOwner);

shopRouter.get("/categories",GetAllCategories);

shopRouter.put("/update-shop/:shopId",upload.single("shopImage"),UpdateShop);
shopRouter.delete("/delete-shop/:shopId",DeleteShop);

shopRouter.get("/:shopId",GetShopById)

//shop items routes 

shopRouter.post("/:shopId/item/create",upload.single("itemImage"),AddItem);

shopRouter.put("/:shopId/item/:itemId",upload.single("itemImage"),EditItem);
shopRouter.delete("/:shopId/item/:itemId",DeleteItem);
shopRouter.get("/:shopId/allItems",GetAllItems)


export default shopRouter;