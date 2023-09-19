import { Schema, model } from "mongoose";
import { IReviews } from "./reviews.interface";

export const reviewsSchema = new Schema<IReviews>(
  {
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    productId: { type: String, required: true },
    review: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Reviews = model<IReviews>("Reviews", reviewsSchema);
