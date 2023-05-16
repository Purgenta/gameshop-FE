import { Category } from "@/types/game";
import { GAMEENDPOINTS } from "../APIENDPOINTS";
import axios from "../axios/axios";
type FilterValues = {
  filter: {
    minPrice: number;
    maxPrice: number;
  };
  categories: Category[];
};
export const filterValues = async () => {
  try {
    const response = (await axios.get(GAMEENDPOINTS.filter)) as FilterValues;
    return response;
  } catch (error: any) {
    Promise.resolve(error);
  }
};
