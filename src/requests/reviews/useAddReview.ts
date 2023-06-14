import { ReviewFormValues } from "@/components/Forms/ReviewForm/ReviewForm";
import { useDispatch } from "react-redux";
import { REVIEWS } from "../APIENDPOINTS";
import useAuthenticatedAxios from "@/hooks/useAuthenticatedAxios";
import { addNotification } from "@/redux/notificationSlice/notificationSlice";
import { UserReview } from "@/types/review";
const useAddReview = (game_id: number) => {
  const axios = useAuthenticatedAxios();
  const dispatch = useDispatch();
  const sendReview = async (
    formValues: ReviewFormValues,
    onSuccess: () => unknown,
    onError: () => unknown
  ) => {
    try {
      const response = (
        await axios.post(REVIEWS.addReview, {
          game_id,
          rating: formValues.rating,
          review: formValues.comment,
        })
      ).data as UserReview;
      onSuccess();
      dispatch(
        addNotification({
          message: "Review successfully added",
          notificationType: "SUCCESS",
        })
      );
      return response;
    } catch (error) {
      dispatch(
        addNotification({
          message: "Error while trying to add a review",
          notificationType: "ERROR",
        })
      );
      onError();
    }
  };
  return sendReview;
};
export default useAddReview;
