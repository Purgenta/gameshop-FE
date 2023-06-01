"use client";
import { Game } from "@/types/game";
import style from "./ProductForm.module.css";
import { useFormik } from "formik";
import validate from "./productFormValidation";
import useGetPublishers from "@/requests/publishers/useGetPublishers";
import { Select } from "@chakra-ui/react";
import useGetCategories from "@/requests/categories/hooks/useGetCategories";
export interface FormValues {
  title: string;
  price: number | undefined;
  publisher_id: number | undefined;
  category_id: number | undefined;
  description: string;
  release_year: number | undefined;
}
type Values = {
  title: string;
  price: number;
  publisher: number;
  category_id: number;
  description: string;
  release_year: number;
};
type ProductFormProps = {
  game?: Game;
  onSubmit: (values: Values) => unknown;
};
const ProductForm = ({ game, onSubmit }: ProductFormProps) => {
  const formik = useFormik({
    initialValues: {
      description: game?.description || "",
      release_year: game?.releaseYear || new Date().getFullYear(),
      category_id: game?.category.id || 0,
      publisher_id: game?.publisher.publisher_id || 0,
      price: game?.price || 10,
      title: game?.title || "",
    },
    enableReinitialize: true,
    validate,
    validateOnMount: true,
    onSubmit: (values) => {
      values.publisher_id = +values.publisher_id;
      values.category_id = +values.category_id;
      onSubmit({ ...values } as any as Values);
    },
  });
  const { data: categories } = useGetCategories();
  console.log(formik.values);
  const {
    errors,
    values: { price, title },
  } = formik;
  const { data } = useGetPublishers();
  return (
    <form className={style["product-form"]} onSubmit={formik.handleSubmit}>
      <div className={style["input-group"]}>
        <label htmlFor="title">Title:</label>
        <input
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={title}
          type="text"
          name="title"
        ></input>
      </div>
      <div className={style["input-group"]}>
        <label htmlFor="title">Price:</label>
        <input
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={price !== undefined ? price : 10}
          type="number"
          name="price"
        ></input>
      </div>
      <div className={style["input-group"]}>
        <label htmlFor="release_year">Release year:</label>
        <input
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.release_year}
          type="number"
          name="release_year"
        ></input>
      </div>
      <div className={style["input-group"]}>
        <label htmlFor="description">Description:</label>
        <textarea
          onChange={formik.handleChange}
          name="description"
          onBlur={formik.handleBlur}
          value={formik.values.description}
        ></textarea>
      </div>
      <div className={`${style["input-group"]} ${style["select-group"]}`}>
        <label htmlFor="publisher_id">Publisher:</label>
        <Select
          placeholder="Select a publisher"
          variant={"flushed"}
          name="publisher_id"
          defaultValue={game?.publisher.publisher_id}
          onChange={formik.handleChange}
        >
          {data &&
            data.map((publisher) => (
              <option
                key={publisher.publisher_id}
                value={publisher.publisher_id}
              >
                {publisher.name}
              </option>
            ))}
        </Select>
      </div>
      <div className={`${style["input-group"]} ${style["select-group"]}`}>
        <label htmlFor="category_id">Category:</label>
        {categories && (
          <Select
            placeholder="Select a category"
            variant={"flushed"}
            defaultValue={game?.category.id}
            name="category_id"
            onChange={formik.handleChange}
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>
        )}
      </div>
      <button
        disabled={!formik.isValid || formik.isSubmitting}
        className={style["submit-btn"]}
        type="submit"
      >
        Next
      </button>
    </form>
  );
};

export default ProductForm;
