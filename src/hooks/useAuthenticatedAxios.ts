import { useEffect } from "react";
import { authenticatedAxios } from "@/requests/axios/axios";
import { authSelector } from "@/redux/authSlice/authSlice";
import { useSelector } from "react-redux";
import useRefreshToken from "./useRefreshToken";
import { useRouter } from "next/router";
const useAuthenticetedAxios = () => {
  const authentication = useSelector(authSelector);
  const refreshToken = useRefreshToken();
  const navigate = useRouter();
  useEffect(() => {
    const requestInterceptor = authenticatedAxios.interceptors.request.use(
      (config) => {
        if (!config?.headers["Authorization"]) {
          config.headers[
            "Authorization"
          ] = `Bearer ${authentication.accessToken}`;
        }
        return config;
      },
      (error: any) => {
        Promise.reject(error);
      }
    );
    const responseInterceptor = authenticatedAxios.interceptors.response.use(
      (response) => response,
      async (error: any) => {
        const previousRequest = error?.config;
        if (error?.response?.status === 401 && !previousRequest.sent) {
          previousRequest.sent = true;
          try {
            const accessToken = await refreshToken();
            previousRequest.headers["Authorization"] = `Bearer ${accessToken}`;
            return authenticatedAxios(previousRequest);
          } catch (exception) {
            navigate.push("/login");
          }
        }
        return Promise.reject(error);
      }
    );
    return () => {
      authenticatedAxios.interceptors.response.eject(responseInterceptor);
      authenticatedAxios.interceptors.request.eject(requestInterceptor);
    };
  }, [authentication, refreshToken, navigate]);
  return authenticatedAxios;
};
export default useAuthenticetedAxios;
