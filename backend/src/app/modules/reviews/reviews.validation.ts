import { z } from "zod";

const reviewsZodSchema = z.object({
  body: z.object({
    userId: z.string({
      required_error: "User ID is Required",
    }),
    productId: z.string({
      required_error: "Product ID is Required",
    }),
    review: z.string({
      required_error: "Review is Required",
    }),
  }),
});

export const ReviewsValidation = {
  reviewsZodSchema,
};
