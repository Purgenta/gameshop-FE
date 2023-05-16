"use client";
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice/authSlice";
import notificationSlice from "./notificationSlice/notificationSlice";
const store = configureStore({
  reducer: {
    authentication: authSlice,
    notifications: notificationSlice,
  },
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
