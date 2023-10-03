"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PcBuilderValidation = void 0;
const zod_1 = __importDefault(require("zod"));
const pcBuilderSchema = zod_1.default.object({
    body: zod_1.default.object({
        userID: zod_1.default.string({
            required_error: "User Id is Required",
        }),
        buildName: zod_1.default.string({
            required_error: "Build Name is Required",
        }),
        build: zod_1.default.object({
            cpu: zod_1.default.string().optional(),
            cpuCooler: zod_1.default.string().optional(),
            motherboard: zod_1.default.string().optional(),
            ram1: zod_1.default.string().optional(),
            ram2: zod_1.default.string().optional(),
            ram3: zod_1.default.string().optional(),
            ram4: zod_1.default.string().optional(),
            storage1: zod_1.default.string().optional(),
            storage2: zod_1.default.string().optional(),
            gpu: zod_1.default.string().optional(),
            psu: zod_1.default.string().optional(),
            casing: zod_1.default.string().optional(),
            monitor: zod_1.default.string().optional(),
            casingCooler: zod_1.default.string().optional(),
            keyboard: zod_1.default.string().optional(),
            mouse: zod_1.default.string().optional(),
            speaker: zod_1.default.string().optional(),
            headphone: zod_1.default.string().optional(),
        }),
    }),
});
exports.PcBuilderValidation = {
    pcBuilderSchema,
};
