"use client";
import React from "react";
import RegisterForm, {
  FormValues,
} from "@/components/RegisterForm/RegisterForm";
import style from "./page.module.css";
const Page = () => {
  const handleRegister = async (formValeus: FormValues) => {};
  return (
    <main className={style["main-register"]}>
      {<RegisterForm submitHandler={(formValues) => console.log(formValues)} />}
    </main>
  );
};

export default Page;
