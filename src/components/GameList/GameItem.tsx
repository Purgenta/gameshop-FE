import React from "react";
import style from "./GameItem.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import Image from "next/image";
import { Game } from "@/types/game";
const GameItem = ({ title, price, gameImages, id }: Game) => {
  const dispatch = useDispatch();
  return (
    <div className={style["item"]}>
      <div className={style["img-wrapper"]}>
        <Image alt={`${title} cover`} src={gameImages[0]} />
      </div>
      <h4 className={style["title"]}>{title}</h4>
      <div className={style["information"]}>
        <h5 className={style["price"]}>{`${price.toFixed(2)} \u20AC `}</h5>
        <button type="button" className={style["cart"]}>
          <FontAwesomeIcon icon={faCartShopping}></FontAwesomeIcon>
        </button>
      </div>
    </div>
  );
};

export default GameItem;
