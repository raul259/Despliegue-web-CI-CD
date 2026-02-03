import type { NextConfig } from "next";

const isGithub = process.env.DEPLOY_TARGET === "github";
const repo = "ejercicio-alumnos";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  ...(isGithub
    ? { basePath: `/${repo}`, assetPrefix: `/${repo}/` }
    : {}),
};

export default nextConfig;