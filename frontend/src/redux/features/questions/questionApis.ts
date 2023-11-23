import { config } from "@/config/apiConfig";
import { api } from "../../apis/apiSlice";

const questionApis = api.injectEndpoints({
  endpoints: builder => ({
    askQuestion: builder.mutation({
      query: ({ data }) => ({
        url: config.QUESTIONS.ASK_QUESTION,
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: data,
      }),
      invalidatesTags: ["askQuestion"],
    }),
    getProductsQuestions: builder.query({
      query: ({ id }) => ({
        url: `${config.QUESTIONS.GET_PRODUCTS_QUESTION}/${id}`,
      }),
      providesTags: ["askQuestion", "answerQuestion"],
    }),
    getAllQuestions: builder.query({
      query: ({ token }) => ({
        url: config.QUESTIONS.GET_ALL_QUESTIONS,
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["askQuestion", "answerQuestion"],
    }),
    answerQuestion: builder.mutation({
      query: ({ data, token, id }) => ({
        url: `${config.QUESTIONS.ANSWER_QUESTION}/${id}`,
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: ["answerQuestion"],
    }),
  }),
});

export const {
  useAskQuestionMutation,
  useGetProductsQuestionsQuery,
  useGetAllQuestionsQuery,
  useAnswerQuestionMutation,
} = questionApis;
