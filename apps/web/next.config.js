/** @type {import('next').NextConfig} */
const DASHBOARD_URL = process.env.DASHBOARD_URL ?? "http://localhost:3001";
const TRANSACTIONS_URL = process.env.TRANSACTIONS_URL ?? "http://localhost:3002";

const nextConfig = {
  allowedDevOrigins: [
    "192.168.125.130:3000",
    "localhost:3000",
    "192.168.245.130:3000",
    "192.168.40.130:3000",
    "192.168.15.3:3000",
  ],
  async rewrites() {
    return [
      {
        source: "/dashboard",
        destination: `${DASHBOARD_URL}/dashboard`,
      },
      {
        source: "/dashboard/:path*",
        destination: `${DASHBOARD_URL}/dashboard/:path*`,
      },
      {
        source: "/transactions",
        destination: `${TRANSACTIONS_URL}/transactions`,
      },
      {
        source: "/transactions/:path*",
        destination: `${TRANSACTIONS_URL}/transactions/:path*`,
      },
    ];
  },
  experimental: {
    turbopack: {
      root: "../../",
    },
  },
};

export default nextConfig;
