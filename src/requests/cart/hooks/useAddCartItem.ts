import useAuthenticatedAxios from "@/hooks/useAuthenticatedAxios";
import { CART } from "@/requests/APIENDPOINTS";
import { CartItemCount } from "../cartRequests";
import { useDispatch } from "react-redux";
import { addNotification } from "@/redux/notificationSlice/notificationSlice";
import { setCount } from "@/redux/cartSlice/cartSlice";
const useAddCartItem = (game_id: number) => {
  const dispatch = useDispatch();
  const axios = useAuthenticatedAxios();
  const addCartItem = async () => {
    try {
      const response = (
        await axios.post(CART.addCartItem, {
          game_id: game_id,
        })
      ).data as CartItemCount;
      dispatch(setCount(response.count));
      dispatch(
        addNotification({
          message: "Added cart item successfully",
          notificationType: "SUCCESS",
        })
      );
      dispatch;
    } catch (exception) {
      dispatch(
        addNotification({
          message: "Issue adding cart item",
          notificationType: "ERROR",
        })
      );
    }
  };
  return addCartItem;
};
export default useAddCartItem;
