/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@repo/ui", "@repo/hooks", "@repo/utils", "@repo/types"],
};

export default nextConfig;
