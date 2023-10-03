import { Types } from "mongoose";
import { IProduct } from "../products/products.interface";
import { IUser } from "../user/user.interface";

export type OrderedProducts = {
  productID: Types.ObjectId | IProduct;
  quantity: number;
};

export type OrderProgress =
  | "Pending"
  | "Processing"
  | "Verifying"
  | "Confirmed"
  | "Delivered"
  | "Completed"
  | "Canceled";

export type IOrder = {
  userID: Types.ObjectId | IUser;
  products: OrderedProducts[];
  totalPrice: number;
  code: string;
  progress: OrderProgress;
};
