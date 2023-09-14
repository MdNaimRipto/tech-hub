import { z } from "zod";

const productsZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
    }),
    images: z.array(
      z.string({
        required_error: "Images are required",
      })
    ),
    features: z.array(
      z.string({
        required_error: "Features are required",
      })
    ),
    category: z.string({
      required_error: "Category is required",
    }),
    price: z.number().positive("Price must be a positive number"),
    discount: z.number().positive("Discount must be a positive number"),
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

export const ProductValidation = {
  productsZodSchema,
};
