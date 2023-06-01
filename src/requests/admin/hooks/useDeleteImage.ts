import useAuthenticatedAxios from "@/hooks/useAuthenticatedAxios";
import { ADMIN } from "@/requests/APIENDPOINTS";
import { useDispatch } from "react-redux";
import { addNotification } from "@/redux/notificationSlice/notificationSlice";
const useDeleteImage = () => {
  const axios = useAuthenticatedAxios();
  const dispatch = useDispatch();
  const deleteImage = async (image_id: number) => {
    try {
      await axios.delete(ADMIN.deleteImage(image_id));
      dispatch(
        addNotification({
          message: "Deleted a game image",
          notificationType: "SUCCESS",
        })
      );
    } catch (error) {
      dispatch(
        addNotification({
          message: "Error while trying to delete an image",
          notificationType: "ERROR",
        })
      );
    }
  };
  return deleteImage;
};
export default useDeleteImage;
