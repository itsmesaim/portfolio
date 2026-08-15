/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["three"],
  reactStrictMode: false,
  poweredByHeader: false,
  compress: true,
};

module.exports = nextConfig;
