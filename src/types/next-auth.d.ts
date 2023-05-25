import NextAuth from "@/pages/api/auth/[...nextauth]";
import { Role } from "@/redux/authSlice/authSlice";
declare module "next-auth" {
  interface Session {
    user: {
      accessToken: string;
      role: Role;
    };
  }
}
