/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
        'localhost',
        '192.168.0.111'
    ]
  }
}

module.exports = nextConfig
