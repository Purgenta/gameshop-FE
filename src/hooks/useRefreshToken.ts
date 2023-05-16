import axios from "@/requests/axios/axios";
import { updateAuthState } from "@/redux/authSlice/authSlice";
import { Role } from "@/redux/authSlice/authSlice";
import { AUTHENDPOINTS } from "@/requests/APIENDPOINTS";
type AuthResponse = {
  accessToken: string;
  role: Role;
};
const useRefreshToken = () => {
  const getAccessToken = async () => {
    const response = await axios.get(AUTHENDPOINTS.refreshToken);
    const { accessToken, role } = response.data as AuthResponse;
    updateAuthState({ accessToken, role, isAuth: true });
    return accessToken;
  };
  return getAccessToken;
};
export default useRefreshToken;
