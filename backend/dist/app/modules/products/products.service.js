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
        payload.discountedPrice = Math.floor(discountPrice);
    }
    // Saving all Rating:
    payload.allRating = [0];
    payload.brand = payload.brand.toLocaleLowerCase();
    // Save Product
    const result = yield products_schema_1.Products.create(payload);
    return result;
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
            $and: Object.entries(filterData).map(([field, value]) => {
                if (field === "minPrice") {
                    return { discountedPrice: { $gte: value } };
                }
                if (field === "maxPrice") {
                    return { discountedPrice: { $lte: value } };
                }
                else {
                    return { [field]: value };
                }
            }),
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
        status: 1,
        category: 1,
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
            $and: Object.entries(filterData).map(([field, value]) => {
                if (field === "minPrice") {
                    return { discountedPrice: { $gte: value } };
                }
                if (field === "maxPrice") {
                    return { discountedPrice: { $lte: value } };
                }
                else {
                    return { [field]: value };
                }
            }),
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
            f2: 1,
            f3: 1,
            f4: 1,
            f5: 1,
        },
        price: 1,
        discountedPrice: 1,
        status: 1,
        brand: 1,
        category: 1,
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
const getTopSellingProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield products_schema_1.Products.find({ status: true })
        .sort({
        totalSale: -1,
    })
        .limit(8);
    if (products.length === 0) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "No Products to Show");
    }
    return products;
});
//* Get Product By ID
const getProductsByID = (productID) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield products_schema_1.Products.findById({ _id: productID }, {
        discount: 0,
        quantity: 0,
        allRating: 0,
        sellerID: 0,
    });
    if (!product) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "No Product found");
    }
    const rating = yield (0, products_utils_1.getProductRating)(productID);
    if (!rating) {
        product.rating = 0;
    }
    else {
        product.rating = rating;
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
    const { status, allRating, rating, code, sellerID, images, features, discount, price } = payload, restData = __rest(payload, ["status", "allRating", "rating", "code", "sellerID", "images", "features", "discount", "price"]);
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
            updatedData.discountedPrice = productPrice;
        }
        else if (Number(discount) < 0 || Number(discount) > 100) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Discount must be between 0 and 100.");
        }
        else {
            const discountAmount = (productPrice * Number(discount)) / 100;
            const discountPrice = productPrice - discountAmount;
            updatedData.discountedPrice = Math.floor(discountPrice);
        }
    }
    if (price) {
        const convertedPrice = parseFloat(price);
        if (isExistsProduct.discount === 0) {
            updatedData.discountedPrice = convertedPrice;
        }
        else if (Number(isExistsProduct.discount) < 0 ||
            Number(isExistsProduct.discount) > 100) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Discount must be between 0 and 100.");
        }
        else {
            console.log(isExistsProduct.discount);
            const discountAmount = (convertedPrice * Number(isExistsProduct.discount)) / 100;
            const discountPrice = convertedPrice - discountAmount;
            updatedData.price = price;
            updatedData.discountedPrice = Math.floor(discountPrice);
        }
    }
    yield products_schema_1.Products.findOneAndUpdate({ _id: productID }, updatedData, {
        new: true,
    });
    return null;
});
// * Product Service Export
exports.ProductService = {
    uploadProduct,
    getAllProducts,
    getProductsByCategory,
    getTopSellingProducts,
    getProductsByID,
    updateProduct,
};
