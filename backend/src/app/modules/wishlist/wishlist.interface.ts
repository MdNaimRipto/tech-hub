import { Types } from "mongoose";
import { IProduct } from "../products/products.interface";

export type IWishlist = {
  userID: string;
  productID: Types.ObjectId | IProduct;
};

export type IDeleteWishlist = {
  wishlistId: string;
  userID: string;
};
