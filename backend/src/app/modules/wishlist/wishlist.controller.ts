import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { WishlistService } from "./wishlist.service";

// Add Wishlist
const addWishlist = catchAsync(async (req: Request, res: Response) => {
  const { ...wishlistPayload } = req.body;

  const wishlist = await WishlistService.addWishlist(wishlistPayload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Product Added to Wishlist.",
    data: wishlist,
  });
});

// Get Wishlist's by User ID
const getWishlistsByUserID = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const wishlists = await WishlistService.getWishlistsByUserID(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Wishlist Product's Retrieved Successfully",
    data: wishlists,
  });
});

// Get Wishlist's by User ID
const deleteWishlist = catchAsync(async (req: Request, res: Response) => {
  const { ...deletePayload } = req.body;

  const wishlist = await WishlistService.deleteWishlist(deletePayload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Product Removed From Wishlist.",
    data: wishlist,
  });
});

export const WishlistController = {
  addWishlist,
  getWishlistsByUserID,
  deleteWishlist,
};
