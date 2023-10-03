"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Products = exports.productSchema = void 0;
const mongoose_1 = require("mongoose");
exports.productSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    images: {
        type: {
            i1: { type: String, required: true },
            i2: { type: String, required: true },
            i3: { type: String, required: true },
            i4: { type: String, required: true },
        },
        required: true,
    },
    features: {
        type: {
            f1: { type: String, required: true },
            f2: { type: String, required: true },
            f3: { type: String, required: true },
            f4: { type: String, required: true },
            f5: { type: String, required: true },
        },
        required: true,
    },
    category: { type: String, required: true },
    discount: { type: Number, required: true, default: 0, min: 0, max: 99 },
    price: { type: String, required: true },
    discountedPrice: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 0 },
    status: { type: Boolean, required: true, default: true },
    description: { type: String, required: true },
    allRating: [{ type: Number, required: true, default: 0, min: 0, max: 5 }],
    rating: { type: Number, required: true, default: 0 },
    brand: { type: String, required: true },
    code: { type: String, required: true },
    sellerID: { type: String, required: true },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Products = (0, mongoose_1.model)("Products", exports.productSchema);
