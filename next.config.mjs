/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  // Enable CSS processing
  cssModules: false,
  // Ensure proper asset handling
  assetPrefix: undefined,
  // Enable SWC compiler for better performance
  swcMinify: true,
};

export default nextConfig;
