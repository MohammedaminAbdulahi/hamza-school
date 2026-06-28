import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  // Allow dev requests from the gateway host (removes cross-origin warnings)
  allowedDevOrigins: ["http://21.0.8.48", "http://21.0.8.48:81", "http://21.0.8.48:3000"],
};

export default nextConfig;
