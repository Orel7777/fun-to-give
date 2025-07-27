import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Remove custom font loading to fix the error
  images: {
    domains: [],
  },
};

export default nextConfig;
