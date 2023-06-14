"use client";
import useGetCartItems, {
  CartItemResponse,
} from "@/requests/cart/hooks/useGetCartItems";
import React, { useEffect, useState } from "react";
import placeholder from "../../../public/jk-placeholder-image.jpg";
import { CartOrderSummary } from "@/components/Cart/CartOrderSummary";
import { CartItem } from "@/components/Cart/CartItem";
import { Spinner } from "@chakra-ui/react";
import {
  Box,
  Flex,
  Heading,
  HStack,
  Link,
  Stack,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import useDeleteCartItem from "@/requests/cart/hooks/useDeleteCartItem";
import { useDispatch } from "react-redux";
import { addNotification } from "@/redux/notificationSlice/notificationSlice";
import useSetCartItem from "@/requests/cart/hooks/useSetCartItem";
import useCheckout from "@/requests/cart/hooks/useCheckout";
const Cart = () => {
  const [items, setItems] = useState<CartItemResponse[] | undefined>(undefined);
  const { data, isLoading, mutate } = useGetCartItems();
  useEffect(() => {
    if (data) setItems(data);
  }, [data, setItems]);
  const deleteItem = useDeleteCartItem();
  const setCartItem = useSetCartItem();
  const dispatch = useDispatch();
  const checkout = useCheckout();
  const onCheckout = async () => {
    try {
      await checkout();
      mutate();
    } catch (error) {
      dispatch(
        addNotification({
          message: "Error while ordering",
          notificationType: "ERROR",
        })
      );
    }
  };
  return (
    <main>
      <Box
        maxW={{ base: "3xl", lg: "7xl" }}
        mx="auto"
        px={{ base: "4", md: "8", lg: "12" }}
        py={{ base: "6", md: "8", lg: "12" }}
      >
        <Stack
          direction={{ base: "column", lg: "row" }}
          align={{ lg: "flex-start" }}
          spacing={{ base: "8", md: "16" }}
        >
          <Stack spacing={{ base: "8", md: "10" }} flex="2">
            <Heading fontSize="2xl" fontWeight="extrabold">
              {items && `Shopping Cart (${items.length} items)`}
            </Heading>

            <Stack spacing="6">
              {isLoading && <Spinner></Spinner>}
              {items && items.length ? (
                items.map((item) => {
                  const {
                    game: { id, price, title, gameImages },
                    quantity,
                  } = item;
                  const onClickDelete = async () => {
                    try {
                      deleteItem(id);
                      setItems((prev) => {
                        if (!prev) return prev;
                        return prev.filter((item) => item.game.id !== id);
                      });
                    } catch (error) {
                      dispatch(
                        addNotification({
                          message: "Issue removing cart item",
                          notificationType: "ERROR",
                        })
                      );
                    }
                  };
                  const onChangeQuantity = async (quantity: number) => {
                    try {
                      setCartItem(id, quantity);
                      setItems((prev) => {
                        if (!prev) return;
                        for (const cartItem of prev) {
                          if (cartItem.game.id === id) {
                            cartItem.quantity = quantity;
                          }
                        }
                        return [...prev];
                      });
                    } catch (error) {
                      dispatch(
                        addNotification({
                          message: "Error updating quantity",
                          notificationType: "ERROR",
                        })
                      );
                    }
                  };
                  return (
                    <CartItem
                      onClickDelete={onClickDelete}
                      onChangeQuantity={onChangeQuantity}
                      id={id}
                      imageUrl={gameImages[0]?.url || placeholder}
                      key={id}
                      currency="EUR"
                      price={price * quantity}
                      description=""
                      quantity={quantity}
                      name={title}
                    />
                  );
                })
              ) : (
                <Heading fontSize={"2xl"}>
                  You have no cart items, please add some
                </Heading>
              )}
            </Stack>
          </Stack>

          {items && items.length && (
            <Flex direction="column" align="center" flex="1">
              <CartOrderSummary
                onCheckout={onCheckout}
                price={items.reduce((accum, previous) => {
                  return accum + previous.game.price * previous.quantity;
                }, 0)}
              />
              <HStack mt="6" fontWeight="semibold">
                <p>or</p>
                <Link href="/search" color={mode("blue.500", "blue.200")}>
                  Continue shopping
                </Link>
              </HStack>
            </Flex>
          )}
        </Stack>
      </Box>
    </main>
  );
};

export default Cart;
