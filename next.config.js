/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nextjs13-ecommerce.s3.amazonaws.com',
        port: '',
        // pathname: '/account123/**',
      },
    ],
  },

  compiler: {
    styledComponents: true
  }
}

module.exports = nextConfig
