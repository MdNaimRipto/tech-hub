import express from "express";
import { QuestionsController } from "./questions.controller";
import zodValidationRequest from "../../../middleware/zodValidationRequest";
import { QuestionsValidation } from "./questions.validation";

const router = express.Router();

router.post(
  "/addQuestion",
  zodValidationRequest(QuestionsValidation.questionsZodSchema),
  QuestionsController.addQuestion
);

router.get("/getAllQuestions", QuestionsController.getAllQuestions);

router.get(
  "/getQuestionsByProductID/:id",
  QuestionsController.getQuestionsByProductID
);

router.patch("/updateQuestion/:id", QuestionsController.updateQuestion);

router.patch("/answerQuestion/:id", QuestionsController.answerQuestion);

export const QuestionsRouter = router;
