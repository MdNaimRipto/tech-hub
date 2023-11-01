import { config } from "@/config/apiConfig";
import { api } from "../../apis/apiSlice";

const authApis = api.injectEndpoints({
  endpoints: builder => ({
    userRegister: builder.mutation({
      query: ({ data }) => ({
        url: config.AUTH.REGISTER,
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: data,
      }),
      invalidatesTags: ["getAuthenticatedUser"],
    }),
    userLogin: builder.mutation({
      query: ({ data }) => ({
        url: config.AUTH.LOGIN,
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: data,
      }),
      invalidatesTags: ["getAuthenticatedUser"],
    }),
    getAuthenticatedUser: builder.query({
      query: ({ token }) => ({
        url: `${config.AUTH.GET_AUTHENTICATED_DATA}`,
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["getAuthenticatedUser"],
    }),
  }),
});

export const {
  useUserRegisterMutation,
  useUserLoginMutation,
  useGetAuthenticatedUserQuery,
} = authApis;
