import { Schema, model } from "mongoose";
import { IProduct } from "./products.interface";

export const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    images: [{ type: String, required: true }],
    features: [{ type: String, required: true }],
    category: { type: String, required: true },
    discount: { type: Number, required: true, default: 0, min: 0, max: 99 },
    price: { type: Number, required: true },
    discountedPrice: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 0 },
    status: { type: Boolean, required: true, default: true },
    description: { type: String, required: true },
    allRating: [{ type: Number, required: true, default: 0, min: 0, max: 5 }],
    rating: { type: Number, required: true, default: 0 },
    brand: { type: String, required: true },
    code: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Products = model<IProduct>("Products", productSchema);
