import { config } from "@/config/apiConfig";
import { api } from "../../apis/apiSlice";

const userApis = api.injectEndpoints({
  endpoints: builder => ({
    getAuthenticatedUser: builder.query({
      query: ({ token }) => ({
        url: `${config.USERS.GET_AUTHENTICATED_DATA}`,
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["getAuthenticatedUser", "updateUser"],
    }),
    updateUser: builder.mutation({
      query: ({ data, id, token }) => ({
        url: `${config.USERS.UPDATE_USER}/${id}`,
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: ["updateUser"],
    }),
  }),
});

export const { useGetAuthenticatedUserQuery, useUpdateUserMutation } = userApis;
