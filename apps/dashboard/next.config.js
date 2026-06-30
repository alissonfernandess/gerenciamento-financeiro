/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/dashboard",
  assetPrefix: "/dashboard",
  allowedDevOrigins: [
    "localhost:3000",
    "localhost:3001",
    "192.168.125.130:3000",
    "192.168.245.130:3000",
    "192.168.40.130:3000",
    "192.168.15.3:3000",
  ],
  experimental: {
    turbopack: {
      root: "../../",
    },
  },
};

export default nextConfig;
