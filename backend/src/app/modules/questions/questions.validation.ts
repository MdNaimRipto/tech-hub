import { z } from "zod";

const questionsZodSchema = z.object({
  body: z.object({
    userUID: z.string({
      required_error: "User UID is Required",
    }),
    userName: z.string({
      required_error: "User Name is Required",
    }),
    productId: z.string({
      required_error: "Product ID is Required",
    }),
    question: z.string({
      required_error: "Question is Required",
    }),
    answer: z
      .string({
        required_error: "Answer is Required",
      })
      .default("No Answer Yet!"),
  }),
});

export const QuestionsValidation = {
  questionsZodSchema,
};
