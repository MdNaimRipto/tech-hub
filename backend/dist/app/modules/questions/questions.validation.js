"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionsValidation = void 0;
const zod_1 = require("zod");
const questionsZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        userUID: zod_1.z.string({
            required_error: "User UID is Required",
        }),
        userName: zod_1.z.string({
            required_error: "User Name is Required",
        }),
        productId: zod_1.z.string({
            required_error: "Product ID is Required",
        }),
        question: zod_1.z.string({
            required_error: "Question is Required",
        }),
        answer: zod_1.z
            .string({
            required_error: "Answer is Required",
        })
            .default("No Answer Yet!"),
    }),
});
exports.QuestionsValidation = {
    questionsZodSchema,
};
