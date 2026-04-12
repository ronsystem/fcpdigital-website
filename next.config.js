/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'ora.fcpdigital.net' }],
        destination: 'https://ai.fcpdigital.net/ora-demo',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
