import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: false,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://10.247.170.130:8080/api/:path*",
      },
      {
        source: "/uploads/:path*",
        destination: "http://10.247.170.130:8080/uploads/:path*",
      },
    ];
  },
};

export default nextConfig;
