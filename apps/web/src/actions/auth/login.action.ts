"use server";

import { User } from "../../components/forms/auth/register";

export async function login(data: User) {
  console.log("data :>> ", data);
  await new Promise((resolve) => setTimeout(resolve, 2000));
}
