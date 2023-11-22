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
exports.OrderService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const user_schema_1 = require("../user/user.schema");
const order_schema_1 = require("./order.schema");
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const config_1 = __importDefault(require("../../../config/config"));
const paginationHelpers_1 = require("../../../helpers/paginationHelpers");
const order_utils_1 = require("./order.utils");
const products_schema_1 = require("../products/products.schema");
//* Add Order
const addOrder = (payload, token) => __awaiter(void 0, void 0, void 0, function* () {
    jwtHelpers_1.jwtHelpers.jwtVerify(token, config_1.default.jwt_secret);
    const { userID, products } = payload;
    const isUserExists = yield user_schema_1.Users.findById({ _id: userID }, {
        _id: 1,
        uid: 1,
    }).lean();
    if (!isUserExists) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User Does Not Exist's!");
    }
    if (isUserExists.uid === config_1.default.admin_uid) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Admin Can't Order Products!");
    }
    if (!products.length) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "Product Cart Cannot Be Empty!");
    }
    for (const orderProduct of products) {
        const productId = orderProduct.productID;
        const product = (yield products_schema_1.Products.findOne({ _id: productId }));
        if (product.quantity <= 0 || product.status === false) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Product is Out Of Stock!");
        }
        if (product.quantity < orderProduct.quantity) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Not Enough Product in Stock!");
        }
    }
    const code = (0, order_utils_1.generateOrderCode)();
    const isCodeExists = yield order_schema_1.Order.findOne({ code: code }, {
        code: 1,
    });
    if (isCodeExists) {
        throw new ApiError_1.default(http_status_1.default.CONFLICT, "Failed To Order! Try Again");
    }
    payload.code = code;
    const order = (yield order_schema_1.Order.create(payload)).populate({
        path: "products.productID",
        select: "-_id quantity totalSale status",
    });
    return order;
});
//* Get All Orders:
const getAllOrders = (paginationOptions, token) => __awaiter(void 0, void 0, void 0, function* () {
    jwtHelpers_1.jwtHelpers.jwtVerify(token, config_1.default.jwt_secret);
    const { page, limit, skip, sortBy, sortOrder } = (0, paginationHelpers_1.calculatePaginationFunction)(paginationOptions);
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const orders = yield order_schema_1.Order.find()
        .populate([
        {
            path: "userID",
            select: "-_id name email userProfile",
        },
        {
            path: "products.productID",
            select: "_id images.i1 name code",
        },
    ])
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    if (!orders.length) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "0 Orders Found");
    }
    const total = order_schema_1.Order.length;
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: orders,
    };
});
//* Get Order by User ID
const getOrdersByUserID = (paginationOptions, userID, token) => __awaiter(void 0, void 0, void 0, function* () {
    jwtHelpers_1.jwtHelpers.jwtVerify(token, config_1.default.jwt_secret);
    const { page, limit, skip, sortBy, sortOrder } = (0, paginationHelpers_1.calculatePaginationFunction)(paginationOptions);
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const orders = yield order_schema_1.Order.find({ userID: userID }, {
        _id: 1,
        code: 1,
        createdAt: 1,
        totalPrice: 1,
        progress: 1,
    })
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    if (!orders.length) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "0 Orders Found");
    }
    const total = order_schema_1.Order.length;
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: orders,
    };
});
// * Get OrderDetails
const getOrdersByOrderID = (id, token) => __awaiter(void 0, void 0, void 0, function* () {
    jwtHelpers_1.jwtHelpers.jwtVerify(token, config_1.default.jwt_secret);
    const order = yield order_schema_1.Order.findById({ _id: id }).populate({
        path: "products.productID",
        select: "_id name images.i1 price",
    });
    if (!order) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Order Details Not Found!");
    }
    return order;
});
//* Get Orders By Progress Status:
const getOrdersByProgress = (progress, token) => __awaiter(void 0, void 0, void 0, function* () {
    jwtHelpers_1.jwtHelpers.jwtVerify(token, config_1.default.jwt_secret);
    const orders = yield order_schema_1.Order.find({ progress: progress }).populate([
        {
            path: "userID",
            select: "-_id name email userProfile",
        },
        {
            path: "products.productID",
            select: "_id images.i1 name code",
        },
    ]);
    if (!orders.length) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "0 Orders Found");
    }
    return orders;
});
//* Update Order Status
const updateOrderStatus = (orderID, status, token) => __awaiter(void 0, void 0, void 0, function* () {
    jwtHelpers_1.jwtHelpers.jwtVerify(token, config_1.default.jwt_secret);
    const isOrderExists = yield order_schema_1.Order.findById({ _id: orderID }, {
        progress: 1,
        products: 1,
    })
        .populate({
        path: "products.productID",
        select: "quantity totalSale status",
    })
        .lean();
    if (!isOrderExists) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Order Does Not Exist's!");
    }
    if (isOrderExists.progress === "Completed") {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Cannot Update! Order Has Been Completed.");
    }
    if (isOrderExists.progress === "Canceled") {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Cannot Update! Order Has Been Canceled.");
    }
    isOrderExists.progress = status;
    if ((isOrderExists === null || isOrderExists === void 0 ? void 0 : isOrderExists.progress) === "Completed") {
        for (const orderProduct of isOrderExists === null || isOrderExists === void 0 ? void 0 : isOrderExists.products) {
            const productId = orderProduct.productID;
            const product = (yield products_schema_1.Products.findOne({ _id: productId }));
            if (product.quantity <= 0 || product.status === false) {
                throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Cannot Update Product Which is Out Of Stock!");
            }
            product.quantity = product.quantity - orderProduct.quantity;
            product.totalSale += 1;
            if (product.quantity === 0) {
                product.status = false;
            }
            yield products_schema_1.Products.findOneAndUpdate({ code: product.code }, product, {
                new: true,
            });
        }
    }
    const result = yield order_schema_1.Order.findOneAndUpdate({ _id: orderID }, isOrderExists, {
        new: true,
    });
    return result;
});
exports.OrderService = {
    addOrder,
    getAllOrders,
    getOrdersByUserID,
    getOrdersByOrderID,
    getOrdersByProgress,
    updateOrderStatus,
};
