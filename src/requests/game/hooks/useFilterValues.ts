import { filterValues } from "../gameRequests";
import useSWR from "swr";
import { GAME } from "@/requests/APIENDPOINTS";
const useFilterValues = () => {
  const { data, error, isLoading } = useSWR(
    () => GAME.filter,
    () => {
      return filterValues();
    },
    {
      revalidateOnFocus: false,
      revalidateOn: false,
      revalidateOnReconnect: false,
    }
  );
  return { data, error, isLoading };
};
export default useFilterValues;
