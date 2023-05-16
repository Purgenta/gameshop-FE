"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
export type Role = "USER" | "ADMIN";
export type AuthState = {
  isAuth: boolean;
  accessToken: string;
  role: Role | null;
};
const initialState: AuthState = {
  isAuth: false,
  accessToken: "",
  role: null,
};
const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    updateAuthState: {
      reducer: (state, action: PayloadAction<AuthState>) => {
        state = action.payload;
      },
      prepare(payload: { accessToken: string; isAuth: boolean; role: Role }) {
        return { payload };
      },
    },
  },
});
export const { updateAuthState } = authSlice.actions;
export const authSelector = (root: RootState) => root.authentication;
export default authSlice.reducer;
