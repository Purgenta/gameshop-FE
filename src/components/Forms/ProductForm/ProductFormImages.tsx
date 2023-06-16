"use client";
import React, { useState } from "react";
import style from "./ProductFormImages.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
type ProductFormImagesProps = {
  onSubmit: (images: string[]) => unknown;
  images?: GameImages[];
};
import { faImage, faX } from "@fortawesome/free-solid-svg-icons";
import { nanoid } from "@reduxjs/toolkit";
import { GameImages } from "@/types/game";
import useDeleteImage from "@/requests/admin/hooks/useDeleteImage";
const ProductFormImages = ({
  onSubmit,
  images: pictures,
}: ProductFormImagesProps) => {
  const [images, setImages] = useState<string[]>([]);
  const deleteImage = useDeleteImage();
  const [existingImages, setExistingImages] = useState<GameImages[]>(
    pictures || []
  );
  const [url, setUrl] = useState("");
  return (
    <form
      className={style["product-image__form"]}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(images);
      }}
    >
      <div className={style["added-pictures"]}>
        <ul className={style["added-pictures__list"]}>
          {existingImages.map(({ id, url }) => {
            return (
              <li className={style["picture"]} key={nanoid(5)}>
                <FontAwesomeIcon icon={faImage}></FontAwesomeIcon>
                <a target="_blank" href={url}>
                  {url.slice(0, 30)}
                </a>
                <FontAwesomeIcon
                  icon={faX}
                  onClick={() => {
                    deleteImage(id);
                    setExistingImages((prev) =>
                      prev.filter((image) => image.id !== id)
                    );
                  }}
                ></FontAwesomeIcon>
              </li>
            );
          })}
          {images.map((image, index) => {
            return (
              <li className={style["picture"]} key={nanoid(5)}>
                <FontAwesomeIcon icon={faImage}></FontAwesomeIcon>
                <a href={image}>{image.slice(0, 30)}</a>
                <FontAwesomeIcon
                  icon={faX}
                  onClick={() => {
                    setImages((prev) =>
                      prev.filter((value, ind) => index !== ind)
                    );
                  }}
                ></FontAwesomeIcon>
              </li>
            );
          })}
        </ul>
      </div>
      <div className={style["input-group"]}>
        <input
          type="text"
          name="text"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
        ></input>
        <button
          onClick={() => {
            if (url.length > 15) {
              setImages((prev) => {
                return [...prev, url];
              });
              setUrl("");
            }
          }}
          type="button"
        >
          Add image
        </button>
      </div>
      <button className={style["submit"]} type="submit">
        Finish
      </button>
    </form>
  );
};

export default ProductFormImages;
