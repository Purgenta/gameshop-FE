import { GAME } from "@/requests/APIENDPOINTS";
import axios from "@/requests/axios/axios";
import useSWR from "swr";
import { Game } from "@/types/game";
type FeaturedGamesResponse = {
  id: number;
  game: Game;
  banner: string;
};
const useFeaturedGames = () => {
  const getFeaturedGames = async () => {
    return (await axios.get(GAME.featuredGames))
      .data as FeaturedGamesResponse[];
  };
  const { data } = useSWR(
    () => GAME.featuredGames,
    () => getFeaturedGames(),
    {
      revalidateOnFocus: false,
      revalidateOn: false,
      revalidateOnReconnect: false,
      revalidateIfStale: true,
    }
  );
  return { data };
};
export default useFeaturedGames;
