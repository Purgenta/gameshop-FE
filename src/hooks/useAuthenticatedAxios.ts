import { useEffect } from "react";
import { authenticatedAxios } from "@/requests/axios/axios";
import useRefreshToken from "./useRefreshToken";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { addNotification } from "@/redux/notificationSlice/notificationSlice";
import { nanoid } from "@reduxjs/toolkit";
const useAuthenticatedAxios = () => {
  const refreshToken = useRefreshToken();
  const { data: authentication } = useSession();
  const dispatch = useDispatch();
  const navigate = useRouter();
  useEffect(() => {
    const requestInterceptor = authenticatedAxios.interceptors.request.use(
      (config) => {
        if (!config?.headers["Authorization"]) {
          config.headers[
            "Authorization"
          ] = `Bearer ${authentication?.user.accessToken}`;
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
            if (authentication) {
              authentication.user.accessToken = "";
              authentication.user.role = "";
            }
            dispatch(
              addNotification({
                id: nanoid(5),
                message: "Your session has expired",
                notificationType: "ERROR",
              })
            );
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
  }, [authentication, refreshToken, navigate, dispatch]);
  return authenticatedAxios;
};
export default useAuthenticatedAxios;
