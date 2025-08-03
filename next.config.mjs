/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/unleash/:path*',
        destination: 'https://api.unleashnfts.com/:path*', // Proxy to external API
      },
    ];
  },
};

export default nextConfig;
