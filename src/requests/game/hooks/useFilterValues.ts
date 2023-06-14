import { filterValues } from "../gameRequests";
import useSWR from "swr";
import { GAMEENDPOINTS } from "@/requests/APIENDPOINTS";
const useFilterValues = () => {
  const { data, error, isLoading } = useSWR(
    () => GAMEENDPOINTS.filter,
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
