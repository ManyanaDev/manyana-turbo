import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// import { handleResponse } from "../../../lib/error-handler";
// import {UserLib} from '@repo/shared/lib/db/UserLib';

export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const userLib = new UserLib();

        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        try {
          const response = await userLib.login(
            credentials.username,
            credentials.password
          );

          // handleResponse(response);

          if (response && "email" in response) {
            return {
              id: response.id,
              email: response.email,
              first_name: response.first_name,
              last_name: response.last_name,
              role: response.role,
            };
          }

          return null;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, session }) {
      if (user) {
        //   console.log("user :>> ", user)
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
