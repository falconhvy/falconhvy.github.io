import type { NextConfig } from "next";
import CopyPlugin from "copy-webpack-plugin";
import path from "node:path";
import { POST_ASSETS_DIR } from "@/utils/constants";

const nextConfig: NextConfig = {
  // Enable static export
  output: "export",

  // https://nextjs.org/docs/pages/api-reference/components/image#unoptimized
  "images.unoptimized": true,

  // Custom webpack config
  webpack: config => {
    config.plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, "contents"),
            to: path.resolve(__dirname, "public", POST_ASSETS_DIR),
          },
        ],
      }),
    );

    return config;
  },
};

export default nextConfig;
