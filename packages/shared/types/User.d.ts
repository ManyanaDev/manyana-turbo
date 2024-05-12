import { User } from "./payload-types";

export type IUser = Pick<
  User,
  "email" | "password" | "first_name" | "last_name"
>;
