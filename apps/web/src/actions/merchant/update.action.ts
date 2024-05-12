"use server";

import { PAYLOAD_API_URL } from "@repo/shared/src";
import { ApiResponse, Merchant } from "@repo/shared/types";
import axios from "axios";
import { AxiosError } from "axios";
import { auth } from "../../auth";

export async function updateMerchant(
  body: Partial<Merchant>
): Promise<ApiResponse> {
  const session = await auth();

  // @ts-ignore
  if (!session?.user?.payload_token && !session?.user?.merchant_id) {
    return {
      data: null,
      error: {
        message: "Unauthorized",
        status: 401,
      },
      status: 401,
    };
  }

  return await axios
    // @ts-ignore
    .patch(`${PAYLOAD_API_URL}/merchants/${session?.user?.merchant_id}`, body, {
      headers: {
        // @ts-ignore
        Authorization: `Bearer ${session?.user?.payload_token}`,
      },
    })
    .then((res) => {
      return { data: res.data, error: null, status: res.status };
    })
    .catch((err) => {
      if (err instanceof AxiosError) {
        return {
          data: null,
          error: err.response?.data,
          status: err.response?.status ?? 500,
        };
      }
      return {
        data: null,
        error: err,
        status: 500,
      };
    });
}