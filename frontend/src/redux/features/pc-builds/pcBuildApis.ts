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
      providesTags: ["saveBuild"],
    }),
  }),
});

export const { useUploadBuildMutation, useGetUserBuildsQuery } = pcBuildApis;
