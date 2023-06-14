import React from "react";
import style from "./HighlightedFeatures.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faHouse, faStar } from "@fortawesome/free-solid-svg-icons";
type HighlightedFeaturesProps = {
  avg_rating: number;
  publishing_year: number;
  publisher: string;
};
const HighlightedFeatures = ({
  avg_rating,
  publishing_year,
  publisher,
}: HighlightedFeaturesProps) => {
  return (
    <ul className={style[`highlighted-information`]}>
      <li>
        Publishing year
        <FontAwesomeIcon
          className={style["highlight-icon"]}
          size={"2xl"}
          icon={faCalendar}
        />
        {publishing_year}
      </li>
      <li>
        Average rating
        <FontAwesomeIcon
          className={style["highlight-icon"]}
          size={"2xl"}
          icon={faStar}
        />
        {avg_rating}
      </li>
      <li>
        Publisher name
        <FontAwesomeIcon
          className={style["highlight-icon"]}
          size={"2xl"}
          icon={faHouse}
        />
        {publisher}
      </li>
    </ul>
  );
};

export default HighlightedFeatures;
