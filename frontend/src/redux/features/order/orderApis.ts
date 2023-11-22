import { config } from "@/config/apiConfig";
import { api } from "../../apis/apiSlice";

const orderApis = api.injectEndpoints({
  endpoints: builder => ({
    orderProducts: builder.mutation({
      query: ({ data, token }) => ({
        url: config.ORDER.ORDER_PRODUCTS,
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: ["orderProducts"],
    }),

    getOrdersByProgress: builder.query({
      query: ({ progress, token }) => ({
        url: `${config.ORDER.GET_ORDER_BY_PROGRESS}?progress=${progress}`,
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["orderProducts", "updateOrder"],
    }),

    getUserOrders: builder.query({
      query: ({ id, page, token }) => ({
        url: `${config.ORDER.GET_USER_ORDER}/${id}?page=${page}&limit=8`,
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["orderProducts", "updateOrder"],
    }),

    getOrderDetails: builder.query({
      query: ({ id, token }) => ({
        url: `${config.ORDER.GET_ORDER_DETAILS}/${id}`,
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }),
      providesTags: [],
    }),

    updateOrderStatus: builder.mutation({
      query: ({ data, token, id }) => ({
        url: `${config.ORDER.UPDATE_ORDER_STATUS}/${id}`,
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: ["updateOrder"],
    }),
  }),
});

export const {
  useOrderProductsMutation,
  useGetOrdersByProgressQuery,
  useGetUserOrdersQuery,
  useGetOrderDetailsQuery,
  useUpdateOrderStatusMutation,
} = orderApis;
