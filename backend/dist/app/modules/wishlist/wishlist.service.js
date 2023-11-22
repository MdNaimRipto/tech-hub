"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishlistService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const products_schema_1 = require("../products/products.schema");
const user_schema_1 = require("../user/user.schema");
const wishlist_schema_1 = require("./wishlist.schema");
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const config_1 = __importDefault(require("../../../config/config"));
// Add Wishlist:
const addWishlist = (payload, token) => __awaiter(void 0, void 0, void 0, function* () {
    jwtHelpers_1.jwtHelpers.jwtVerify(token, config_1.default.jwt_secret);
    const { productID, userID } = payload;
    if (!productID || !userID) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "Failed to Wishlist Product!");
    }
    const isProductExists = yield products_schema_1.Products.findById({ _id: productID }, {
        _id: 1,
    }).lean();
    if (!isProductExists) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Product Does Not Exist's!");
    }
    const isUserExists = yield user_schema_1.Users.findById({ _id: userID }, {
        _id: 1,
    }).lean();
    if (!isUserExists) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User Does Not Exist's!");
    }
    const isWishlistExists = yield wishlist_schema_1.Wishlist.findOne({
        productID: productID,
        userID: userID, // Include the userID condition
    }, {
        _id: 1,
    }).lean();
    if (isWishlistExists) {
        throw new ApiError_1.default(http_status_1.default.CONFLICT, "Product Already Added to Wishlist!");
    }
    const newWishlist = yield wishlist_schema_1.Wishlist.create(payload);
    return newWishlist;
});
// Get wishlists By Product ID
const getWishlistsByUserID = (userID, token) => __awaiter(void 0, void 0, void 0, function* () {
    jwtHelpers_1.jwtHelpers.jwtVerify(token, config_1.default.jwt_secret);
    const wishlists = yield wishlist_schema_1.Wishlist.find({ userID: userID }).populate({
        path: "productID",
        select: "_id images.i1 name status price",
    });
    return wishlists;
});
// Delete Wishlist Product
const deleteWishlist = (payload, token) => __awaiter(void 0, void 0, void 0, function* () {
    jwtHelpers_1.jwtHelpers.jwtVerify(token, config_1.default.jwt_secret);
    const { userID, wishlistId } = payload;
    const isExistsWishlist = yield wishlist_schema_1.Wishlist.findById({ _id: wishlistId }, {
        _id: 0,
        userID: 1,
    });
    if (!isExistsWishlist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Product on Wishlist Does Not Exist's!");
    }
    if (isExistsWishlist.userID !== userID) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Permission Denied! Please Try Again.");
    }
    yield wishlist_schema_1.Wishlist.findOneAndDelete({ _id: wishlistId }, {
        new: true,
    });
    return null;
});
exports.WishlistService = {
    addWishlist,
    getWishlistsByUserID,
    deleteWishlist,
};
