import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/tmc",
        destination: "https://sugoai.com/tmc",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
