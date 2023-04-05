/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'actionaidrecycling.org.uk',
        port: '',
        pathname: '/wp-content/uploads/**/*',
      },
    ],
  },
}

module.exports = nextConfig
