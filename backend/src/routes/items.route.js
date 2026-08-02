import express from "express";
import { AddItem, updateItem } from "../controllers/items.controller.js";
import { ProtectRoute } from "../middleware/ProtectRoute.js";
import { checkOwner } from "../middleware/checkOwner.js";
import { upload } from "../middleware/upload.middleware.js";

const itemRouter = express.Router();

itemRouter.use(ProtectRoute,checkOwner);

itemRouter.post("/:shopId/addItem",upload.single("itemImage"),AddItem)
itemRouter.put("/update-item/:itemId",upload.single("itemImage"),updateItem)

export default itemRouter;