"use server";

import { User } from "@repo/shared/types";

export async function login(data: User) {
  console.log("data :>> ", data);
  await new Promise((resolve) => setTimeout(resolve, 2000));
}
