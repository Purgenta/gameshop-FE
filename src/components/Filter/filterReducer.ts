import { useReducer } from "react";
export type FilterValues = {
  fromPrice: number;
  toPrice: number;
  fromYear: number;
  toYear: number;
  categories: number[];
  publishers: number[];
  search: string;
  sort: {
    orderBy: string;
    sortDir: string;
  };
};
const initialState: FilterValues = {
  fromPrice: 1,
  toPrice: 100000,
  fromYear: 1950,
  toYear: new Date().getFullYear(),
  categories: [],
  publishers: [],
  search: "",
  sort: {
    orderBy: "price",
    sortDir: "desc",
  },
};
type ACTIONTYPE =
  | {
      type: "setPrice";
      payload: {
        fromPrice: number;
        toPrice: number;
      };
    }
  | { type: "setCategories"; payload: number[] }
  | { type: "setYear"; payload: { fromYear: number; toYear: number } }
  | { type: "setPublishers"; payload: number[] }
  | { type: "setSearch"; payload: string }
  | { type: "setSort"; payload: string }
  | { type: "setOrderBy"; payload: string };
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
    case "setPublishers": {
      const newState = { ...state };
      if (action.payload.length) {
        newState.publishers = action.payload;
      } else newState.publishers = [];
      return newState;
    }
    case "setYear": {
      return { ...state, ...action.payload };
    }
    case "setSearch": {
      return { ...state, search: action.payload };
    }
    case "setOrderBy": {
      const sortDir = state.sort.sortDir;
      return { ...state, sort: { sortDir, orderBy: action.payload } };
    }
    case "setSort": {
      const orderBy = state.sort.orderBy;
      return { ...state, sort: { sortDir: action.payload, orderBy } };
    }
    default:
      throw new Error();
  }
}
const useFilterReducer = () => {
  return useReducer(reducer, initialState);
};
export default useFilterReducer;
