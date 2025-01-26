import type { NextConfig } from "next";
import CopyPlugin from "copy-webpack-plugin";
import path from "node:path";

const nextConfig: NextConfig = {
  // Enable static export
  output: "export",

  // Custom webpack config
  webpack: config => {
    config.plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, "contents"),
            to: path.resolve(__dirname, "public/posts"),
          },
        ],
      }),
    );

    return config;
  },
};

export default nextConfig;
