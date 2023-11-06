"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewsValidation = void 0;
const zod_1 = require("zod");
const reviewsZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string({
            required_error: "User ID is Required",
        }),
        productId: zod_1.z.string({
            required_error: "Product ID is Required",
        }),
        review: zod_1.z.string({
            required_error: "Review is Required",
        }),
        rating: zod_1.z.number({
            required_error: "Rating is Required",
        }),
    }),
});
exports.ReviewsValidation = {
    reviewsZodSchema,
};
