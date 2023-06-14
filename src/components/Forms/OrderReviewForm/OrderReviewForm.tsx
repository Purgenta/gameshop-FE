import { useFormik } from "formik";
import React from "react";
import { OrderReview } from "@/types/order";
import { Button, Textarea } from "@chakra-ui/react";
import style from "./OrderReviewForm.module.css";
import validate from "./orderReviewValidation";
import Rating from "@/components/Rating/Rating";
type Props = {
  deliveryRating?: number;
  serviceRating?: number;
  review?: string;
  id?: number;
  onSubmit: (formValues: OrderReview) => Promise<any>;
};
const OrderReviewForm = ({
  deliveryRating,
  serviceRating,
  id,
  review,
  onSubmit,
}: Props) => {
  const formik = useFormik<OrderReview>({
    initialValues: {
      id: id || 0,
      deliveryRating: deliveryRating || 0,
      review: review || "",
      serviceRating: serviceRating || 0,
    },
    onSubmit,
    validate,
    validateOnMount: true,
    enableReinitialize: true,
  });
  const { handleSubmit, handleChange, handleBlur, isSubmitting, isValid } =
    formik;
  return (
    <form onSubmit={handleSubmit} className={style["order-review__form"]}>
      <div className={style["input-group"]}>
        <label htmlFor="review">Review</label>
        <Textarea
          name="review"
          onChange={handleChange}
          onBlur={handleBlur}
          value={formik.values.review}
        ></Textarea>
      </div>
      <div className={style["input-group"]}>
        <label>Delivery rating</label>
        <Rating
          initialRating={deliveryRating || 0}
          onChange={(rating) =>
            formik.setValues((prev) => ({ ...prev, deliveryRating: rating }))
          }
        ></Rating>
      </div>
      <div className={style["input-group"]}>
        <label>Service rating</label>
        <Rating
          initialRating={serviceRating || 0}
          onChange={(rating) =>
            formik.setValues((prev) => ({ ...prev, serviceRating: rating }))
          }
        ></Rating>
      </div>
      <div className={style["form-control"]}>
        <Button type="submit" isDisabled={isSubmitting || !isValid}>
          Submit
        </Button>
      </div>
    </form>
  );
};

export default OrderReviewForm;
