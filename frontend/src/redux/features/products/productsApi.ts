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
        return `${config.PRODUCTS.GET_PRODUCTS_BY_CATEGORY}?category=${
          data.category
        }&${queryParameters.toString()}`;
      },
      providesTags: [],
    }),
  }),
});

export const { useGetAllProductsQuery, useGetProductsByCategoryQuery } =
  productsApi;
