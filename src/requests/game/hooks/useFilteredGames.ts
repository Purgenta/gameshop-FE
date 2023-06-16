import { GameFilter } from "../gameRequests";
import useSWR from "swr";
import { GAME } from "@/requests/APIENDPOINTS";
import { getFilteredGames } from "../gameRequests";
const useFilteredGames = (filter: any) => {
  const { data, error, isLoading } = useSWR(
    () => [GAME.filteredGames, filter],
    () => {
      return getFilteredGames(filter);
    },
    {
      revalidateOnFocus: false,
      revalidateOn: false,
      revalidateOnReconnect: false,
      revalidateIfStale: true,
    }
  );
  return { data, error, isLoading };
};
export default useFilteredGames;
