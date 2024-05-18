"use server";

import { urls_config } from "@repo/shared/src";
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

  console.log(urls_config.PAYLOAD_API_URL);

  return await axios
    .patch(
      // @ts-ignore
      `${urls_config.PAYLOAD_API_URL}/merchants/${session?.user?.merchant_id}`,
      body,
      {
        headers: {
          // @ts-ignore
          Authorization: `Bearer ${session?.user?.payload_token}`,
        },
      }
    )
    .then((res) => {
      console.log("res :>> ", res);
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
