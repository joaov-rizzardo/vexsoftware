import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.1.17'],
  images: {
    // A Image Optimization API do Next não roda de forma confiável no runtime
    // da Cloudflare (limite de CPU time), então servimos os arquivos de
    // /public já otimizados manualmente, sem transformação em tempo de request.
    unoptimized: true,
  },
};

export default nextConfig;
