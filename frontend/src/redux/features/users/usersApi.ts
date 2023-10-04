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

    // updatePassword: builder.mutation({
    //   query: ({ data }) => ({
    //     url: config.HOSPITAL.UPDATE_PASSWORD,
    //     method: "PATCH",
    //     headers: {
    //       "content-type": "application/json",
    //     },
    //     body: data,
    //   }),
    //   invalidatesTags: [],
    // }),
  }),
});

export const { useGetAllUsersQuery } = usersApi;
