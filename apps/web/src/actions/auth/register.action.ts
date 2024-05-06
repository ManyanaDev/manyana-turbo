"use server";

import { Merchant, User } from "@repo/shared/types";

export async function register(data: User & Merchant) {
  console.log("data :>> ", data);
  await new Promise((resolve) => setTimeout(resolve, 2000));
}
