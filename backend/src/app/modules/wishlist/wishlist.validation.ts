import { z } from "zod";

const wishlistZodSchema = z.object({
  body: z.object({
    userID: z.string({
      required_error: "User ID is Required",
    }),
    productID: z.string({
      required_error: "Product ID is Required",
    }),
  }),
});

const deleteWishlistZodSchema = z.object({
  body: z.object({
    userID: z.string({
      required_error: "User ID is Required",
    }),
    wishlistId: z.string({
      required_error: "Wishlist ID is Required",
    }),
  }),
});

export const WishlistValidation = {
  wishlistZodSchema,
  deleteWishlistZodSchema,
};
