import { Schema, model } from "mongoose";
import { IReviews } from "./reviews.interface";

export const reviewsSchema = new Schema<IReviews>(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: "Users" },
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
