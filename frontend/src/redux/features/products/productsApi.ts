import { config } from "@/config/apiConfig";
import { api } from "../../apis/apiSlice";
import { IProductsByCategoryFilter } from "@/types/productTypes/productsTypes";

const productsApi = api.injectEndpoints({
  endpoints: builder => ({
    getAllProducts: builder.query({
      query: () => ({
        url: `${config.PRODUCTS.GET_ALL_PRODUCT}`,
      }),
      providesTags: [],
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
        if (data.limit) {
          queryParameters.append("limit", data.limit);
        }
        if (data.minPrice) {
          queryParameters.append("minPrice", data.minPrice);
        }
        if (data.maxPrice) {
          queryParameters.append("maxPrice", data.maxPrice);
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
      providesTags: [],
    }),
    getTopSellingProducts: builder.query({
      query: () => ({
        url: `${config.PRODUCTS.GET_TOP_SELLING_PRODUCTS}`,
      }),
      providesTags: [],
    }),
    getProductsByIDL: builder.query({
      query: ({ id }) => ({
        url: `${config.PRODUCTS.GET_PRODUCTS_BY_ID}/${id}`,
      }),
      providesTags: [],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductsByCategoryQuery,
  useGetTopSellingProductsQuery,
  useGetProductsByIDLQuery,
} = productsApi;
