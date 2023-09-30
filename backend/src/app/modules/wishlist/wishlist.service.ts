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

  const isProductExists = await Products.findById(
    { _id: productID },
    {
      _id: 1,
    }
  ).lean();
  if (!isProductExists) {
    throw new ApiError(httpStatus.NOT_FOUND, "Product Does Not Exist's!");
  }

  const isUserExists = await Users.findById(
    { _id: userID },
    {
      _id: 1,
    }
  ).lean();
  if (!isUserExists) {
    throw new ApiError(httpStatus.NOT_FOUND, "User Does Not Exist's!");
  }

  const isWishlistExists = await Wishlist.findOne(
    {
      productID: productID,
      userID: userID, // Include the userID condition
    },
    {
      _id: 1,
    }
  ).lean();

  if (isWishlistExists) {
    throw new ApiError(
      httpStatus.CONFLICT,
      "Product Already Added to Wishlist!"
    );
  }

  const newWishlist = await Wishlist.create(payload);
  return newWishlist;
};

// Get wishlists By Product ID
const getWishlistsByUserID = async (userID: string): Promise<IWishlist[]> => {
  const wishlists = await Wishlist.find({ userID: userID }).populate({
    path: "productID",
    select: "_id images.i1 name status price",
  });
  if (wishlists.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, "0 Product's Found");
  }

  return wishlists;
};

// Delete Wishlist Product
const deleteWishlist = async (payload: IDeleteWishlist): Promise<null> => {
  const { userID, wishlistId } = payload;
  const isExistsWishlist = await Wishlist.findById(
    { _id: wishlistId },
    {
      _id: 0,
      userID: 1,
    }
  );
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

  await Wishlist.findOneAndDelete(
    { _id: wishlistId },
    {
      new: true,
    }
  );

  return null;
};

export const WishlistService = {
  addWishlist,
  getWishlistsByUserID,
  deleteWishlist,
};
