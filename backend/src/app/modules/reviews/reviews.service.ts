import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IReviews, IUpdateReview } from "./reviews.interface";
import { Users } from "../user/user.schema";
import { Products } from "../products/products.schema";
import { Reviews } from "./reviews.schema";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import config from "../../../config/config";
import { Secret } from "jsonwebtoken";

// Add Review:
const addReview = async (payload: IReviews, token: string): Promise<null> => {
  jwtHelpers.jwtVerify(token, config.jwt_secret as Secret);

  const { userId, productId } = payload;

  const isExistsUser = await Users.findById(
    { _id: userId },
    {
      _id: 1,
    }
  );
  if (!isExistsUser) {
    throw new ApiError(httpStatus.NOT_FOUND, "User Does Not Exist's!");
  }

  const isProductExists = await Products.findById(
    { _id: productId },
    {
      _id: 0,
      sellerID: 1,
    }
  );
  if (!isProductExists) {
    throw new ApiError(httpStatus.NOT_FOUND, "Product Does Not Exist's!");
  }

  if (String(userId) === isProductExists.sellerID) {
    throw new ApiError(httpStatus.FORBIDDEN, "Failed to Add Review!");
  }

  await Reviews.create(payload);

  return null;
};

// Get Reviews By Product ID
const getReviewsByProductID = async (
  productID: string
): Promise<IReviews[]> => {
  const reviews = await Reviews.find({ productId: productID }).populate({
    path: "userId",
    select: "_id name userProfile",
  });
  if (reviews.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, "0 Reviews Added");
  }

  return reviews;
};

// Update Review
const updateReview = async (
  reviewID: string,
  payload: IUpdateReview,
  token: string
): Promise<null> => {
  jwtHelpers.jwtVerify(token, config.jwt_secret as Secret);

  const isExistsReview = await Reviews.findById(
    { _id: reviewID },
    {
      userId: 1,
      review: 1,
    }
  ).lean();
  if (!isExistsReview) {
    throw new ApiError(httpStatus.NOT_FOUND, "Review Not Found!");
  }

  const { userId, newReview } = payload;
  const isExistsUser = await Users.findById(
    { _id: userId },
    {
      _id: 1,
    }
  ).lean();
  if (!isExistsUser) {
    throw new ApiError(httpStatus.NOT_FOUND, "User Does Not Exist's!");
  }

  // Checking User is valid or not
  if (userId !== String(isExistsReview.userId)) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      "Permission Denied! Please Try Again"
    );
  }

  isExistsReview.review = newReview;

  await Reviews.findOneAndUpdate({ _id: reviewID }, isExistsReview, {
    new: true,
  });

  return null;
};

export const ReviewsService = {
  addReview,
  getReviewsByProductID,
  updateReview,
};
