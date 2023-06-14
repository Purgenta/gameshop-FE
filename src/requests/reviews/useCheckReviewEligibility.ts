import useAuthenticatedAxios from "@/hooks/useAuthenticatedAxios";
import useSWR from "swr";
import { REVIEWS } from "../APIENDPOINTS";
import { useSession } from "next-auth/react";
import { useCallback } from "react";
type ReviewEligibilityResponse = {
  canReview: boolean;
};
const useCheckReviewEligibility = (game_id: number) => {
  const { data: session } = useSession();
  const axios = useAuthenticatedAxios();
  const key = REVIEWS.getReviewEligibility(game_id);
  const getReviewEligibility = useCallback(async () => {
    if (!session?.user.accessToken) {
      const response: ReviewEligibilityResponse = { canReview: false };
      return Promise.resolve(response);
    }
    const response = await axios.get(key);
    return response.data as ReviewEligibilityResponse;
  }, [session, axios, game_id]);
  const { data, mutate } = useSWR(
    () => key,
    () => getReviewEligibility(),
    {
      revalidateOnFocus: false,
      revalidateOn: false,
      revalidateOnReconnect: false,
      revalidateIfStale: true,
    }
  );
  return { data, mutate };
};
export default useCheckReviewEligibility;
