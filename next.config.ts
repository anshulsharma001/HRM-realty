import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // AVIF first, WebP fallback (§4.4).
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
