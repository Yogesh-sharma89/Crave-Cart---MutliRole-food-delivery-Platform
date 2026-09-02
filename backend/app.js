import express from "express";

import cors from "cors";
import ConnectToDb from "./src/config/db.js";
import authRouter from "./src/routes/auth.route.js";
import cookieParser from "cookie-parser";
import userRouter from "./src/routes/user.route.js";
import shopRouter from "./src/routes/shop.route.js";
import { GlobalMiddleware } from "./src/middleware/GlobalMiddleware.js";
import { CheckDeletion } from "./src/middleware/CheckDeletion.js";
import { ProtectRoute } from "./src/middleware/ProtectRoute.js";
import mainRouter from "./src/routes/main.routes.js";



const app = express();

//middleware if json data came then parse it into js objects
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: [process.env.BASE_URL],
  credentials: true,
  methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
  optionsSuccessStatus: 200
}));

app.use(cookieParser());


app.use("/api",mainRouter);

app.get("/health-check", (req, res) => {
  res.json({ message: "Server is up and running", success: true });
});


//Global error middleware
app.use((err, req, res, next) => {


  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  if (err.code === 11000) {
    statusCode = 409;
    const duplicateField = Object.keys(err.keyValue || {});
    message = `That ${duplicateField} is already registered.`;
  }

  // Validation Error (e.g., missing a required schema field)
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors).map(val => val.message).join(", ");
  }

  return res.status(statusCode).json({
    success: false,
    message: message,
    // Only show the raw system stack trace if you are working on your local machine
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined
  });


})

export default app;


