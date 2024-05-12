"use server";
import { PAYLOAD_API_URL } from "@repo/shared/src";
import axios from "axios";
import { AxiosError } from "axios";
import { ApiResponse } from "@repo/shared/types";
import { auth } from "../../auth";

export async function getMerchantProjects(): Promise<ApiResponse> {
  const session = await auth();

  return await axios
    // @ts-ignore
    .get(`${PAYLOAD_API_URL}/merchants/${session?.user?.merchant_id}`, {
      headers: {
        // @ts-ignore
        Authorization: `Bearer ${session?.user?.payload_token}`,
      },
    })
    .then((res) => {
      return {
        data: res.data.projects ?? [],
        error: null,
        status: res.status,
      };
    })
    .catch((err) => {
      console.log(err);
      if (err instanceof AxiosError) {
        return {
          data: [],
          error: {
            message: "Failed to fetch projects",
            data: err.response?.data,
            status: err.response?.status,
          },
          status: err.response?.status ?? 500,
        };
      }
      return {
        data: [],
        error: { message: "Failed to fetch projects", data: err },
        status: 500,
      };
    });
}
