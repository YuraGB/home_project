import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: "standalone",
  experimental: {
    reactCompiler: true,
    // ppr: "incremental",
  },
  trailingSlash: false,
  transpilePackages: ["three"],
};

export default nextConfig;
