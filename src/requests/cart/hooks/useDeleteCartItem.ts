import useAuthenticatedAxios from "@/hooks/useAuthenticatedAxios";
import { CART } from "@/requests/APIENDPOINTS";
import { useDispatch } from "react-redux";
import { addNotification } from "@/redux/notificationSlice/notificationSlice";
import { useSelector } from "react-redux";
import { cartSelector, setCount } from "@/redux/cartSlice/cartSlice";
const useDeleteCartItem = () => {
  const { itemCount } = useSelector(cartSelector);
  const axios = useAuthenticatedAxios();
  const dispatch = useDispatch();
  const deleteItem = async (game_id: number) => {
    await axios.delete(`${CART.deleteCartItem}/${game_id}`);
    dispatch(
      addNotification({
        message: "Successfully deleted an item",
        notificationType: "SUCCESS",
      })
    );
    dispatch(setCount(itemCount - 1));
  };
  return deleteItem;
};
export default useDeleteCartItem;
