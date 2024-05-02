"use server";

export async function forgotPassword(data: { email: string }) {
  console.log("data :>> ", data);
  await new Promise((resolve) => setTimeout(resolve, 2000));
}

export async function resetPassword(data: {
  password: string;
  password_confirm: string;
}) {
  console.log("data :>> ", data);
  await new Promise((resolve) => setTimeout(resolve, 2000));
}
