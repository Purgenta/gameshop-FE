import axios from "@/requests/axios/axios";
import { Role } from "@/types/role";
import { AUTHENDPOINTS } from "@/requests/APIENDPOINTS";
import { useSession } from "next-auth/react";
type AuthResponse = {
  accessToken: string;
  role: Role;
};
const useRefreshToken = () => {
  const { data: session } = useSession();
  const getAccessToken = async () => {
    const response = await axios.get(AUTHENDPOINTS.refreshToken);
    const { accessToken, role } = response.data as AuthResponse;
    if (session) {
      session.user.accessToken = accessToken;
      session.user.role = role;
    }
    return accessToken;
  };
  return getAccessToken;
};
export default useRefreshToken;
