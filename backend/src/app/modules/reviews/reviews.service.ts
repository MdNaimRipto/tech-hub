import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IReviews } from "./reviews.interface";
import { Users } from "../user/user.schema";
import { Products } from "../products/products.schema";
import { Reviews } from "./reviews.schema";

// Add Review:
const addReview = async (payload: IReviews): Promise<IReviews> => {
  const { userId, productId } = payload;

  const isExistsUser = await Users.findById({ _id: userId });
  if (!isExistsUser) {
    throw new ApiError(httpStatus.NOT_FOUND, "User Does Not Exist's!");
  }

  const isProductExists = await Products.findById({ _id: productId });
  if (!isProductExists) {
    throw new ApiError(httpStatus.NOT_FOUND, "Product Does Not Exist's!");
  }

  if (userId.toString() === isProductExists.sellerID) {
    throw new ApiError(httpStatus.FORBIDDEN, "Failed to Add Review!");
  }

  const review = await Reviews.create(payload);

  return review;
};

// Get Reviews By Product ID
const getReviewsByProductID = async (
  productID: string
): Promise<IReviews[]> => {
  const reviews = await Reviews.find({ productId: productID });
  if (reviews.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, "0 Reviews Added");
  }

  return reviews;
};

export const ReviewsService = {
  addReview,
  getReviewsByProductID,
};
