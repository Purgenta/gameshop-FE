"use client";
import useAuthenticatedAxios from "@/hooks/useAuthenticatedAxios";
import useSWR from "swr";
import { CART } from "../../APIENDPOINTS";
import { CartItem } from "@/types/cart";
export type CartItemResponse = {
  game: CartItem;
  quantity: number;
};
const useFetchCartItems = () => {
  const axios = useAuthenticatedAxios();
  const cartItems = async () => {
    return (await axios.get(CART.cartItems)).data as CartItemResponse[];
  };
  return cartItems;
};
const useGetCartItems = () => {
  const fetcher = useFetchCartItems();
  const { data, error, isLoading, mutate } = useSWR(
    () => CART.cartItems,
    () => fetcher(),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  return { data, error, isLoading, mutate };
};
export default useGetCartItems;
