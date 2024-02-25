/** @type {import('next').NextConfig} */
// const dns = require('dns')
// dns.setDefaultResultOrder('ipv4first')
const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: false,
  output: 'standalone',

  ...(!!process.env.COMMIT_SHA || !!process.env.TAG_NAME
    ? {
        generateBuildId: async () => {
          return !!process.env.TAG_NAME ? `${process.env.TAG_NAME}+${process.env.COMMIT_SHA}` : process.env.COMMIT_SHA
        },
      }
    : {}),
  webpack: (config) => {
    config.experiments = {
      topLevelAwait: true,
      layers: true,
    }

    return config
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.moderndesign.ai',
        pathname: '/interiors/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.mdesign.ai',
        pathname: '/interiors/**',
      },
    ],
    // unoptimized: true,
  },
  /* distDir: 'build', */
}

module.exports = nextConfig
