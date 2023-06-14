import useSwr from "swr";
import axios from "@/requests/axios/axios";
import { GAMEENDPOINTS } from "@/requests/APIENDPOINTS";
import { Game } from "@/types/game";
const useGetGame = (game_id: number) => {
  const getGame = async () => {
    return (await axios.get(GAMEENDPOINTS.getGameById(game_id))).data as Game;
  };
  const { data, error, isLoading } = useSwr(
    () => GAMEENDPOINTS.getGameById(game_id),
    () => getGame(),
    {
      revalidateOnFocus: false,
      revalidateOn: false,
      revalidateOnReconnect: false,
      revalidateIfStale: true,
    }
  );
  return { data, error, isLoading };
};
export default useGetGame;
