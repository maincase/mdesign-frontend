/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',

  ...(!!process.env.COMMIT_SHA || !!process.env.TAG_NAME
    ? {
        generateBuildId: async () => {
          return !!process.env.TAG_NAME ? `${process.env.TAG_NAME}+${process.env.COMMIT_SHA}` : process.env.COMMIT_SHA
        },
      }
    : {}),
  images: {
    domains: ['moderndesign.ai', 'mdesign.ai'],
  },
  distDir: 'build',

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
