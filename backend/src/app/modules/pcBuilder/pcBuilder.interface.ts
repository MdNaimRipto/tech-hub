import { Types } from "mongoose";
import { IProduct } from "../products/products.interface";
import { IUser } from "../user/user.interface";

export type IPcBuilder = {
  userID: Types.ObjectId | IUser;
  buildName: string;
  code: string;
  build: {
    cpu?: Types.ObjectId | IProduct;
    cpuCooler?: Types.ObjectId | IProduct;
    motherboard?: Types.ObjectId | IProduct;
    ram1?: Types.ObjectId | IProduct;
    ram2?: Types.ObjectId | IProduct;
    ram3?: Types.ObjectId | IProduct;
    ram4?: Types.ObjectId | IProduct;
    storage1?: Types.ObjectId | IProduct;
    storage2?: Types.ObjectId | IProduct;
    gpu?: Types.ObjectId | IProduct;
    psu?: Types.ObjectId | IProduct;
    casing?: Types.ObjectId | IProduct;
    monitor?: Types.ObjectId | IProduct;
    casingCooler?: Types.ObjectId | IProduct;
    keyboard?: Types.ObjectId | IProduct;
    mouse?: Types.ObjectId | IProduct;
    speaker?: Types.ObjectId | IProduct;
    headphone?: Types.ObjectId | IProduct;
  };
};
