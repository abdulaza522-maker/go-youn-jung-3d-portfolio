import type { NextConfig } from 'next';

const isGhPages = process.env.GITHUB_ACTIONS === 'true';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: isGhPages ? '/go-youn-jung-3d-portfolio' : '',
  assetPrefix: isGhPages ? '/go-youn-jung-3d-portfolio/' : '',
  typescript: { ignoreBuildErrors: true },
  images: { unoptimized: true },
  eslint: { ignoreDuringBuilds: true }
};
export default nextConfig;
