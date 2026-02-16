import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://172.28.15.143:8080/api/:path*",
      },
    ];
  },
};

export default nextConfig;
