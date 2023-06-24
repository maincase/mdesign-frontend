/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
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
    }

    return config
  },
  images: {
    domains: ['moderndesign.ai', 'mdesign.ai'],
  },
  /* distDir: 'build', */

  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: 'https',
  //       hostname: 'actionaidrecycling.org.uk',
  //       port: '',
  //       pathname: '/wp-content/uploads/**/*',
  //     },
  //   ],
  // },
}

module.exports = nextConfig
