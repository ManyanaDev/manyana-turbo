"use server";

import { signOut } from "../../auth";

export async function logout() {
  return await signOut({
    redirectTo: "/login",
  });
}
