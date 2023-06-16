"use client";
import React from "react";
import style from "./page.module.css";
import LoginForm, { FormValues } from "@/components/Forms/LoginForm/LoginForm";
import { useDispatch } from "react-redux";
import { addNotification } from "@/redux/notificationSlice/notificationSlice";
import { signIn } from "next-auth/react";
import { Text } from "@chakra-ui/react";
type CallbackParams = {
  searchParams: {
    error: string;
  };
};
const Page = ({ searchParams: { error } }: CallbackParams) => {
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
      {error && (
        <Text
          marginBottom={"10"}
          color={"red.500"}
        >{`Error during login`}</Text>
      )}
      {<LoginForm submitHandler={sendLoginRequest} />}
    </main>
  );
};

export default Page;
