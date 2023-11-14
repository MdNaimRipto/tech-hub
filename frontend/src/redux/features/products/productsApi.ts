import { config } from "@/config/apiConfig";
import { api } from "../../apis/apiSlice";
import { IProductsByCategoryFilter } from "@/types/productTypes/productsTypes";

const productsApi = api.injectEndpoints({
  endpoints: builder => ({
    uploadProduct: builder.mutation({
      query: ({ data, token }) => ({
        url: config.PRODUCTS.UPLOAD_PRODUCT,
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: ["uploadProduct"],
    }),
    getAllProducts: builder.query({
      query: (option: { page: string }) => ({
        url: `${config.PRODUCTS.GET_ALL_PRODUCT}?page=${option.page}&limit=8`,
      }),
      providesTags: ["uploadProduct", "updateProduct"],
    }),
    getProductsByCategory: builder.query({
      query: (data: IProductsByCategoryFilter) => {
        const queryParameters = new URLSearchParams();
        if (data.category) {
          queryParameters.append("category", data.category);
        }
        if (data.searchTerm) {
          queryParameters.append("searchTerm", data.searchTerm);
        }
        if (data.sortBy) {
          queryParameters.append("sortBy", data.sortBy);
        }
        if (data.sortOrder) {
          queryParameters.append("sortOrder", data.sortOrder);
        }
        if (data.page) {
          queryParameters.append("page", data.page);
        }
        if (data.limit) {
          queryParameters.append("limit", data.limit);
        }
        if (data.status) {
          queryParameters.append("status", data.status);
        }
        if (data.brand) {
          queryParameters.append("brand", data.brand);
        }
        return `${
          config.PRODUCTS.GET_PRODUCTS_BY_CATEGORY
        }?${queryParameters.toString()}`;
      },
      providesTags: ["uploadProduct", "updateProduct"],
    }),
    getTopSellingProducts: builder.query({
      query: () => ({
        url: `${config.PRODUCTS.GET_TOP_SELLING_PRODUCTS}`,
      }),
      providesTags: [],
    }),
    getProductsByID: builder.query({
      query: ({ id }) => ({
        url: `${config.PRODUCTS.GET_PRODUCTS_BY_ID}/${id}`,
      }),
      providesTags: ["uploadProduct", "updateProduct"],
    }),
    editProduct: builder.mutation({
      query: ({ data, token, id }) => ({
        url: `${config.PRODUCTS.UPDATE_PRODUCT}/${id}`,
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: ["updateProduct"],
    }),
  }),
});

export const {
  useUploadProductMutation,
  useGetAllProductsQuery,
  useGetProductsByCategoryQuery,
  useGetTopSellingProductsQuery,
  useGetProductsByIDQuery,
  useEditProductMutation,
} = productsApi;
