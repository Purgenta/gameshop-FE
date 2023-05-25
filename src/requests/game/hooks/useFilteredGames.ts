import { GameFilter } from "../gameRequests";
import useSWR from "swr";
import { GAMEENDPOINTS } from "@/requests/APIENDPOINTS";
import { getFilteredGames } from "../gameRequests";
const useFilteredGames = (filter: GameFilter) => {
  const { data, error, isLoading } = useSWR(
    () => [GAMEENDPOINTS.filteredGames, filter],
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
