import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.join(__dirname, "../../.env"),
});

export const urls_config = {
  PAYLOAD_API_URL: process.env.PAYLOAD_API_URL,
};
