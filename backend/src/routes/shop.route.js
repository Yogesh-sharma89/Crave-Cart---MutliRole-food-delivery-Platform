import express from "express";
import { ProtectRoute } from "../middleware/ProtectRoute.js";
import { checkOwner } from "../middleware/checkOwner.js";
import { createShop, DeleteShop, GetAllShopByOwner, UpdateShop } from "../controllers/shop.controller.js";
import { upload } from "../middleware/upload.middleware.js";

const shopRouter = express.Router();

shopRouter.use(ProtectRoute,checkOwner);

shopRouter.post("/create-shop",upload.single("shopImage"),createShop);
shopRouter.put("/update-shop/:shopId",upload.single("shopImage"),UpdateShop);
shopRouter.delete("/delete-shop/:shopId",DeleteShop);

shopRouter.get("/all-shops",GetAllShopByOwner)

export default shopRouter;