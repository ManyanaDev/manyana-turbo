"use server";

import { urls_config } from "@repo/shared/src";
import { ApiResponse, IMerchant, IUser } from "@repo/shared/types";
import axios from "axios";
import { AxiosError } from "axios";

/**
 * An action should return a strict object with the following properties:
 * - error: null | Error
 * - data: any
 * - status: number
 * @param data
 */

export async function register({
  user,
  merchant,
}: {
  user: IUser;
  merchant: IMerchant;
}): Promise<ApiResponse> {
  return await axios
    .post(`${urls_config.PAYLOAD_API_URL}/auth/register`, {
      user,
      merchant,
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
          error:
            error.response?.data?.error ||
            //  @ts-ignore
            error?.errors! ||
            "Registration failed",
          data: error.response?.data,
          status: error.response?.status || 500,
        };
      }
      return { error, data: null, status: 500 };
    });
}
