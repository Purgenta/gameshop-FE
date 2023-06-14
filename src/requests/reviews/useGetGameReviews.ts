import useSWR from "swr";
import { REVIEWS } from "../APIENDPOINTS";
import axios from "../axios/axios";
import { UserReview } from "@/types/review";
type ReviewResponse = { reviews: UserReview[]; pageCount: number };
const useGetGameReviews = (page: number, game_id: number) => {
  const getReview = async () => {
    return (await axios.get(REVIEWS.getGameReviews(game_id, page)))
      .data as ReviewResponse;
  };
  const { data, mutate } = useSWR(
    () => REVIEWS.getGameReviews(game_id, page),
    () => getReview(),
    {
      revalidateOnFocus: false,
      revalidateOn: false,
      revalidateOnReconnect: false,
      revalidateIfStale: true,
    }
  );
  return { data, mutate };
};
export default useGetGameReviews;
