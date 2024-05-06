"use server";

import { fakePromise } from "@repo/shared/src";
import { Merchant, User } from "@repo/shared/types";

export async function register(data: User & Merchant) {
  console.log("data :>> ", data);
  return await fakePromise(data);
}
