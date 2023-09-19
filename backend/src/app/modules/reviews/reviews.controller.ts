import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { ReviewsService } from "./reviews.service";

// Add Review
const addReview = catchAsync(async (req: Request, res: Response) => {
  const { ...reviewInfo } = req.body;

  const reviews = await ReviewsService.addReview(reviewInfo);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Review Added Successfully",
    data: reviews,
  });
});

// Get Review's by Product ID
const getReviewsByProductID = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const reviews = await ReviewsService.getReviewsByProductID(id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Review Retrieved Successfully",
      data: reviews,
    });
  }
);

export const ReviewsController = {
  addReview,
  getReviewsByProductID,
};
