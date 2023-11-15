import { api } from "../../apis/apiSlice";

const usersApi = api.injectEndpoints({
  endpoints: builder => ({
    getAllUsers: builder.query({
      query: (option: { page: string; token: string }) => ({
        url: `/user/getAllUsers?page=${option.page}&limit=8`,
        headers: {
          Authorization: `Bearer ${option.token}`,
        },
      }),
      providesTags: [],
    }),
  }),
});

export const { useGetAllUsersQuery } = usersApi;
