"use client";
import React from "react";
import style from "./page.module.css";
import LoginForm, { FormValues } from "@/components/Forms/LoginForm/LoginForm";
import { useDispatch } from "react-redux";
import { addNotification } from "@/redux/notificationSlice/notificationSlice";
import { signIn } from "next-auth/react";
const Page = () => {
  const dispatch = useDispatch();
  const sendLoginRequest = async (values: FormValues) => {
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
    <main className={style.main}>
      {<LoginForm submitHandler={sendLoginRequest} />}
    </main>
  );
};

export default Page;
