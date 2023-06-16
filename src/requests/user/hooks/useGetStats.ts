import { USER } from "@/requests/APIENDPOINTS";
import axios from "@/requests/axios/axios";
import useSWR from "swr";
type Stats = {
  gameCount: number;
  userCount: number;
  orderCount: number;
};
const useGetStats = () => {
  const getStats = async () => {
    return (await axios.get(USER.stats)).data as Stats;
  };
  const { data } = useSWR(
    () => USER.stats,
    () => getStats(),
    {
      revalidateOnFocus: false,
      revalidateOn: false,
      revalidateOnReconnect: false,
      revalidateIfStale: true,
    }
  );
  return { data };
};
export default useGetStats;
