import { configureStore } from "@reduxjs/toolkit";
import { api } from "./apis/apiSlice";
import cartReducer from "./slice/cartSlice";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    cart: cartReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
