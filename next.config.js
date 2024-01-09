/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'logopng.com.br',
        pathname: '**',
      },
    ],
  },
}

module.exports = nextConfig
