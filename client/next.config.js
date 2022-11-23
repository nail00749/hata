/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'localhost',
      '192.168.0.111',
      '26.121.11.165',
    ],
  },
};

module.exports = nextConfig;
