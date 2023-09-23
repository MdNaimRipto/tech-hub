import { Schema, model } from "mongoose";
import { IWishlist } from "./wishlist.interface";

export const wishlistSchema = new Schema<IWishlist>(
  {
    userID: { type: String, required: true },
    productID: { type: Schema.Types.ObjectId, required: true, ref: "Products" },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Wishlist = model<IWishlist>("Wishlist", wishlistSchema);
