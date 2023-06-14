import useAuthenticatedAxios from "@/hooks/useAuthenticatedAxios";
import { OrderReview } from "@/types/order";
import { ORDER } from "@/requests/APIENDPOINTS";
const useAddOrderReview = () => {
  const axios = useAuthenticatedAxios();
  const addReview = async (orderReview: OrderReview, orderId: number) => {
    try {
      const response = await axios.post(ORDER.addReview(orderId), {
        ...orderReview,
      });
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  };
  return addReview;
};
export default useAddOrderReview;
