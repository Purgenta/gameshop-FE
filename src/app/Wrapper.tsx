"use client";
import { useSession } from "next-auth/react";
import { ReactNode } from "react";
type WrapperProps = {
  children: ReactNode;
};
const Wrapper = ({ children }: WrapperProps) => {
  const session = useSession({ required: false });
  return <>{session.status === "loading" || children}</>;
};

export default Wrapper;
