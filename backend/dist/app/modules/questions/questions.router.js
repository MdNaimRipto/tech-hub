"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionsRouter = void 0;
const express_1 = __importDefault(require("express"));
const questions_controller_1 = require("./questions.controller");
const zodValidationRequest_1 = __importDefault(require("../../../middleware/zodValidationRequest"));
const questions_validation_1 = require("./questions.validation");
const router = express_1.default.Router();
router.post("/addQuestion", (0, zodValidationRequest_1.default)(questions_validation_1.QuestionsValidation.questionsZodSchema), questions_controller_1.QuestionsController.addQuestion);
router.get("/getAllQuestions", questions_controller_1.QuestionsController.getAllQuestions);
router.get("/getQuestionsByProductID/:id", questions_controller_1.QuestionsController.getQuestionsByProductID);
router.patch("/updateQuestion/:id", questions_controller_1.QuestionsController.updateQuestion);
router.patch("/answerQuestion/:id", questions_controller_1.QuestionsController.answerQuestion);
exports.QuestionsRouter = router;
