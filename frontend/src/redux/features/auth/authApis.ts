import { config } from "@/config/apiConfig";
import { api } from "../../apis/apiSlice";

const authApis = api.injectEndpoints({
  endpoints: builder => ({
    userLogin: builder.mutation({
      query: ({ data }) => ({
        url: config.AUTH.LOGIN,
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: data,
      }),
      invalidatesTags: [],
    }),
    getAuthenticatedUser: builder.query({
      query: () => ({
        url: `${config.PRODUCTS.GET_ALL_PRODUCT}`,
      }),
      providesTags: [],
    }),
  }),
});

export const { useUserLoginMutation, useGetAuthenticatedUserQuery } = authApis;
