"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PcBuilder = void 0;
const mongoose_1 = require("mongoose");
const pcBuilderSchema = new mongoose_1.Schema({
    userID: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    },
    buildName: { type: String, required: true },
    code: { type: String, required: true },
    build: {
        cpu: {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Products",
            required: true,
        },
        cooler: {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Products",
        },
        motherboard: {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Products",
            required: true,
        },
        ram: {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Products",
            required: true,
        },
        storage: {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Products",
            required: true,
        },
        psu: {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Products",
            required: true,
        },
        gpu: {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Products",
        },
        casing: {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Products",
            required: true,
        },
        monitor: {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Products",
        },
        keyboard: {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Products",
        },
        mouse: {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Products",
        },
        speaker: {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Products",
        },
        headphone: {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Products",
        },
    },
});
exports.PcBuilder = (0, mongoose_1.model)("PcBuilder", pcBuilderSchema);
