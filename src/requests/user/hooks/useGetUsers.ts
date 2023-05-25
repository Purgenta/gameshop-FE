import useAuthenticetedAxios from "@/hooks/useAuthenticatedAxios";
import { User } from "@/types/user";
import { USERS } from "../../APIENDPOINTS";
const useGetUsers = () => {
  const axios = useAuthenticetedAxios();
  const getAllUsers = async () => {
    try {
      return (await axios.get(USERS.getAllUsers)).data as User;
    } catch (error) {
      Promise.resolve(error);
    }
  };
};
export default useGetUsers;
