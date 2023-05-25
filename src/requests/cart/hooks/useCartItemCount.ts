import useAuthenticatedAxios from "@/hooks/useAuthenticatedAxios";
import { useCallback } from "react";
import { CART } from "@/requests/APIENDPOINTS";
const useCartItemCount = () => {
  const axios = useAuthenticatedAxios();
  const getCartItemCount = useCallback(async () => {
    return (await axios.get(CART.itemCount)).data as { count: number };
  }, [axios]);
  return getCartItemCount;
};
export default useCartItemCount;
