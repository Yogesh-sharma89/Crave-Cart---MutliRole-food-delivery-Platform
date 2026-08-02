import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv";
import { DEFAULT_CATEGORIES } from "./categories.js";
import CategoryModel from "../models/category.model.js";
import ConnectToDb from "../config/db.js";

dotenv.config();


const seedCategories = async () => {
  try {

    await mongoose.connect(process.env.DB_URL);

    for (const category of DEFAULT_CATEGORIES) {
      await CategoryModel.updateOne(
        { slug: category.slug },
        { $set: category },
        { upsert: true }
      );
    }

    console.log("🎉 Categories seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedCategories();