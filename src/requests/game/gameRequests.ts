import { Category, Game, Publisher } from "@/types/game";
import { GAMEENDPOINTS } from "../APIENDPOINTS";
import axios from "../axios/axios";
interface QueryOptions {
  page: number;
}
export interface GameFilter extends QueryOptions {
  fromPrice?: number;
  toPrice?: number;
  fromYear?: number;
  toYear?: number;
}
type FilterValues = {
  filter: {
    minPrice: number;
    maxPrice: number;
    minYear: number;
    maxYear: number;
  };
  publishers: Publisher[];
  categories: Category[];
};
export const filterValues = async () => {
  const response = (await axios.get(GAMEENDPOINTS.filter)).data as FilterValues;
  return response;
};
export const getFilteredGames = async (filterOptions: GameFilter) => {
  const response = (
    await axios.post(GAMEENDPOINTS.filteredGames, {
      ...filterOptions,
    })
  ).data;
  return response as {
    games: Game[];
    pagination: {
      totalElements: number;
      perPage: number;
      totalPages: number;
    };
  };
};
