"use server";

import { Merchant, User } from "../../components/forms/auth/register";

export async function register(data: User & Merchant) {
  console.log("data :>> ", data);
  await new Promise((resolve) => setTimeout(resolve, 2000));
}