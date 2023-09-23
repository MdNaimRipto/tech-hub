import { Schema, model } from "mongoose";
import { IQuestions } from "./questions.interface";

export const questionsSchema = new Schema<IQuestions>(
  {
    userUID: { type: String, required: true },
    userName: { type: String, required: true },
    productId: { type: String, required: true },
    question: { type: String, required: true },
    answer: { type: String, required: true, default: "No Answer Yet!" },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Questions = model<IQuestions>("Questions", questionsSchema);
