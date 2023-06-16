import useSwr from "swr";
import axios from "@/requests/axios/axios";
import { GAME } from "@/requests/APIENDPOINTS";
import { Game } from "@/types/game";
const useGetGame = (game_id: number) => {
  const getGame = async () => {
    return (await axios.get(GAME.getGameById(game_id))).data as Game;
  };
  const { data, error, isLoading } = useSwr(
    () => GAME.getGameById(game_id),
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
