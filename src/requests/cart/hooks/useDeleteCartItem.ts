import useAuthenticatedAxios from "@/hooks/useAuthenticatedAxios";
import { CART } from "@/requests/APIENDPOINTS";
import { useDispatch } from "react-redux";
import { addNotification } from "@/redux/notificationSlice/notificationSlice";
const useDeleteCartItem = () => {
  const axios = useAuthenticatedAxios();
  const dispatch = useDispatch();
  const deleteItem = async (game_id: number) => {
    await axios.delete(CART.deleteCartItem, {
      data: {
        game_id,
      },
    });
    dispatch(
      addNotification({
        message: "Successfully deleted an item",
        notificationType: "SUCCESS",
      })
    );
  };
  return deleteItem;
};
export default useDeleteCartItem;
