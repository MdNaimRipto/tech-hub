"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reviews = exports.reviewsSchema = void 0;
const mongoose_1 = require("mongoose");
exports.reviewsSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "Users" },
    productId: { type: String, required: true },
    review: { type: String, required: true },
    rating: { type: Number, required: true },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Reviews = (0, mongoose_1.model)("Reviews", exports.reviewsSchema);
