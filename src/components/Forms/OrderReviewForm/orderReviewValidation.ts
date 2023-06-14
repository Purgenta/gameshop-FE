import { OrderReview } from "@/types/order";
const validate = (formValues: OrderReview) => {
  const errors = {
    review: "",
    serviceRating: "",
    deliveryRating: "",
  };
  if (formValues.review.length < 15 || formValues.review.length > 500)
    errors.review =
      "Your review needs to be between 15 and 350 characters long";
  if (formValues.deliveryRating < 1 || formValues.deliveryRating > 5)
    errors.deliveryRating = "Rating needs to be between 1 and 5";
  if (formValues.serviceRating < 1 || formValues.deliveryRating > 5) {
    errors.serviceRating = "Rating needs to be between 1 and 5";
  }
  if (!errors.review && !errors.serviceRating && !errors.deliveryRating)
    return undefined;
  return errors;
};
export default validate;
