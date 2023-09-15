import { z } from "zod";

const productsZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
    }),
    images: z.object({
      i1: z.string({ required_error: "Image 1 is Required" }),
      i2: z.string({ required_error: "Image 2 is Required" }),
      i3: z.string({ required_error: "Image 3 is Required" }),
      i4: z.string({ required_error: "Image 4 is Required" }),
    }),
    features: z.object({
      f1: z.string({ required_error: "Feature 1 is Required" }),
      f2: z.string({ required_error: "Feature 2 is Required" }),
      f3: z.string({ required_error: "Feature 3 is Required" }),
      f4: z.string({ required_error: "Feature 4 is Required" }),
      f5: z.string({ required_error: "Feature 5 is Required" }),
    }),
    category: z.string({
      required_error: "Category is required",
    }),
    price: z.number().positive("Price must be a positive number"),
    discount: z
      .number()
      .min(0, "Discount must be At least 0")
      .max(99, "Discount can be max 99"),
    quantity: z.number().int().positive("Quantity must be a positive integer"),
    status: z
      .boolean({
        required_error: "Status must be a boolean",
      })
      .default(true),
    description: z.string({
      required_error: "Description is required",
    }),
    allRating: z
      .array(
        z
          .number({
            required_error: "All Rating is required",
          })
          .default(0)
      )
      .default([0]),
    rating: z
      .number()
      .int()
      .min(0, "Rating must be a non-negative integer")
      .default(0),
    brand: z.string({
      required_error: "Brand is required",
    }),
  }),
});

const updateProductSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    images: z
      .object({
        i1: z.string().optional(),
        i2: z.string().optional(),
        i3: z.string().optional(),
        i4: z.string().optional(),
      })
      .optional(),
    features: z
      .object({
        f1: z.string().optional(),
        f2: z.string().optional(),
        f3: z.string().optional(),
        f4: z.string().optional(),
        f5: z.string().optional(),
      })
      .optional(),
    category: z.string().optional(),
    price: z.number().positive().optional(),
    discount: z.number().min(0).max(99).optional(),
    quantity: z.number().int().positive().optional(),
    status: z.boolean().optional().default(true),
    description: z.string().optional(),
    allRating: z.array(z.number().default(0)).optional().default([0]),
    rating: z.number().int().min(0).optional().default(0),
    brand: z.string().optional(),
  }),
});

export const ProductValidation = {
  productsZodSchema,
  updateProductSchema,
};
