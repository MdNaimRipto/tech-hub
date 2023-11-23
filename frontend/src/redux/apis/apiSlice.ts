import { config } from "@/config/apiConfig";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: config.SERVER_BASE_URL,
  }),
  tagTypes: [
    "getAuthenticatedUser",
    "updateUser",
    "uploadProduct",
    "updateProduct",
    "addReviewAndRating",
    "saveBuild",
    "deleteBuild",
    "addToWishlist",
    "deleteWishlist",
    "orderProducts",
    "updateOrder",
  ],
  endpoints: () => ({}),
});
