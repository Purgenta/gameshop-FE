import axios from "@/requests/axios/axios";
import { Role } from "@/types/role";
import { AUTHENDPOINTS } from "@/requests/APIENDPOINTS";
import { useSession } from "next-auth/react";
type AuthResponse = {
  accessToken: string;
  role: Role;
  email: string;
};
const useRefreshToken = () => {
  const { data: session, update } = useSession();
  const getAccessToken = async () => {
    const response = await axios.get(AUTHENDPOINTS.refreshToken, {
      headers: { Authorization: `Bearer ${session?.user.refreshToken}` },
    });
    const { accessToken, role, email } = response.data as AuthResponse;
    if (session) {
      await update({
        ...session,
        user: {
          ...session.user,
          accessToken,
          email,
          role,
        },
      });
    }
    return accessToken;
  };
  return getAccessToken;
};
export default useRefreshToken;
