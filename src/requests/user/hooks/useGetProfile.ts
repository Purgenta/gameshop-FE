import useSWR from "swr";
import useAuthenticatedAxios from "@/hooks/useAuthenticatedAxios";
import { USER } from "../../APIENDPOINTS";
import { Order } from "@/types/order";
type ProfileResponse = {
  role: string;
  email: string;
  registered_at: Date;
  orders: Order[];
};
const useGetProfile = () => {
  const axios = useAuthenticatedAxios();
  const getProfile = async () => {
    return (await axios.get(USER.profile)).data as ProfileResponse;
  };
  const { data, mutate } = useSWR(
    () => USER.profile,
    () => getProfile(),
    {
      revalidateOnFocus: false,
      revalidateOn: false,
      revalidateOnReconnect: false,
      revalidateIfStale: true,
      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        if (error.status === 404) return;
        setTimeout(() => revalidate({ retryCount }), 400);
      },
    }
  );
  return { data, mutate };
};
export default useGetProfile;
