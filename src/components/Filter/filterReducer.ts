import { useReducer } from "react";
export type FilterValues = {
  fromPrice: number;
  toPrice: number;
  fromYear: number;
  toYear: number;
  categories: string[];
  sort: string[];
};
const initialState: FilterValues = {
  fromPrice: 1,
  toPrice: 100000,
  fromYear: 1950,
  toYear: new Date().getFullYear(),
  categories: [],
  sort: ["price", "desc"],
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
type OptionalInit = {
  fromPrice?: number;
  toPrice?: number;
  fromYear?: number;
  toYear?: number;
  categories?: string[];
  sort?: string[];
};
const useFilterReducer = (initState: OptionalInit | undefined) => {
  let state = initialState;
  if (initState) {
    const { categories, fromPrice, toPrice, fromYear, sort, toYear } =
      initState;
    state = {
      categories: categories || initialState.categories,
      fromPrice: fromPrice || initialState.fromPrice,
      toPrice: toPrice || initialState.toPrice,
      fromYear: fromYear || initialState.fromYear,
      sort: sort || initialState.sort,
      toYear: toYear || initialState.toYear,
    };
  }
  return useReducer(reducer, state);
};
export default useFilterReducer;
