import useAuthenticatedAxios from "@/hooks/useAuthenticatedAxios";
import { useDispatch } from "react-redux";
import { addNotification } from "@/redux/notificationSlice/notificationSlice";
import { CART } from "@/requests/APIENDPOINTS";
const useSetCartItem = () => {
  const axios = useAuthenticatedAxios();
  const dispatch = useDispatch();
  const setCartItems = async (game_id: number, quantity: number) => {
    await axios.post(CART.setCartItem, { game_id, quantity });
    dispatch(
      addNotification({
        message: "Successfully updated quantity",
        notificationType: "SUCCESS",
      })
    );
  };
  return setCartItems;
};
export default useSetCartItem;
