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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const products_utils_1 = require("./products.utils");
const products_schema_1 = require("./products.schema");
const user_schema_1 = require("../user/user.schema");
const products_constant_1 = require("./products.constant");
const paginationHelpers_1 = require("../../../helpers/paginationHelpers");
const config_1 = __importDefault(require("../../../config/config"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
//* Upload Product Api
const uploadProduct = (payload, token) => __awaiter(void 0, void 0, void 0, function* () {
    jwtHelpers_1.jwtHelpers.jwtVerify(token, config_1.default.jwt_secret);
    // Saving Product Code
    const code = (0, products_utils_1.generateProductCode)();
    const isExistsCode = yield products_schema_1.Products.findOne({ code: code });
    if (isExistsCode) {
        throw new ApiError_1.default(http_status_1.default.CONFLICT, "Product Already Exists! Try Again");
    }
    payload.code = code;
    // Saving Discount Price
    const productPrice = parseFloat(payload.price);
    if (productPrice <= 0) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Price Must be More then 0.");
    }
    if (payload.discount === 0) {
        payload.discountedPrice = productPrice;
    }
    else if (payload.discount < 0 || payload.discount > 100) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Discount must be between 0 and 100.");
    }
    else {
        const discountAmount = (productPrice * payload.discount) / 100;
        const discountPrice = productPrice - discountAmount;
        payload.discountedPrice = discountPrice;
    }
    // Saving all Rating:
    payload.allRating = [0];
    // Save Product
    yield products_schema_1.Products.create(payload);
    return null;
});
//* Get All Products //! Filter
const getAllProducts = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: products_constant_1.productsSearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: "i",
                },
            })),
        });
    }
    //
    if (Object.keys(filterData).length) {
        andConditions.push({
            $and: Object.entries(filterData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    //
    const { page, limit, skip, sortBy, sortOrder } = (0, paginationHelpers_1.calculatePaginationFunction)(paginationOptions);
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    //
    const checkAndCondition = (andConditions === null || andConditions === void 0 ? void 0 : andConditions.length) > 0 ? { $and: andConditions } : {};
    const products = yield products_schema_1.Products.find(checkAndCondition, {
        _id: 1,
        images: {
            i1: 1,
        },
        name: 1,
        price: 1,
        discountedPrice: 1,
    })
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    if (products.length === 0) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "No Products to Show");
    }
    const total = yield products_schema_1.Products.countDocuments(checkAndCondition);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: products,
    };
});
//* Get Product By Category //! Filter
const getProductsByCategory = (category, filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: products_constant_1.productsSearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: "i",
                },
            })),
        });
    }
    //
    if (Object.keys(filterData).length) {
        andConditions.push({
            $and: Object.entries(filterData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    //
    const { page, limit, skip, sortBy, sortOrder } = (0, paginationHelpers_1.calculatePaginationFunction)(paginationOptions);
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    //
    const checkAndCondition = (andConditions === null || andConditions === void 0 ? void 0 : andConditions.length) > 0 ? { $and: andConditions } : {};
    const query = Object.assign({ category: category }, checkAndCondition);
    const products = yield products_schema_1.Products.find(query, {
        _id: 1,
        images: {
            i1: 1,
        },
        name: 1,
        features: {
            f1: 1,
            f2: 1,
            f3: 1,
        },
        price: 1,
        discountedPrice: 1,
        rating: 1,
    })
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    if (products.length === 0) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "No Products to Show");
    }
    const total = yield products_schema_1.Products.countDocuments(checkAndCondition);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: products,
    };
});
//* Get Product By ID
const getProductsByID = (productID) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield products_schema_1.Products.findById({ _id: productID }, {
        discount: 0,
        quantity: 0,
        allRating: 0,
        code: 0,
        sellerID: 0,
    });
    if (!product) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "No Product found");
    }
    return product;
});
//* Update Product
const updateProduct = (productID, payload, token) => __awaiter(void 0, void 0, void 0, function* () {
    jwtHelpers_1.jwtHelpers.jwtVerify(token, config_1.default.jwt_secret);
    const isExistsProduct = yield products_schema_1.Products.findById({ _id: productID });
    if (!isExistsProduct) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Product Not Found!");
    }
    const { status, allRating, rating, code, sellerID, images, features, discount } = payload, restData = __rest(payload, ["status", "allRating", "rating", "code", "sellerID", "images", "features", "discount"]);
    const updatedData = Object.assign({}, restData);
    if (status ||
        allRating ||
        rating !== undefined ||
        code !== undefined ||
        sellerID !== undefined) {
        throw new ApiError_1.default(http_status_1.default.PRECONDITION_FAILED, "Failed to Update! Please Try Again.");
    }
    if (images && Object.keys(images).length > 0) {
        Object.keys(images).map(key => {
            const imagesKey = `images.${key}`;
            updatedData[imagesKey] = images[key];
        });
    }
    if (features && Object.keys(features).length > 0) {
        Object.keys(features).map(key => {
            const featuresKey = `features.${key}`;
            updatedData[featuresKey] =
                features[key];
        });
    }
    // Saving Discount Price
    const productPrice = parseFloat(isExistsProduct.price);
    if (discount) {
        if (discount === 0) {
            isExistsProduct.discountedPrice = productPrice;
        }
        else if (Number(discount) < 0 || Number(discount) > 100) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Discount must be between 0 and 100.");
        }
        else {
            const discountAmount = (productPrice * Number(discount)) / 100;
            const discountPrice = productPrice - discountAmount;
            updatedData.discountedPrice = discountPrice;
        }
    }
    yield products_schema_1.Products.findOneAndUpdate({ _id: productID }, updatedData, {
        new: true,
    });
    return null;
});
//* Update Rating Function:
const updateProductRating = (id, useID, newRating, token) => __awaiter(void 0, void 0, void 0, function* () {
    jwtHelpers_1.jwtHelpers.jwtVerify(token, config_1.default.jwt_secret);
    const isExists = yield products_schema_1.Products.findById({ _id: id });
    if (!isExists) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Product Not Found!");
    }
    const checkUser = yield user_schema_1.Users.findById({ _id: useID });
    if ((checkUser === null || checkUser === void 0 ? void 0 : checkUser.id) === isExists.sellerID) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "Permission Denied! Please Try Again.");
    }
    const { allRating } = isExists;
    if (allRating) {
        allRating.push(newRating);
        const totalRating = allRating.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        const ratingCount = allRating.length - 1;
        const avgRating = totalRating / ratingCount;
        isExists.rating = avgRating >= 5 ? 5 : parseFloat(avgRating.toFixed(1));
    }
    yield products_schema_1.Products.findOneAndUpdate({ _id: id }, isExists, {
        new: true,
    });
    return null;
});
// * Product Service Export
exports.ProductService = {
    uploadProduct,
    getAllProducts,
    getProductsByCategory,
    getProductsByID,
    updateProduct,
    updateProductRating,
};
