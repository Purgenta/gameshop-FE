import React from "react";
import { useFormik } from "formik";
import validate from "./addProductForm.validation";
export interface FormValues {
  title: string;
  price: number;
  image: string;
}
type ProductFormErrors = {
  title?: string;
  price?: string;
  image?: string;
};
type AddProductFormProps = {
  errors?: ProductFormErrors;
  submitHandler: (formValues: FormValues) => unknown;
  title?: string;
  price?: number;
  image?: string;
};
const AddProductForm = ({
  submitHandler,
  title,
  price,
  image,
}: AddProductFormProps) => {
  const formik = useFormik({
    initialValues: {
      title: title || "",
      price: price || 32.5,
      image: image || "",
      publisher: 1,
    },
    enableReinitialize: true,
    validate,
    validateOnMount: true,
    onSubmit: async (values) => {
      await submitHandler(values);
    },
  });
  return <div>AddProductForm</div>;
};

export default AddProductForm;
