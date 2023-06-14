import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faStar } from "@fortawesome/free-solid-svg-icons";
import ReadMore from "../ReadMore/ReadMore";
import style from "./Review.module.css";
export type Review = {
  comment: string;
  rating: number;
  email: string;
  id: number;
  createdAt: Date;
};
const Review = ({ comment, rating, email, createdAt }: Review) => {
  let ratingStars: JSX.Element[] = [];
  while (rating > 0 || ratingStars.length < 5) {
    if (rating > 0) {
      ratingStars.push(
        <FontAwesomeIcon
          key={ratingStars.length}
          icon={faStar}
          className={style["filled-rating"]}
        />
      );
      rating--;
    } else {
      ratingStars.push(
        <FontAwesomeIcon
          key={ratingStars.length}
          icon={faStar}
          className={style["empty-rating"]}
        ></FontAwesomeIcon>
      );
    }
  }
  return (
    <div className={style["review-wrapper"]}>
      <div className={style["user-information"]}>
        <FontAwesomeIcon size="xl" icon={faUser}></FontAwesomeIcon>
        <div className={style["meta-data"]}>
          <h4 className={style["user-name"]}>{email}</h4>
          <h4 className={style["created-at"]}>
            {new Date(createdAt).toLocaleDateString("en-GB", {
              year: "numeric",
              month: "numeric",
              day: "numeric",
            })}
          </h4>
        </div>
      </div>
      <div className={style["rating"]}>{ratingStars}</div>
      <ReadMore paragraph={comment} cutoff={350}></ReadMore>
    </div>
  );
};

export default Review;
