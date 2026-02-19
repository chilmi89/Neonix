import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://192.168.100.62:8080/api/:path*",
      },
    ];
  },
};

export default nextConfig;
