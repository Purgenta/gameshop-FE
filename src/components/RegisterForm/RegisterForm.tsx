"use client";
import style from "./RegisterForm.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useFormik } from "formik";
import Link from "next/link";
import validate from "../LoginForm/loginFormValidation";
export interface FormValues {
  email: string;
  password: string;
}
type RegisterFormProps = {
  submitHandler: (formValues: FormValues) => unknown;
  emailError?: string;
  passwordError?: string;
};
const RegisterForm = ({
  submitHandler,
  emailError,
  passwordError,
}: RegisterFormProps) => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    enableReinitialize: true,
    validateOnMount: true,
    validate,
    onSubmit: (values) => {
      submitHandler(values);
    },
  });
  const { touched, errors, isSubmitting } = formik;
  return (
    <div className={style["register-form__wrapper"]}>
      <form
        className={style["authentication-form"]}
        onSubmit={formik.handleSubmit}
      >
        <label className={style["auth-label"]} id="email">
          Email
        </label>
        <div className={style["input-wrapper"]}>
          <FontAwesomeIcon icon={faEnvelope} />
          <input
            className={style["auth-input"]}
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter your email adress"
          />
        </div>
        {emailError && !touched.email && (
          <p className={style["error-message"]}>{emailError}</p>
        )}
        {errors.email && touched.email && (
          <p className={style["error-message"]}>{errors.email}</p>
        )}
        <label className={style["auth-label"]} id="password">
          Password
        </label>
        <div className={style["input-wrapper"]}>
          <FontAwesomeIcon icon={faKey} />
          <input
            className={style["auth-input"]}
            name="password"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter your password"
          />
        </div>
        {passwordError && !touched.password && (
          <p className={style["error-message"]}>{passwordError}</p>
        )}
        {errors.password && touched.password && (
          <p className={style["error-message"]}>{errors.password}</p>
        )}
        <button
          type="submit"
          className={style["submit-btn"]}
          disabled={isSubmitting || !formik.isValid}
        >
          Register
        </button>
        <Link href="/login">Already have an account?</Link>
      </form>
    </div>
  );
};

export default RegisterForm;
