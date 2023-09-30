import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { QuestionsService } from "./questions.service";
import { verifyAuthToken } from "../../../util/verifyAuthToken";

// Add Review
const addQuestion = catchAsync(async (req: Request, res: Response) => {
  const { ...questionData } = req.body;

  const question = await QuestionsService.addQuestion(questionData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Question Added Successfully",
    data: question,
  });
});

// Get all Question's
const getAllQuestions = catchAsync(async (req: Request, res: Response) => {
  const token = verifyAuthToken(req);

  const questions = await QuestionsService.getAllQuestions(token);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Questions Retrieved Successfully",
    data: questions,
  });
});

// Get Question's by Product ID
const getQuestionsByProductID = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const questions = await QuestionsService.getQuestionsByProductID(id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Questions Retrieved Successfully",
      data: questions,
    });
  }
);

// Update Question
const updateQuestion = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ...questionPayload } = req.body;
  const token = verifyAuthToken(req);

  const question = await QuestionsService.updateQuestion(
    id,
    questionPayload,
    token
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Question Updated Successfully",
    data: question,
  });
});

// Update Question
const answerQuestion = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ...questionPayload } = req.body;
  const token = verifyAuthToken(req);

  const answer = await QuestionsService.answerQuestion(
    id,
    questionPayload,
    token
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Question Answered",
    data: answer,
  });
});

export const QuestionsController = {
  addQuestion,
  getAllQuestions,
  getQuestionsByProductID,
  updateQuestion,
  answerQuestion,
};
