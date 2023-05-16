import { useReducer } from "react";
export type FilterValues = {
  price: {
    minPrice: number;
    maxPrice: number;
  };
  year: {
    minYear: number;
    maxYear: number;
  };
  categories?: string[];
};
const initialState: FilterValues = {
  price: {
    minPrice: 1,
    maxPrice: 100000,
  },
  year: {
    minYear: 1950,
    maxYear: new Date().getFullYear(),
  },
};
type ACTIONTYPE =
  | {
      type: "setPrice";
      payload: {
        minPrice: number;
        maxPrice: number;
      };
    }
  | { type: "setCategories"; payload: string[] }
  | { type: "setYear"; payload: { minYear: number; maxYear: number } };
function reducer(
  state: typeof initialState,
  action: ACTIONTYPE
): typeof initialState {
  switch (action.type) {
    case "setPrice": {
      return { ...state, price: action.payload };
    }
    case "setCategories": {
      const newState = { ...state };
      if (action.payload.length) {
        newState.categories = action.payload;
      } else delete newState["categories"];
      return newState;
    }
    case "setYear": {
      return { ...state, year: action.payload };
    }
    default:
      throw new Error();
  }
}
const useFilterReducer = () => {
  return useReducer(reducer, initialState);
};
export default useFilterReducer;
