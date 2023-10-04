import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { config } from "../../config/config";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5835/api/v1.0",
  }),
  tagTypes: [],
  endpoints: () => ({}),
});
