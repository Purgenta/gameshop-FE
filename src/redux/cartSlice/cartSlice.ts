import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
const initialState = {
  itemCount: 0,
};
const cartSlice = createSlice({
  initialState,
  name: "cart",
  reducers: {
    setCount: {
      reducer: (state, action: PayloadAction<{ itemCount: number }>) => {
        state.itemCount = action.payload.itemCount;
        return state;
      },
      prepare: (count: number) => {
        return { payload: { itemCount: count } };
      },
    },
  },
});
export const cartSelector = (root: RootState) => root.cart;
export const { setCount } = cartSlice.actions;
export default cartSlice.reducer;
