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
exports.OrderController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const order_service_1 = require("./order.service");
const verifyAuthToken_1 = require("../../../util/verifyAuthToken");
const pagination_constant_1 = require("../../../constants/pagination.constant");
const shared_1 = __importDefault(require("../../../shared/shared"));
// Add Order
const addOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderPayload = __rest(req.body, []);
    const token = (0, verifyAuthToken_1.verifyAuthToken)(req);
    const order = yield order_service_1.OrderService.addOrder(orderPayload, token);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Products Ordered.",
        data: order,
    });
}));
// Get All Orders
const getAllOrders = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = (0, verifyAuthToken_1.verifyAuthToken)(req);
    const options = (0, shared_1.default)(req.query, pagination_constant_1.paginationFields);
    const orders = yield order_service_1.OrderService.getAllOrders(options, token);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Orders Retrieved.",
        data: orders,
    });
}));
// Get All Orders
const getOrdersByUserID = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const token = (0, verifyAuthToken_1.verifyAuthToken)(req);
    const options = (0, shared_1.default)(req.query, pagination_constant_1.paginationFields);
    const orders = yield order_service_1.OrderService.getOrdersByUserID(options, id, token);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Orders Retrieved.",
        data: orders,
    });
}));
// Get All Orders
const getOrdersByOrderID = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const token = (0, verifyAuthToken_1.verifyAuthToken)(req);
    const order = yield order_service_1.OrderService.getOrdersByOrderID(id, token);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Orders Retrieved.",
        data: order,
    });
}));
// Get Orders By Progress Status
const getOrdersByProgress = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { progress } = req.body;
    const token = (0, verifyAuthToken_1.verifyAuthToken)(req);
    const orders = yield order_service_1.OrderService.getOrdersByProgress(progress, token);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Orders Retrieved.",
        data: orders,
    });
}));
// Update Order Status
const updateOrderStatus = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { status } = req.body;
    const token = (0, verifyAuthToken_1.verifyAuthToken)(req);
    const order = yield order_service_1.OrderService.updateOrderStatus(id, status, token);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Order Updated.",
        data: order,
    });
}));
exports.OrderController = {
    addOrder,
    getAllOrders,
    getOrdersByUserID,
    getOrdersByOrderID,
    getOrdersByProgress,
    updateOrderStatus,
};
