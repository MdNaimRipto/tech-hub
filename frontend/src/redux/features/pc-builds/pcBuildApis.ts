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
      invalidatesTags: [],
    }),
  }),
});

export const { useUploadBuildMutation } = pcBuildApis;
