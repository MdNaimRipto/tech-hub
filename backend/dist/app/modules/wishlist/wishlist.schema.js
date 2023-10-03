"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wishlist = exports.wishlistSchema = void 0;
const mongoose_1 = require("mongoose");
exports.wishlistSchema = new mongoose_1.Schema({
    userID: { type: String, required: true },
    productID: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "Products" },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Wishlist = (0, mongoose_1.model)("Wishlist", exports.wishlistSchema);
