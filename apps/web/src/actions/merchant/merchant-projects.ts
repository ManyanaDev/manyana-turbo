"use server";
import { urls_config } from "@repo/shared/src";
import axios from "axios";
import { AxiosError } from "axios";
import { ApiResponse } from "@repo/shared/types";
import { auth } from "../../auth";

export async function getMerchantProjects(): Promise<ApiResponse> {
  const session = await auth();

  console.log(session?.user);

  return await axios
    // @ts-ignore
    .get(
      `${urls_config.PAYLOAD_API_URL}/merchants/primary_user/${session?.user?.id}`,
      {
        headers: {
          // @ts-ignore
          Authorization: `Bearer ${session?.user?.payload_token}`,
        },
      }
    )
    .then((res) => {
      console.log("res :>> ", res.data);
      return {
        data: res.data.projects ?? [],
        error: null,
        status: res.status,
      };
    })
    .catch((err) => {
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
