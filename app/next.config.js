/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  experimental: {
    instrumentationHook: true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos'
      },
      {
        protocol: 'https',
        hostname: 'fastly.picsum.photos'
      }
    ]
  }
}

module.exports = config
