"use client";
import { Provider } from "react-redux";
import React from "react";
import store from "../store";
type ProviderProps = {
  children: React.ReactNode;
};
const ContextProvider = ({ children }: ProviderProps) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ContextProvider;
