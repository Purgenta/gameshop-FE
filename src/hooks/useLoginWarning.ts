import { useDispatch } from "react-redux";
import { addNotification } from "@/redux/notificationSlice/notificationSlice";
import { useSession } from "next-auth/react";
const useLoginWarning = () => {
  const session = useSession();
  const dispatch = useDispatch();
  const warning = () => {
    if (session.data?.user.accessToken) return;
    dispatch(
      addNotification({
        message: "You have to login first",
        notificationType: "ERROR",
      })
    );
  };
  return warning;
};
export default useLoginWarning;
