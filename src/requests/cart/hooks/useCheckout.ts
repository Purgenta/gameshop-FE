import useAuthenticatedAxios from "@/hooks/useAuthenticatedAxios";
import { CART } from "@/requests/APIENDPOINTS";
import { useDispatch } from "react-redux";
import { addNotification } from "@/redux/notificationSlice/notificationSlice";
import { setCount } from "@/redux/cartSlice/cartSlice";
const useCheckout = () => {
  const axios = useAuthenticatedAxios();
  const dispatch = useDispatch();
  const sendCheckoutRequest = async () => {
    try {
      await axios.post(CART.checkout);
      dispatch(
        addNotification({
          message: "Order received",
          notificationType: "SUCCESS",
        })
      );
      dispatch(setCount(0));
    } catch (error) {
      Promise.resolve(error);
    }
  };
  return sendCheckoutRequest;
};
export default useCheckout;
