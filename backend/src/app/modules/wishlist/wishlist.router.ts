import express from "express";
import { WishlistController } from "./wishlist.controller";
import zodValidationRequest from "../../../middleware/zodValidationRequest";
import { WishlistValidation } from "./wishlist.validation";

const router = express.Router();

router.post(
  "/addWishlist",
  zodValidationRequest(WishlistValidation.wishlistZodSchema),
  WishlistController.addWishlist
);

router.get("/getWishlists/:id", WishlistController.getWishlistsByUserID);

router.delete(
  "/deleteWishlist",
  zodValidationRequest(WishlistValidation.deleteWishlistZodSchema),
  WishlistController.deleteWishlist
);

export const WishlistRouter = router;
