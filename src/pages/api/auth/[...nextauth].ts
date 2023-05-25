/* eslint-disable import/no-anonymous-default-export */
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";
import { NextAuthOptions } from "next-auth";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
type NextAuthOptionsCallback = (
  req: NextApiRequest,
  res: NextApiResponse
) => NextAuthOptions;
const nextAuthOptions: NextAuthOptionsCallback = (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  return {
    providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          username: { label: "Username", type: "text", placeholder: "jsmith" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials, req) {
          const response = await axios.post(
            "http://localhost:8080/authentication/login",
            { email: credentials?.username, password: credentials?.password },
            {
              withCredentials: true,
              headers: { "Content-Type": "application/json" },
            }
          );
          const cookies = response.headers["set-cookie"];
          if (cookies) res.setHeader("Set-cookie", cookies);
          const user = response.data;
          if (response.status === 200 && user) {
            return user;
          }
          return null;
        },
      }),
    ],
    callbacks: {
      async jwt({ token, user }) {
        return { ...token, ...user };
      },
      async session({ session, token, user }) {
        session.user = token as any;
        return session;
      },
    },
    pages: {
      signIn: "/login",
      error: "/login",
    },
  };
};
export default function (req: NextApiRequest, res: NextApiResponse) {
  return NextAuth(req, res, nextAuthOptions(req, res));
}
