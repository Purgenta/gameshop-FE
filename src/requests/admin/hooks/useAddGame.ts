import useAuthenticatedAxios from "@/hooks/useAuthenticatedAxios";
import { addNotification } from "@/redux/notificationSlice/notificationSlice";
import { ADMIN } from "@/requests/APIENDPOINTS";
import { useDispatch } from "react-redux";

const useAddGame = () => {
  const axios = useAuthenticatedAxios();
  const dispatch = useDispatch();
  const addGame = async (data: any) => {
    try {
      await axios.post(ADMIN.addGame, data);
      dispatch(
        addNotification({
          message: "Successfully added game",
          notificationType: "SUCCESS",
        })
      );
    } catch (error) {
      dispatch(
        addNotification({
          message: "Error while trying to add a new game",
          notificationType: "ERROR",
        })
      );
    }
  };
  return addGame;
};
export default useAddGame;
