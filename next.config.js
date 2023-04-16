let commitHash
// let tag
let branch

try {
  commitHash = require('child_process').execSync('git rev-parse HEAD').toString().trim()
} catch {
  console.log('Error:', 'git rev-parse HEAD:', "Can't get commit hash")
  process.exit()
}

// try {
//   tag = require('child_process').execSync('git describe --tags').toString().trim()
// } catch {
//   console.log('Error:', 'git describe --tags:', "Can't get tag")
//   process.exit()
// }

try {
  branch = require('child_process').execSync('git rev-parse --abbrev-ref HEAD').toString().trim()
} catch {
  console.log('Error:', 'git rev-parse --abbrev-ref HEAD:', "Can't get branch name")
  process.exit()
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',

  generateBuildId: async () => {
    return commitHash
  },

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
