import { FormValues } from "./ProductForm";
const validate = (values: FormValues) => {
  const errors = {
    category_id: "",
    price: "",
    publisher_id: "",
    title: "",
    release_year: "",
    description: "",
  };
  if (!values.category_id || values.category_id === 0) {
    errors.category_id = "You must choose a category";
  }
  if (!values.publisher_id || values.publisher_id === 0) {
    errors.publisher_id = "You must choose a publisher";
  }
  if (values.description.length < 15 || values.description.length > 1000) {
    errors.description =
      "Description must be between 15 and 1000 characters longs";
  }
  if (
    !values.release_year ||
    values.release_year > new Date().getFullYear() ||
    values.release_year < 1950
  ) {
    errors.release_year = "Release year can't be in the future";
  }
  if (values.title.length < 5) {
    errors.title = "Title must be at least 5 characters long";
  }
  if (!values.price || values.price <= 0) {
    errors.price = "Price must be higher then 0";
  }
  let property: keyof typeof errors;

  for (property in errors) {
    if (errors[property] !== "") return errors;
  }

  return undefined;
};
export default validate;
