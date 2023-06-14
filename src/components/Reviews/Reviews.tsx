import React, { useCallback, useEffect, useState } from "react";
import style from "./Reviews.module.css";
import { UserReview } from "@/types/review";
import Review from "./Review";
import ReviewForm, { ReviewFormValues } from "../Forms/ReviewForm/ReviewForm";
import { useDispatch } from "react-redux";
import useAddReview from "@/requests/reviews/useAddReview";
import useGetGameReviews from "@/requests/reviews/useGetGameReviews";
import useCheckReviewEligibility from "@/requests/reviews/useCheckReviewEligibility";
import { addNotification } from "@/redux/notificationSlice/notificationSlice";
import { REVIEWS } from "@/requests/APIENDPOINTS";
import { mutate } from "swr";
type ReviewsProps = {
  product_id: number;
  className?: string;
};
const Reviews = ({ product_id, className }: ReviewsProps) => {
  const [reviews, setReviews] = useState<UserReview[]>([]);
  const [userCanReview, setUserCanReview] = useState(false);
  const { data: reviewEligibility, mutate: mutateEligibility } =
    useCheckReviewEligibility(product_id);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const sendReview = useAddReview(product_id);
  const { data, mutate } = useGetGameReviews(page, product_id);
  useEffect(() => {
    if (reviewEligibility) {
      setUserCanReview(reviewEligibility.canReview);
    } else setUserCanReview(false);
  }, [reviewEligibility]);
  useEffect(() => {
    if (data) {
      setReviews((prev) => [...prev, ...data.reviews]);
    }
  }, [data]);
  const productReviews = reviews.map((userReview) => {
    return (
      <li key={userReview.id} className={style[`review`]}>
        {
          <Review
            createdAt={userReview.createdAt}
            email={userReview.user.email}
            rating={userReview.rating}
            comment={userReview.review}
            id={userReview.id}
          />
        }
      </li>
    );
  });
  return (
    <div className={style["reviews-wrapper"]}>
      {userCanReview && (
        <div className={style["form-wrapper"]}>
          <h3>Leave a review:</h3>
          <ReviewForm
            onSubmit={(values) => {
              sendReview(
                values,
                () => {
                  setPage(1);
                  setReviews([]);
                  mutateEligibility();
                  mutate();
                },
                () => {}
              );
            }}
          />
        </div>
      )}
      {productReviews.length ? (
        <ul className={className || style["reviews"]}>{productReviews}</ul>
      ) : (
        <h3>No reviews yet...</h3>
      )}
      {data && page < data?.pageCount && (
        <button
          className={style["load-reviews"]}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default Reviews;
