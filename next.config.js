/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
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
