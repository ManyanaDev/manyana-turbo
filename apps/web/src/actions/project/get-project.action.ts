"use server";
import { PAYLOAD_API_URL } from "@repo/shared/src";
import axios from "axios";
import { auth } from "../../auth";
import { AxiosError } from "axios";
import { ApiResponse } from "@repo/shared/types";

export async function getProject(slug?: string): Promise<ApiResponse> {
  const session = await auth();

  return await axios
    .get(`${PAYLOAD_API_URL}/projects/slug/${slug}`, {
      headers: {
        // @ts-ignore
        Authorization: `Bearer ${session?.user?.payload_token}`,
      },
    })
    .then((res) => {
      return { data: res.data, error: null, status: res.status };
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
