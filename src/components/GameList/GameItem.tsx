import React from "react";
import style from "./GameItem.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import placeholder from "../../../public/jk-placeholder-image.jpg";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import useAddCartItem from "@/requests/cart/hooks/useAddCartItem";
import Link from "next/link";
import useLoginWarning from "@/hooks/useLoginWarning";
import Image from "next/image";
import { Game, GameImages } from "@/types/game";
import { Heading } from "@chakra-ui/react";
type GameItemProps = {
  title: string;
  price: number;
  gameImages: GameImages[];
  id: number;
};
const GameItem = ({ title, price, gameImages, id }: GameItemProps) => {
  const addCartItem = useAddCartItem(id);
  const warning = useLoginWarning();
  const handleCartItem = () => {
    warning();
    addCartItem(1);
  };
  return (
    <>
      <Link href={`game/${id}`} className={style["img-wrapper"]}>
        <Image
          alt={`${title} cover`}
          width={150}
          height={225}
          src={gameImages[0]?.url || placeholder}
        />
      </Link>
      <div className={style["information"]}>
        <div className={"title"}>
          <Heading textAlign={"left"} size={"md"}>
            {title}
          </Heading>
        </div>
        <div className={style["product-interaction"]}>
          <Heading
            textDecoration={"ActiveBorder"}
            size={"sm"}
          >{`${price.toFixed(2)} \u20AC `}</Heading>
          <button
            type="button"
            className={style["cart"]}
            onClick={handleCartItem}
          >
            <FontAwesomeIcon icon={faCartShopping}></FontAwesomeIcon>
          </button>
        </div>
      </div>
    </>
  );
};

export default GameItem;
