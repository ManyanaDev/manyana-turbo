"use server";

import { urls_config } from "@repo/shared/src";
import axios from "axios";
import { AxiosError } from "axios";
import { ApiResponse } from "@repo/shared/types";

export async function getProjects(): Promise<ApiResponse> {
  // const session = await auth();
  // console.log("session?.user :>> ", session?.user);

  return await axios
    .get(`${urls_config.PAYLOAD_API_URL}/projects`, {
      headers: {
        // @ts-ignore
        // Authorization: `Bearer ${session?.user?.payload_token}`,
      },
    })
    .then((res) => {
      return { data: res.data?.docs ?? [], error: null, status: res.status };
    })
    .catch((err) => {
      console.error(err);
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
