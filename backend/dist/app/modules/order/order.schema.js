"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = exports.orderSchema = void 0;
const mongoose_1 = require("mongoose");
const order_constant_1 = require("./order.constant");
exports.orderSchema = new mongoose_1.Schema({
    userID: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "Users" },
    products: [
        {
            productID: {
                type: mongoose_1.Schema.Types.ObjectId,
                required: true,
                ref: "Products",
            },
            quantity: { type: Number, required: true, min: 1 },
        },
    ],
    totalPrice: { type: Number, required: true, min: 1 },
    code: { type: String, required: true, unique: true },
    progress: { type: String, enum: order_constant_1.OrderProgressSteps, default: "Pending" },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Order = (0, mongoose_1.model)("Order", exports.orderSchema);
