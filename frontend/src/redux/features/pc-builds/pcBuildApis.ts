import { config } from "@/config/apiConfig";
import { api } from "../../apis/apiSlice";

const pcBuildApis = api.injectEndpoints({
  endpoints: builder => ({
    uploadBuild: builder.mutation({
      query: ({ data, token }) => ({
        url: config.PC_BUILDER.UPLOAD_BUILD,
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: ["saveBuild"],
    }),
    getUserBuilds: builder.query({
      query: ({ id, token }) => ({
        url: `${config.PC_BUILDER.GET_USERS_BUILDS}/${id}`,
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["saveBuild", "deleteBuild"],
    }),
    getBuildsById: builder.query({
      query: ({ id, token }) => ({
        url: `${config.PC_BUILDER.GET_BUILD_BY_ID}/${id}`,
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }),
      providesTags: [],
    }),
    deleteBuild: builder.mutation({
      query: ({ data, token, buildId }) => ({
        url: `${config.PC_BUILDER.DELETE_BUILD}/${buildId}`,
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: ["deleteBuild"],
    }),
  }),
});

export const {
  useUploadBuildMutation,
  useGetUserBuildsQuery,
  useGetBuildsByIdQuery,
  useDeleteBuildMutation,
} = pcBuildApis;
