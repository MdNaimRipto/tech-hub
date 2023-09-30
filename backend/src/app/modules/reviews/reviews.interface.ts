import { Types } from "mongoose";
import { IUser } from "../user/user.interface";

export type IReviews = {
  userId: Types.ObjectId | IUser;
  productId: string;
  review: string;
};

export type IUpdateReview = {
  userId: string;
  newReview: string;
};
