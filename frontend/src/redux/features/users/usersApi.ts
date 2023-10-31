import { api } from "../../apis/apiSlice";

const usersApi = api.injectEndpoints({
  endpoints: builder => ({
    getAllUsers: builder.query({
      query: ({ token }) => ({
        url: `/user/getAllUsers`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: [],
    }),
  }),
});

export const { useGetAllUsersQuery } = usersApi;
