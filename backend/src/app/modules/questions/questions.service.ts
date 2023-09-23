import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import {
  IAnswerQuestion,
  IQuestions,
  IUpdateQuestion,
} from "./questions.interface";
import { Users } from "../user/user.schema";
import { Products } from "../products/products.schema";
import { Questions } from "./questions.schema";
import config from "../../../config/config";

// Add Question:
const addQuestion = async (payload: IQuestions): Promise<IQuestions> => {
  const { productId } = payload;

  const isProductExists = await Products.findById({ _id: productId });
  if (!isProductExists) {
    throw new ApiError(httpStatus.NOT_FOUND, "Product Does Not Exist's!");
  }

  const question = await Questions.create(payload);
  return question;
};

// Get All Questions
const getAllQuestions = async (): Promise<IQuestions[]> => {
  const questions = await Questions.find();
  if (questions.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, "0 Questions Found");
  }

  return questions;
};

// Get Questions By Product ID
const getQuestionsByProductID = async (
  productID: string
): Promise<IQuestions[]> => {
  const questions = await Questions.find({ productId: productID });
  if (questions.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, "0 Questions Found");
  }

  return questions;
};

// Update Question
const updateQuestion = async (
  questionID: string,
  payload: IUpdateQuestion
): Promise<IQuestions | null> => {
  const isExistsQuestion = await Questions.findById({ _id: questionID });
  if (!isExistsQuestion) {
    throw new ApiError(httpStatus.NOT_FOUND, "Question Not Found!");
  }

  const { userUID, newQuestion } = payload;
  if (userUID === config.anonymous_user_uid) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "Permission Denied! Please Try Again"
    );
  }

  const isExistsUser = await Users.findOne({ uid: userUID });
  if (!isExistsUser) {
    throw new ApiError(httpStatus.NOT_FOUND, "User Does Not Exist's!");
  }

  // Checking User is valid or not
  if (userUID !== isExistsQuestion.userUID) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      "Permission Denied! Please Try Again"
    );
  }

  isExistsQuestion.question = newQuestion;

  const result = await Questions.findOneAndUpdate(
    { _id: questionID },
    isExistsQuestion,
    {
      new: true,
    }
  );

  return result;
};

// Answer Question
const answerQuestion = async (
  questionID: string,
  payload: IAnswerQuestion
): Promise<IQuestions | null> => {
  const isExistsQuestion = await Questions.findById({ _id: questionID });
  if (!isExistsQuestion) {
    throw new ApiError(httpStatus.NOT_FOUND, "Question Not Found!");
  }

  const { userUID, answer } = payload;
  if (userUID !== config.admin_uid) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "Permission Denied! Please Try Again"
    );
  }

  isExistsQuestion.answer = answer;

  const result = await Questions.findOneAndUpdate(
    { _id: questionID },
    isExistsQuestion,
    {
      new: true,
    }
  );

  return result;
};

export const QuestionsService = {
  addQuestion,
  getAllQuestions,
  getQuestionsByProductID,
  updateQuestion,
  answerQuestion,
};
