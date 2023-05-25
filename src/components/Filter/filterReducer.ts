import { useReducer } from "react";
export type FilterValues = {
  fromPrice: number;
  toPrice: number;
  fromYear: number;
  toYear: number;
  categories: string[];
};
const initialState: FilterValues = {
  fromPrice: 1,
  toPrice: 100000,
  fromYear: 1950,
  toYear: new Date().getFullYear(),
  categories: [],
};
type ACTIONTYPE =
  | {
      type: "setPrice";
      payload: {
        fromPrice: number;
        toPrice: number;
      };
    }
  | { type: "setCategories"; payload: string[] }
  | { type: "setYear"; payload: { fromYear: number; toYear: number } };
function reducer(
  state: typeof initialState,
  action: ACTIONTYPE
): typeof initialState {
  switch (action.type) {
    case "setPrice": {
      return { ...state, ...action.payload };
    }
    case "setCategories": {
      const newState = { ...state };
      if (action.payload.length) {
        newState.categories = action.payload;
      } else newState.categories = [];
      return newState;
    }
    case "setYear": {
      return { ...state, ...action.payload };
    }
    default:
      throw new Error();
  }
}
const useFilterReducer = () => {
  return useReducer(reducer, initialState);
};
export default useFilterReducer;
