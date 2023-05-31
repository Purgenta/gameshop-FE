import React from "react";
import style from "./GameItem.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import placeholder from "../../../public/jk-placeholder-image.jpg";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import useAddCartItem from "@/requests/cart/hooks/useAddCartItem";
import useLoginWarning from "@/hooks/useLoginWarning";
import Image from "next/image";
import { Game } from "@/types/game";
type GameItemProps = Omit<Game, "publisher">;
const GameItem = ({ title, price, gameImages, id }: GameItemProps) => {
  const addCartItem = useAddCartItem(id);
  const warning = useLoginWarning();
  const handleCartItem = () => {
    warning();
    addCartItem();
  };
  return (
    <>
      <div className={style["img-wrapper"]}>
        <Image
          alt={`${title} cover`}
          width={150}
          height={225}
          src={gameImages[0]?.url || placeholder}
        />
      </div>
      <h4 className={style["title"]}>{title}</h4>
      <div className={style["information"]}>
        <h5 className={style["price"]}>{`${price.toFixed(2)} \u20AC `}</h5>
        <button
          type="button"
          className={style["cart"]}
          onClick={handleCartItem}
        >
          <FontAwesomeIcon icon={faCartShopping}></FontAwesomeIcon>
        </button>
      </div>
    </>
  );
};

export default GameItem;
