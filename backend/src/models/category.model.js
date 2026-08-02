import { model, Schema } from "mongoose";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      // e.g. "South Indian", "Biryani", "Beverages"
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      // e.g. "south-indian" — used in URLs, filters, and API queries
    },
    icon: {
      type: String,
      default: "",
      // store an emoji, an icon-library key (e.g. "utensils"), or an image URL
    },
    type: {
      type: String,
      enum: ["cuisine", "dish", "meal"],
      default: "dish",
      // lets you separate "South Indian" (cuisine) from "Pizza" (dish)
      // without needing two different collections
    },
    sortOrder: {
      type: Number,
      default: 0,
      // controls display order in the UI (lower = shown first)
    },
    isActive: {
      type: Boolean,
      default: true,
      // soft-disable a category without deleting it (preserves old orders/menu items)
    },
  },
  { timestamps: true }
);


const CategoryModel = model("category",categorySchema);

export default CategoryModel;