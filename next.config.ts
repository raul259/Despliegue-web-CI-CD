import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', 
  basePath: '/Despliegue-web-CI-CD', 
  images: {
    unoptimized: true, 
  },
};

export default nextConfig;