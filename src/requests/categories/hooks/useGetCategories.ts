import { CATEGORIES } from "@/requests/APIENDPOINTS";
import useSWR from "swr";
import axios from "@/requests/axios/axios";
import { Category } from "@/types/game";
const getCategories = async () => {
  return (await axios.get(CATEGORIES.getCategories)).data as Category[];
};
const useGetCategories = () => {
  const { data, error } = useSWR(
    () => CATEGORIES.getCategories,
    () => getCategories(),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  return { data, error };
};
export default useGetCategories;
