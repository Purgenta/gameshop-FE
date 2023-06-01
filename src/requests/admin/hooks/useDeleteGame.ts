import useAuthenticatedAxios from "@/hooks/useAuthenticatedAxios";
import { useDispatch } from "react-redux";
import { addNotification } from "@/redux/notificationSlice/notificationSlice";
import { ADMIN } from "@/requests/APIENDPOINTS";
const useDeleteGame = () => {
  const axios = useAuthenticatedAxios();
  const dispatch = useDispatch();
  const deleteGame = async (game_id: number) => {
    try {
      await axios.delete(ADMIN.deleteGame(game_id));
      dispatch(
        addNotification({
          message: "Deleted the game",
          notificationType: "SUCCESS",
        })
      );
    } catch (error) {
      dispatch(
        addNotification({
          message: "Error while trying to delete an item",
          notificationType: "ERROR",
        })
      );
    }
  };
  return deleteGame;
};

export default useDeleteGame;
