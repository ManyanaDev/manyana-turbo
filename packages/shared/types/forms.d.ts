import { IMerchant } from "./Merchant";
import { User } from "./payload-types";
import { IUser } from "./User";

export type ILoginForm = Pick<User, "email" | "password">;

export interface IRegisterForm extends IUser, IMerchant {
  password_confirm: User["password"];
}
