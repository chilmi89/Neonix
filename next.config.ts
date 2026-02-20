import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://192.168.18.159:8080/api/:path*",
      },
      {
        source: "/uploads/:path*",
        destination: "http://192.168.18.159:8080/uploads/:path*",
      },
    ];
  },
};

export default nextConfig;
