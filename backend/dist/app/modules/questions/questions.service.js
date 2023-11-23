"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionsService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const user_schema_1 = require("../user/user.schema");
const products_schema_1 = require("../products/products.schema");
const questions_schema_1 = require("./questions.schema");
const config_1 = __importDefault(require("../../../config/config"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
// Add Question:
const addQuestion = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId, userUID } = payload;
    if (userUID === config_1.default.admin_uid) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "Failed to Add Question!");
    }
    const isProductExists = yield products_schema_1.Products.findById({ _id: productId }, {
        _id: 1,
    }).lean();
    if (!isProductExists) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Product Does Not Exist's!");
    }
    const question = yield questions_schema_1.Questions.create(payload);
    return question;
});
// Get All Questions
const getAllQuestions = (token) => __awaiter(void 0, void 0, void 0, function* () {
    jwtHelpers_1.jwtHelpers.jwtVerify(token, config_1.default.jwt_secret);
    const questions = yield questions_schema_1.Questions.find().sort({ createdAt: -1 });
    return questions;
});
// Get Questions By Product ID
const getQuestionsByProductID = (productID) => __awaiter(void 0, void 0, void 0, function* () {
    const questions = yield questions_schema_1.Questions.find({ productId: productID }).sort({
        createdAt: -1,
    });
    return questions;
});
// Update Question
const updateQuestion = (questionID, payload, token) => __awaiter(void 0, void 0, void 0, function* () {
    jwtHelpers_1.jwtHelpers.jwtVerify(token, config_1.default.jwt_secret);
    const isExistsQuestion = yield questions_schema_1.Questions.findById({ _id: questionID }, {
        _id: 0,
        userUID: 1,
        question: 1,
    });
    if (!isExistsQuestion) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Question Not Found!");
    }
    const { userUID, newQuestion } = payload;
    if (userUID === config_1.default.anonymous_user_uid) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Permission Denied! Please Try Again");
    }
    const isExistsUser = yield user_schema_1.Users.findOne({ uid: userUID });
    if (!isExistsUser) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User Does Not Exist's!");
    }
    // Checking User is valid or not
    if (userUID !== isExistsQuestion.userUID) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "Permission Denied! Please Try Again");
    }
    isExistsQuestion.question = newQuestion;
    const result = yield questions_schema_1.Questions.findOneAndUpdate({ _id: questionID }, isExistsQuestion, {
        new: true,
    });
    return result;
});
// Answer Question
const answerQuestion = (questionID, payload, token) => __awaiter(void 0, void 0, void 0, function* () {
    jwtHelpers_1.jwtHelpers.jwtVerify(token, config_1.default.jwt_secret);
    const isExistsQuestion = yield questions_schema_1.Questions.findById({ _id: questionID }, {
        _id: 0,
        answer: 1,
    });
    if (!isExistsQuestion) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Question Not Found!");
    }
    const { userUID, answer } = payload;
    if (userUID !== config_1.default.admin_uid) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Permission Denied! Please Try Again");
    }
    isExistsQuestion.answer = answer;
    const result = yield questions_schema_1.Questions.findOneAndUpdate({ _id: questionID }, isExistsQuestion, {
        new: true,
    });
    return result;
});
exports.QuestionsService = {
    addQuestion,
    getAllQuestions,
    getQuestionsByProductID,
    updateQuestion,
    answerQuestion,
};
