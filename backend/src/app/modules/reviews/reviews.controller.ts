import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { ReviewsService } from "./reviews.service";
import { verifyAuthToken } from "../../../util/verifyAuthToken";

// Add Review
const addReview = catchAsync(async (req: Request, res: Response) => {
  const { ...reviewInfo } = req.body;
  const token = verifyAuthToken(req);

  const review = await ReviewsService.addReview(reviewInfo, token);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Review Added Successfully",
    data: review,
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

// Get Review's by Product ID
const updateReview = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ...reviewPayload } = req.body;
  const token = verifyAuthToken(req);

  await ReviewsService.updateReview(id, reviewPayload, token);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Review Updated Successfully",
    data: null,
  });
});

export const ReviewsController = {
  addReview,
  getReviewsByProductID,
  updateReview,
};
