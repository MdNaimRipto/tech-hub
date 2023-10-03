"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderValidation = void 0;
const zod_1 = require("zod");
const order_constant_1 = require("./order.constant");
const productSchema = zod_1.z.object({
    productID: zod_1.z.string({
        required_error: "Product ID is Required",
    }),
    quantity: zod_1.z.number({
        required_error: "Quantity is required",
    }),
});
const orderZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        userID: zod_1.z.string({
            required_error: "User ID is Required",
        }),
        products: zod_1.z.array(productSchema),
        totalPrice: zod_1.z.number({
            required_error: "Total Price is Required",
        }),
        progress: zod_1.z
            .enum([...order_constant_1.OrderProgressSteps], {
            required_error: "Progress is required",
        })
            .default("Pending"),
    }),
});
const updateOrderStatus = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.enum([...order_constant_1.OrderProgressSteps], {
            required_error: "Progress must be one of `Pending`, `Processing`, `Verifying`, `Confirmed`, `Delivered`, `Completed`, or `Canceled`",
        }),
    }),
});
exports.OrderValidation = {
    orderZodSchema,
    updateOrderStatus,
};
