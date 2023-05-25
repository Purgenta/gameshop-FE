"use client";
import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice/cartSlice";
import notificationSlice from "./notificationSlice/notificationSlice";
const store = configureStore({
  reducer: {
    notifications: notificationSlice,
    cart: cartSlice,
  },
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
