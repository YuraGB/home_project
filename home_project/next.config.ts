import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    experimental: {
        reactCompiler: true,

    },
    trailingSlash: false,
};

export default nextConfig;
