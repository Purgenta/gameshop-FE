import useAuthenticatedAxios from "@/hooks/useAuthenticatedAxios";
import { ORDER } from "@/requests/APIENDPOINTS";
const useDeleteOrderReview = () => {
  const axios = useAuthenticatedAxios();
  const deleteReview = async (orderId: number) => {
    return await axios.delete(ORDER.deleteReview(orderId));
  };
  return deleteReview;
};
export default useDeleteOrderReview;
