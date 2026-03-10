import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: "/johnny", destination: "/johnny.html" },
    ];
  },
};

export default nextConfig;
