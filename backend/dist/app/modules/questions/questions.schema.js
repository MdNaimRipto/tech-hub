"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Questions = exports.questionsSchema = void 0;
const mongoose_1 = require("mongoose");
exports.questionsSchema = new mongoose_1.Schema({
    userUID: { type: String, required: true },
    userName: { type: String, required: true },
    productId: { type: String, required: true },
    question: { type: String, required: true },
    answer: { type: String, required: true, default: "No Answer Yet!" },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Questions = (0, mongoose_1.model)("Questions", exports.questionsSchema);
