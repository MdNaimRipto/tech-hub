"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishlistValidation = void 0;
const zod_1 = require("zod");
const wishlistZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        userID: zod_1.z.string({
            required_error: "User ID is Required",
        }),
        productID: zod_1.z.string({
            required_error: "Product ID is Required",
        }),
    }),
});
const deleteWishlistZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        userID: zod_1.z.string({
            required_error: "User ID is Required",
        }),
        wishlistId: zod_1.z.string({
            required_error: "Wishlist ID is Required",
        }),
    }),
});
exports.WishlistValidation = {
    wishlistZodSchema,
    deleteWishlistZodSchema,
};
