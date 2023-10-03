"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductValidation = void 0;
const zod_1 = require("zod");
const productsZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Name is required",
        }),
        images: zod_1.z.object({
            i1: zod_1.z.string({ required_error: "Image 1 is Required" }),
            i2: zod_1.z.string({ required_error: "Image 2 is Required" }),
            i3: zod_1.z.string({ required_error: "Image 3 is Required" }),
            i4: zod_1.z.string({ required_error: "Image 4 is Required" }),
        }),
        features: zod_1.z.object({
            f1: zod_1.z.string({ required_error: "Feature 1 is Required" }),
            f2: zod_1.z.string({ required_error: "Feature 2 is Required" }),
            f3: zod_1.z.string({ required_error: "Feature 3 is Required" }),
            f4: zod_1.z.string({ required_error: "Feature 4 is Required" }),
            f5: zod_1.z.string({ required_error: "Feature 5 is Required" }),
        }),
        category: zod_1.z.string({
            required_error: "Category is required",
        }),
        price: zod_1.z.string({ required_error: "Price is Required" }),
        discount: zod_1.z
            .number()
            .min(0, "Discount must be At least 0")
            .max(99, "Discount can be max 99"),
        quantity: zod_1.z.number().int().positive("Quantity must be a positive integer"),
        status: zod_1.z
            .boolean({
            required_error: "Status must be a boolean",
        })
            .default(true),
        description: zod_1.z.string({
            required_error: "Description is required",
        }),
        allRating: zod_1.z
            .array(zod_1.z
            .number({
            required_error: "All Rating is required",
        })
            .default(0))
            .default([0]),
        rating: zod_1.z
            .number()
            .int()
            .min(0, "Rating must be a non-negative integer")
            .default(0),
        brand: zod_1.z.string({
            required_error: "Brand is required",
        }),
        sellerID: zod_1.z.string({
            required_error: "Seller ID is required",
        }),
    }),
});
const updateProductSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        images: zod_1.z
            .object({
            i1: zod_1.z.string().optional(),
            i2: zod_1.z.string().optional(),
            i3: zod_1.z.string().optional(),
            i4: zod_1.z.string().optional(),
        })
            .optional(),
        features: zod_1.z
            .object({
            f1: zod_1.z.string().optional(),
            f2: zod_1.z.string().optional(),
            f3: zod_1.z.string().optional(),
            f4: zod_1.z.string().optional(),
            f5: zod_1.z.string().optional(),
        })
            .optional(),
        category: zod_1.z.string().optional(),
        price: zod_1.z.number().positive().optional(),
        discount: zod_1.z.number().min(0).max(99).optional(),
        quantity: zod_1.z.number().int().positive().optional(),
        status: zod_1.z.boolean().optional().default(true),
        description: zod_1.z.string().optional(),
        allRating: zod_1.z.array(zod_1.z.number().default(0)).optional().default([0]),
        rating: zod_1.z.number().int().min(0).optional().default(0),
        brand: zod_1.z.string().optional(),
    }),
});
const updateRatingZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        userID: zod_1.z.string({
            required_error: "Seller ID is Required",
        }),
        rating: zod_1.z.number({
            required_error: "Rating is Required",
        }),
    }),
});
exports.ProductValidation = {
    productsZodSchema,
    updateProductSchema,
    updateRatingZodSchema,
};
