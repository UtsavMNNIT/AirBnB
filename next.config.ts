import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  images: {
    // Photos are bundled locally under /public; no remote loader needed.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
