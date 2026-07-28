import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.1.17'],
  images: {
    // AVIF primeiro: ~30% menor que WebP na imagem de LCP do hero.
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
