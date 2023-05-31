import NextAuth from "@/pages/api/auth/[...nextauth]";
import { Role } from "./role";
declare module "next-auth/jwt" {
  interface JWT {
    role: Role;
  }
}
declare module "next-auth" {
  interface Session {
    user: {
      accessToken: string;
      role: Role;
      refreshToken: string;
      email: string;
    };
  }
}
