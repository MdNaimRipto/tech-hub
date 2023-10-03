"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRouter = void 0;
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("./order.controller");
const zodValidationRequest_1 = __importDefault(require("../../../middleware/zodValidationRequest"));
const order_validation_1 = require("./order.validation");
const router = express_1.default.Router();
router.post("/orderProducts", (0, zodValidationRequest_1.default)(order_validation_1.OrderValidation.orderZodSchema), order_controller_1.OrderController.addOrder);
router.get("/getAllOrders", order_controller_1.OrderController.getAllOrders);
router.get("/getUsersOrder/:id", order_controller_1.OrderController.getOrdersByUserID);
router.get("/getOrderDetails/:id", order_controller_1.OrderController.getOrdersByOrderID);
router.get("/getOrdersByProgress", order_controller_1.OrderController.getOrdersByProgress);
router.patch("/updateOrderStatus/:id", (0, zodValidationRequest_1.default)(order_validation_1.OrderValidation.updateOrderStatus), order_controller_1.OrderController.updateOrderStatus);
exports.OrderRouter = router;
