"use client";
import React from "react";
import RegisterForm, {
  FormValues,
} from "@/components/Forms/RegisterForm/RegisterForm";
import style from "./page.module.css";
import { signIn } from "next-auth/react";
import { useDispatch } from "react-redux";
import { addNotification } from "@/redux/notificationSlice/notificationSlice";
import { registerRequest } from "@/requests/user/userRequests";
const Page = () => {
  const dispatch = useDispatch();
  const sendRegisterRequest = async (values: FormValues) => {
    try {
      await registerRequest(values);
      dispatch(
        addNotification({
          message: "User successfully created",
          notificationType: "SUCCESS",
        })
      );
    } catch (error) {
      dispatch(
        addNotification({
          message: "Error while creating the user",
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
