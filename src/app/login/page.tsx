"use client";
import React from "react";
import style from "./page.module.css";
import LoginForm, { FormValues } from "@/components/LoginForm/LoginForm";
import { loginRequest } from "@/requests/user/userRequests";
import { useDispatch } from "react-redux";
import { updateAuthState } from "@/redux/authSlice/authSlice";
import { addNotification } from "@/redux/notificationSlice/notificationSlice";
import { nanoid } from "@reduxjs/toolkit";
import { useRouter } from "next/navigation";
const Page = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const sendLoginRequest = async (values: FormValues) => {
    try {
      const response = await loginRequest(values);
      dispatch(
        updateAuthState({
          isAuth: true,
          accessToken: response!.accessToken,
          role: response!.role,
        })
      );
      dispatch(
        addNotification({
          id: nanoid(5),
          message: "Successfull login",
          notificationType: "SUCCESS",
        })
      );
      router.push("/");
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
