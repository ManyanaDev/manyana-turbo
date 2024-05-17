import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// import { handleResponse } from "../../../lib/error-handler";
// import {UserLib} from '@repo/shared/lib/db/UserLib';

export const authOptions: AuthOptions = {
  providers: [],
  callbacks: {
    async jwt({ token, user, session }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        // @ts-ignore
        token.first_name = user.first_name;
        // @ts-ignore
        token.last_name = user.last_name;
        // @ts-ignore
        token.role = user.role;
      }

      return { ...user, ...token };
    },
    async session({ session, token, user }) {
      session.user = token;
      return session;
    },
  },
};

const nextAuth = NextAuth(authOptions);

export const { auth } = nextAuth;

export default nextAuth;
