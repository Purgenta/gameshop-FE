"use client";
import useGetGame from "@/requests/game/hooks/useGetGame";
import style from "./page.module.css";
import ReadMore from "@/components/ReadMore/ReadMore";
import HighlightedFeatures from "@/components/HighlightedFeatures/HighlightedFeatures";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Heading } from "@chakra-ui/react";
import Image from "next/image";
import { NumberInput } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { useState } from "react";
import placeholder from "../../../../public/jk-placeholder-image.jpg";
import useAddCartItem from "@/requests/cart/hooks/useAddCartItem";
import Reviews from "@/components/Reviews/Reviews";
type GameSearchProps = {
  params: {
    id: number;
  };
};
const Game = ({ params: { id } }: GameSearchProps) => {
  const { data } = useGetGame(id);
  const [quantity, setQuantity] = useState(1);
  const updateQuantity = useAddCartItem(id);
  return (
    data && (
      <div className={style["product"]}>
        <section className={style["product-info"]}>
          <div className={style["img-wrapper"]}>
            <Image
              alt={`cover photo of ${data.title}`}
              width={"225"}
              height={"337"}
              src={data.gameImages[0]?.url || placeholder}
            ></Image>
            <ul className={style["product-genres"]}>
              {[data.category].map((category) => {
                return (
                  <li key={category.id} className={style["genre"]}>
                    {category.name}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className={style["information"]}>
            <h2 className={style["title"]}>{data.title}</h2>
            {
              <ReadMore
                paragraph={data.description}
                className={style["description"]}
              />
            }
            <div className={style["purchase"]}>
              <div className={style["pricing"]}>
                <Heading size="md">
                  {" "}
                  {`${data.price.toFixed(2)} \u20AC`}
                </Heading>
              </div>
              <div className={style["add-item"]}>
                <NumberInput
                  min={1}
                  max={100}
                  onChange={(num) => {
                    if (+num) return;
                    setQuantity(+num);
                  }}
                ></NumberInput>
                <button
                  onClick={async () => {
                    await updateQuantity(quantity);
                  }}
                  className={style["add-to__cart"]}
                >
                  Add to cart <FontAwesomeIcon icon={faShoppingCart} />
                </button>
              </div>
            </div>
          </div>
        </section>
        <HighlightedFeatures
          publishing_year={data.releaseYear}
          publisher={data.publisher.name}
          avg_rating={data.avgRating}
        ></HighlightedFeatures>
        <div className={style["reviews-similiar__products"]}>
          <section className={style["reviews"]}>
            <Heading textAlign={"center"} size={"lg"}>
              Reviews
            </Heading>
            <Box maxWidth={"800px"}>
              <Reviews product_id={data.id}></Reviews>
            </Box>
          </section>
        </div>
      </div>
    )
  );
};

export default Game;
