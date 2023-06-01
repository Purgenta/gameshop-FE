import useSWR from "swr";
import { ADMIN } from "@/requests/APIENDPOINTS";
import axios from "@/requests/axios/axios";
import { Game } from "@/types/game";
type PageableResponse = {
  numberOfPages: number;
  games: Game[];
};
const useGetDashboardGames = (page: number) => {
  const getGames = async (page: number) => {
    return (await axios.get(`${ADMIN.dashBoardItems}/${page}`))
      .data as PageableResponse;
  };
  const { data, error, isLoading, mutate } = useSWR(
    () => `${ADMIN.dashBoardItems}/${page}`,
    () => getGames(page),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  return { data, error, isLoading, mutate };
};
export default useGetDashboardGames;
