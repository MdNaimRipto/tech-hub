import { IRootCartState } from "@/types/cartTypes/cartTypes";
import { createSlice } from "@reduxjs/toolkit";

const getLocalStorageCart = () => {
  if (typeof window !== "undefined" && window.localStorage) {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : { list: [], total: 0 };
  } else {
    // Fallback for environments where localStorage is not available
    return { list: [], total: 0 };
  }
};

const saveLocalStorageCart = (cart: IRootCartState) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const cartSlice = createSlice({
  name: "cart",
  initialState: getLocalStorageCart(),
  reducers: {
    addToCart(state: IRootCartState, action) {
      const check = state.list.findIndex(
        data => data.product._id === action.payload.product._id
      );
      if (check !== -1) {
        state.list[check].quantity += action.payload.quantity;
      } else {
        state.list.push(action.payload);
      }

      state.total = state.list.reduce(
        (sum, data) => sum + +data?.product?.discountedPrice * data?.quantity,
        0
      );

      saveLocalStorageCart(state);
    },
    updateQuantity(state: IRootCartState, action) {
      const check = state.list.findIndex(
        data => data.product._id === action.payload.id
      );
      if (check !== -1) {
        state.list[check].quantity = Math.max(
          1,
          action.payload.productQuantity
        );
      }
      state.total = state.list.reduce(
        (sum, data) => sum + +data?.product?.discountedPrice * data?.quantity,
        0
      );

      saveLocalStorageCart(state);
    },
    removeItem(state: IRootCartState, action) {
      state.list = state.list.filter(
        data => data.product._id !== action.payload.id
      );
      state.total = state.list.reduce(
        (sum, data) => sum + +data?.product?.discountedPrice * data?.quantity,
        0
      );

      saveLocalStorageCart(state);
    },
  },
});

const { actions, reducer } = cartSlice;

export const { addToCart, updateQuantity, removeItem } = actions;

export default reducer;
