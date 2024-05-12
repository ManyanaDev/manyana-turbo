"use server";

import { ApiResponse, ILoginForm } from "@repo/shared/types";
import axios from "axios";
import { PAYLOAD_API_URL } from "@repo/shared/src";
import { AxiosError } from "axios";

export async function login({
  user,
}: {
  user: ILoginForm;
}): Promise<ApiResponse> {
  return await axios
    .post(`${PAYLOAD_API_URL}/users/login`, {
      email: user.email,
      password: user.password,
    })
    .then((res) => {
      if (res.data.error) {
        return {
          error: res.data.error,
          data: res.data,
          status: res.status,
        };
      }

      return {
        error: null,
        data: res.data,
        status: res.status,
      };
    })
    .catch((error) => {
      if (error instanceof AxiosError) {
        return {
          error: error.response?.data?.error || "Login failed",
          data: error.response?.data,
          status: error.response?.status || 500,
        };
      }
      return {
        error,
        data: null,
        status: 500,
      };
    });
}
