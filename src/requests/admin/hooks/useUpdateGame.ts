import useAuthenticatedAxios from "@/hooks/useAuthenticatedAxios";
import { addNotification } from "@/redux/notificationSlice/notificationSlice";
import { ADMIN } from "@/requests/APIENDPOINTS";
import { useDispatch } from "react-redux";

const useUpdateGame = () => {
  const axios = useAuthenticatedAxios();
  const dispatch = useDispatch();
  const addGame = async (data: any, game_id: number) => {
    try {
      await axios.put(ADMIN.updateGame(game_id), data);
      dispatch(
        addNotification({
          message: "Successfully updated the game",
          notificationType: "SUCCESS",
        })
      );
    } catch (error) {
      dispatch(
        addNotification({
          message: "Error while trying to update",
          notificationType: "ERROR",
        })
      );
    }
  };
  return addGame;
};
export default useUpdateGame;
