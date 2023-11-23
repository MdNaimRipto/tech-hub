import { config } from "@/config/apiConfig";
import { api } from "../../apis/apiSlice";

const reviewsAndRatingsApis = api.injectEndpoints({
  endpoints: builder => ({
    addReviewAndRating: builder.mutation({
      query: ({ data, token }) => ({
        url: config.REVIEW.ADD_REVIEW,
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: ["addReviewAndRating"],
    }),
    getReviews: builder.query({
      query: ({ id }) => ({
        url: `${config.REVIEW.GET_REVIEWS}/${id}`,
      }),
      providesTags: ["addReviewAndRating"],
    }),
  }),
});

export const { useAddReviewAndRatingMutation, useGetReviewsQuery } =
  reviewsAndRatingsApis;
