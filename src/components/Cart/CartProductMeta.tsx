"use client";
import Image, { StaticImageData } from "next/image";
import {
  Box,
  HStack,
  Icon,
  Link,
  Stack,
  Text,
  useColorModeValue as mode,
} from "@chakra-ui/react";
export type CartProductMetaProps = {
  isGiftWrapping?: boolean;
  name: string;
  description: string;
  image: string | StaticImageData;
};
import style from "./CartProductMeta.module.css";
export const CartProductMeta = (props: CartProductMetaProps) => {
  const { image, name, description } = props;
  return (
    <Stack direction="row" spacing="5" width="full">
      <Image
        className={style["cart-img"]}
        width="120"
        height="120"
        src={image}
        alt={name}
        draggable="false"
        loading="lazy"
      />
      <Box pt="4">
        <Stack spacing="0.5">
          <Text fontWeight="medium">{name}</Text>
          <Text color={mode("gray.600", "gray.400")} fontSize="sm">
            {description}
          </Text>
        </Stack>
      </Box>
    </Stack>
  );
};
