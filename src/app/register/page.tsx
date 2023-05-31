"use client";
import React from "react";
import RegisterForm, {
  FormValues,
} from "@/components/Forms/RegisterForm/RegisterForm";
import style from "./page.module.css";
import { signIn } from "next-auth/react";
import { useDispatch } from "react-redux";
import { addNotification } from "@/redux/notificationSlice/notificationSlice";
const Page = () => {
  const dispatch = useDispatch();
  const sendRegisterRequest = async (values: FormValues) => {
    try {
      await signIn("credentials", {
        username: values.email,
        password: values.password,
        redirect: true,
        callbackUrl: "/profile",
        error: "",
      });
      dispatch(
        addNotification({
          message: "Successfull login",
          notificationType: "SUCCESS",
        })
      );
    } catch (error) {
      dispatch(
        addNotification({
          message: "Issue logging in",
          notificationType: "ERROR",
        })
      );
    }
  };
  return (
    <main className={style["main-register"]}>
      {<RegisterForm submitHandler={sendRegisterRequest} />}
    </main>
  );
};

export default Page;
