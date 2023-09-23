import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IDeleteWishlist, IWishlist } from "./wishlist.interface";
import { Products } from "../products/products.schema";
import { Users } from "../user/user.schema";
import { Wishlist } from "./wishlist.schema";

// Add Wishlist:
const addWishlist = async (payload: IWishlist): Promise<IWishlist> => {
  const { productID, userID } = payload;

  if (!productID || !userID) {
    throw new ApiError(httpStatus.FORBIDDEN, "Failed to Wishlist Product!");
  }

  const isProductExists = await Products.findById({ _id: productID });
  if (!isProductExists) {
    throw new ApiError(httpStatus.NOT_FOUND, "Product Does Not Exist's!");
  }

  const isUserExists = await Users.findById({ _id: userID });
  if (!isUserExists) {
    throw new ApiError(httpStatus.NOT_FOUND, "User Does Not Exist's!");
  }

  const isWishlistExists = Wishlist.findOne({ productID: productID });

  if (await isWishlistExists) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      "Product Already Added to Wishlist!"
    );
  }

  const question = await Wishlist.create(payload);
  return question;
};

// Get wishlists By Product ID
const getWishlistsByUserID = async (userID: string): Promise<IWishlist[]> => {
  const wishlists = await Wishlist.find({ userID: userID }).populate(
    "productID"
  );
  if (wishlists.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, "0 Product's Found");
  }

  return wishlists;
};

// Delete Wishlist Product
const deleteWishlist = async (
  payload: IDeleteWishlist
): Promise<IWishlist | null> => {
  const { userID, wishlistId } = payload;
  const isExistsWishlist = await Wishlist.findById({ _id: wishlistId });
  if (!isExistsWishlist) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Product on Wishlist Does Not Exist's!"
    );
  }

  if (isExistsWishlist.userID !== userID) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "Permission Denied! Please Try Again."
    );
  }

  const result = await Wishlist.findOneAndDelete(
    { _id: wishlistId },
    {
      new: true,
    }
  );

  return result;
};

export const WishlistService = {
  addWishlist,
  getWishlistsByUserID,
  deleteWishlist,
};
