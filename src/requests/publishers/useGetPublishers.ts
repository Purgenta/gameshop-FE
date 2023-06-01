import { PUBLISHERS } from "../APIENDPOINTS";
import { Publisher } from "@/types/game";
import useSWR from "swr";
import axios from "../axios/axios";
const getPublishers = async () => {
  return (await axios.get(PUBLISHERS.getPublishers)).data as Publisher[];
};
const useGetPublishers = () => {
  const { data, error, isLoading } = useSWR(
    () => PUBLISHERS.getPublishers,
    () => getPublishers(),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  return { data, error, isLoading };
};
export default useGetPublishers;
