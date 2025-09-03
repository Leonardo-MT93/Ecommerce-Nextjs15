import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // Aumenta el límite a 10MB para permitir subida de imágenes
    },
  },
};

export default nextConfig;
