// @ts-ignore
import NextAuth, { User } from "next-auth";
// @ts-ignore
import Credentials from "next-auth/providers/credentials";
import { register } from "./actions/auth/register.action";
import { IMerchant, IUser } from "@repo/shared/types";
import { authConfig } from "./auth.config";
import { login } from "./actions/auth/login.action";

function isValueValidString(value: unknown): value is string {
  return typeof value === "string" && value !== "";
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      id: "signin",
      // using "name" here results in sending a 200 on failed requests for some reason
      // name: "Sign in",
      type: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, request) {
        try {
          const result = await login({
            user: {
              email: credentials.username as string,
              password: credentials.password as string,
            },
          });

          if (result.error) {
            return null;
          }

          const _user: User & IUser = {
            id: result.data.user.id,
            email: result.data.user.email,
            image: "",
            first_name: result.data.user.first_name,
            last_name: result.data.user.last_name,
            name: `${result.data.user.first_name} ${result.data.user.last_name}`,
          };

          return _user;
        } catch (error) {
          return null;
        }
      },
    }),
    /**
     * ----------------------------------------
     * SIGN UP WITH CREDENTIALS
     * ----------------------------------------
     */
    Credentials({
      id: "signup",
      name: "Sign up",
      type: "credentials",
      credentials: {
        first_name: {
          label: "First Name",
          type: "text",
        },
        last_name: {
          label: "Last Name",
          type: "text",
        },
        email: {
          label: "Email",
          type: "text",
        },
        password: { label: "Password", type: "password" },
        business_name: {
          label: "Business Name",
          type: "text",
        },
      },
      async authorize(credentials, _req) {
        if (!Object.values(credentials).every(isValueValidString)) {
          throw new Error("Invalid input");
        }

        const business_name = isValueValidString(credentials.business_name)
          ? credentials.business_name
          : "";
        const email = isValueValidString(credentials.email)
          ? credentials.email
          : "";
        const password = isValueValidString(credentials.password)
          ? credentials.password
          : "";
        const first_name = isValueValidString(credentials.first_name)
          ? credentials.first_name
          : "";
        const last_name = isValueValidString(credentials.last_name)
          ? credentials.last_name
          : "";

        const user: IUser = {
          email,
          password,
          first_name,
          last_name,
        };

        const merchant: IMerchant = {
          business_name,
          primary_user: email,
        };

        try {
          const result = await register({ user, merchant });

          console.log("result :>> ", result);

          if (result.error) {
            // return null;
            throw new Error(result.error);
          }

          console.log("result.data :>> ", result.data);

          const _user: User & {
            first_name: string;
            last_name: string;
          } = {
            id: result.data.user.id,
            email: result.data.user.email,
            image: "",
            first_name: result.data.user.first_name,
            last_name: result.data.user.last_name,
            name: `${result.data.user.first_name} ${result.data.user.last_name}`,
          };

          console.log("_user :>> ", _user);

          return _user;
        } catch (error) {
          console.log("error :>> ", error);
          throw new Error(JSON.stringify(error));
        }
      },
    }),
  ],
  callbacks: {
    // authorized(params) {
    //   console.log("authorized params :>> ", params);
    //   return true;
    // },
    async session({ session, token, user }) {
      console.log("user :>> ", user);
      // @ts-ignore
      session.user = token.user as User;
      return session;
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
});
