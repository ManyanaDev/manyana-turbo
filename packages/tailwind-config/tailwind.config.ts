import type { Config } from "tailwindcss";
import daisyui from "daisyui";

// We want each package to be responsible for its own content.
const config: Pick<Config, "plugins" | "theme"> = {
  plugins: [daisyui],
  theme: {
    extend: {
      borderWidth: {
        "1": "1px",
      },
    },
  },
};
export default config;
