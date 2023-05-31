"use client";
import { SessionProvider, useSession } from "next-auth/react";
import React, { ReactNode } from "react";
type ProviderProps = {
  children: ReactNode;
};
const Provider = ({ children }: ProviderProps) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default Provider;
