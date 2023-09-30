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
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import { Secret } from "jsonwebtoken";

// Add Question:
const addQuestion = async (payload: IQuestions): Promise<IQuestions> => {
  const { productId, userUID } = payload;

  if (userUID === config.admin_uid) {
    throw new ApiError(httpStatus.FORBIDDEN, "Failed to Add Question!");
  }

  const isProductExists = await Products.findById(
    { _id: productId },
    {
      _id: 1,
    }
  ).lean();
  if (!isProductExists) {
    throw new ApiError(httpStatus.NOT_FOUND, "Product Does Not Exist's!");
  }

  const question = await Questions.create(payload);
  return question;
};

// Get All Questions
const getAllQuestions = async (token: string): Promise<IQuestions[]> => {
  jwtHelpers.jwtVerify(token, config.jwt_secret as Secret);

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
  payload: IUpdateQuestion,
  token: string
): Promise<IQuestions | null> => {
  jwtHelpers.jwtVerify(token, config.jwt_secret as Secret);

  const isExistsQuestion = await Questions.findById(
    { _id: questionID },
    {
      _id: 0,
      userUID: 1,
      question: 1,
    }
  );
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
  payload: IAnswerQuestion,
  token: string
): Promise<IQuestions | null> => {
  jwtHelpers.jwtVerify(token, config.jwt_secret as Secret);
  const isExistsQuestion = await Questions.findById(
    { _id: questionID },
    {
      _id: 0,
      answer: 1,
    }
  );
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
