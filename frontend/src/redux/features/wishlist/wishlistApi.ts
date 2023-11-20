import { config } from "@/config/apiConfig";
import { api } from "../../apis/apiSlice";

const wishlistApi = api.injectEndpoints({
  endpoints: builder => ({
    addToWishlist: builder.mutation({
      query: ({ data, token }) => ({
        url: config.WISHLIST.ADD_TO_WISHLIST,
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: ["addToWishlist"],
    }),
    getWishlistsProduct: builder.query({
      query: (option: { userId: string; token: string }) => ({
        url: `${config.WISHLIST.GET_WISHLISTS_PRODUCT}/${option.userId}`,
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${option.token}`,
        },
      }),
      providesTags: ["addToWishlist", "deleteWishlist"],
    }),
    deleteFromWishlist: builder.mutation({
      query: ({ data, token }) => ({
        url: config.WISHLIST.DELETE_WISHLIST_PRODUCT,
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: ["deleteWishlist"],
    }),
  }),
});

export const {
  useAddToWishlistMutation,
  useGetWishlistsProductQuery,
  useDeleteFromWishlistMutation,
} = wishlistApi;
