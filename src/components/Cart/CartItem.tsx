"use client";
import {
  CloseButton,
  Flex,
  Link,
  Select,
  SelectProps,
  useColorModeValue,
} from "@chakra-ui/react";
import { PriceTag } from "./PriceTag";
import { CartProductMeta } from "./CartProductMeta";
import { StaticImageData } from "next/image";
import style from "./CartItem.module.css";
type CartItemProps = {
  id: number;
  name: string;
  description: string;
  quantity: number;
  price: number;
  currency: string;
  imageUrl: string | StaticImageData;
  onChangeQuantity?: (quantity: number) => void;
  onClickGiftWrapping?: () => void;
  onClickDelete?: () => void;
};

const QuantitySelect = (props: SelectProps) => {
  const values = new Array<number>(100).fill(1);
  return (
    <Select
      maxW="64px"
      aria-label="Select quantity"
      focusBorderColor={useColorModeValue("blue.500", "blue.200")}
      {...props}
    >
      {values.map((val, index) => {
        return (
          <option value={index + 1} key={index + 1}>
            {index + 1}
          </option>
        );
      })}
    </Select>
  );
};

export const CartItem = (props: CartItemProps) => {
  const {
    id,
    name,
    description,
    quantity,
    imageUrl,
    currency,
    price,
    onChangeQuantity,
    onClickDelete,
  } = props;
  return (
    <Flex
      backgroundColor={"whiteAlpha.500"}
      padding={"4"}
      direction={{ base: "column", md: "row" }}
      justify="space-between"
      align="center"
    >
      <CartProductMeta name={name} description={description} image={imageUrl} />
      <Flex
        width="full"
        justify="space-between"
        display={{ base: "none", md: "flex" }}
      >
        <QuantitySelect
          value={quantity}
          onChange={(e) => {
            onChangeQuantity?.(+e.currentTarget.value);
          }}
        />
        <PriceTag price={price} currency={currency} />
        <CloseButton
          className={style["close-btn"]}
          aria-label={`Delete ${name} from cart`}
          onClick={onClickDelete}
        />
      </Flex>
      <Flex
        mt="4"
        align="center"
        width="full"
        justify="space-between"
        display={{ base: "flex", md: "none" }}
      >
        <Link fontSize="sm" textDecor="underline">
          Delete
        </Link>
        <QuantitySelect
          value={quantity}
          onChange={(e) => {
            onChangeQuantity?.(+e.currentTarget.value);
          }}
        />
        <PriceTag price={price} currency={currency} />
      </Flex>
    </Flex>
  );
};
