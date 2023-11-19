import { Types } from "mongoose";
import { IProduct } from "../products/products.interface";
import { IUser } from "../user/user.interface";

export type IPcBuilder = {
  userID: Types.ObjectId | IUser;
  buildName: string;
  code: string;
  savedTime: string;
  build: {
    cpu: Types.ObjectId | IProduct;
    cooler?: Types.ObjectId | IProduct;
    motherboard: Types.ObjectId | IProduct;
    ram: Types.ObjectId | IProduct;
    storage: Types.ObjectId | IProduct;
    psu: Types.ObjectId | IProduct;
    gpu?: Types.ObjectId | IProduct;
    casing: Types.ObjectId | IProduct;
    monitor?: Types.ObjectId | IProduct;
    keyboard?: Types.ObjectId | IProduct;
    mouse?: Types.ObjectId | IProduct;
    speaker?: Types.ObjectId | IProduct;
    headphone?: Types.ObjectId | IProduct;
  };
};
