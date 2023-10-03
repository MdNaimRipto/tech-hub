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
exports.ReviewsService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const user_schema_1 = require("../user/user.schema");
const products_schema_1 = require("../products/products.schema");
const reviews_schema_1 = require("./reviews.schema");
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const config_1 = __importDefault(require("../../../config/config"));
// Add Review:
const addReview = (payload, token) => __awaiter(void 0, void 0, void 0, function* () {
    jwtHelpers_1.jwtHelpers.jwtVerify(token, config_1.default.jwt_secret);
    const { userId, productId } = payload;
    const isExistsUser = yield user_schema_1.Users.findById({ _id: userId }, {
        _id: 1,
    });
    if (!isExistsUser) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User Does Not Exist's!");
    }
    const isProductExists = yield products_schema_1.Products.findById({ _id: productId }, {
        _id: 0,
        sellerID: 1,
    });
    if (!isProductExists) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Product Does Not Exist's!");
    }
    if (String(userId) === isProductExists.sellerID) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "Failed to Add Review!");
    }
    yield reviews_schema_1.Reviews.create(payload);
    return null;
});
// Get Reviews By Product ID
const getReviewsByProductID = (productID) => __awaiter(void 0, void 0, void 0, function* () {
    const reviews = yield reviews_schema_1.Reviews.find({ productId: productID }).populate({
        path: "userId",
        select: "_id name userProfile",
    });
    if (reviews.length === 0) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "0 Reviews Added");
    }
    return reviews;
});
// Update Review
const updateReview = (reviewID, payload, token) => __awaiter(void 0, void 0, void 0, function* () {
    jwtHelpers_1.jwtHelpers.jwtVerify(token, config_1.default.jwt_secret);
    const isExistsReview = yield reviews_schema_1.Reviews.findById({ _id: reviewID }, {
        userId: 1,
        review: 1,
    }).lean();
    if (!isExistsReview) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Review Not Found!");
    }
    const { userId, newReview } = payload;
    const isExistsUser = yield user_schema_1.Users.findById({ _id: userId }, {
        _id: 1,
    }).lean();
    if (!isExistsUser) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User Does Not Exist's!");
    }
    // Checking User is valid or not
    if (userId !== String(isExistsReview.userId)) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "Permission Denied! Please Try Again");
    }
    isExistsReview.review = newReview;
    yield reviews_schema_1.Reviews.findOneAndUpdate({ _id: reviewID }, isExistsReview, {
        new: true,
    });
    return null;
});
exports.ReviewsService = {
    addReview,
    getReviewsByProductID,
    updateReview,
};
