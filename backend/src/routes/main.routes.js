import { Router } from "express";
import { GlobalMiddleware } from "../middleware/GlobalMiddleware.js";
import authRouter from "./auth.route.js";
import { CheckDeletion } from "../middleware/CheckDeletion.js";
import userRouter from "./user.route.js";
import shopRouter from "./shop.route.js";
import { ProtectRoute } from "../middleware/ProtectRoute.js";

const mainRouter = Router();

mainRouter.use(GlobalMiddleware);

//then public auth routes 
mainRouter.use("/auth", authRouter);

//protectedRoute
mainRouter.use(ProtectRoute);

// //for account recovery
// mainRouter.post("/auth/recover-account", RecoverAccount);

mainRouter.use(CheckDeletion); // Blocks requests if user.deletedAt is set

mainRouter.use("/user", userRouter);
mainRouter.use("/shop", shopRouter);

export default mainRouter;