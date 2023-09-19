import express from "express";
import { ReviewsController } from "./reviews.controller";
import zodValidationRequest from "../../../middleware/zodValidationRequest";
import { ReviewsValidation } from "./reviews.validation";

const router = express.Router();

router.post(
  "/addReview",
  zodValidationRequest(ReviewsValidation.reviewsZodSchema),
  ReviewsController.addReview
);

router.get("/getReviews/:id", ReviewsController.getReviewsByProductID);

export const ReviewsRouter = router;
