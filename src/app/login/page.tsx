"use client";
import React from "react";
import style from "./page.module.css";
import LoginForm, { FormValues } from "@/components/Forms/LoginForm/LoginForm";
import { loginRequest } from "@/requests/user/userRequests";
import { useDispatch } from "react-redux";
import { addNotification } from "@/redux/notificationSlice/notificationSlice";
import { nanoid } from "@reduxjs/toolkit";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
const Page = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const sendLoginRequest = async (values: FormValues) => {
    try {
      await signIn("credentials", {
        username: values.email,
        password: values.password,
        redirect: true,
        callbackUrl: "/profile",
      });
      dispatch(
        addNotification({
          id: nanoid(5),
          message: "Successfull login",
          notificationType: "SUCCESS",
        })
      );
    } catch (error) {
      dispatch(
        addNotification({
          id: nanoid(5),
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
