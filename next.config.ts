import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
  output: 'export',
  typescript: { ignoreBuildErrors: true },
  images: { unoptimized: true },
  eslint: { ignoreDuringBuilds: true }
};
export default nextConfig;
