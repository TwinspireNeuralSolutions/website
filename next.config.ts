import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  serverExternalPackages: ['@google-cloud/storage'],
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: '**.googleapis.com' },
      { protocol: 'https', hostname: '**.firebaseapp.com' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'https', hostname: '**.apple.com' },
    ],
  },
  compress: true,
  // Firebase App Hosting's buildpack serves the standalone bundle directly, so
  // it needs one. Vercel has its own optimized output and conflicts with
  // standalone mode (ENOENT on .next/next-server.js.nft.json). Vercel sets the
  // VERCEL env var during its builds; App Hosting does not.
  ...(process.env.VERCEL ? {} : { output: 'standalone' as const }),
  async redirects() {
    return [
      // App Hosting gives every backend a *.hosted.app address. It stays
      // reachable after a custom domain is attached, which would leave a
      // second indexable copy of the site. Send it to the real one.
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value:
              'website--twinspire-neural-solutions.europe-west4.hosted.app',
          },
        ],
        destination: 'https://www.twinspire.ai/:path*',
        permanent: true,
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ]
  },
}

export default nextConfig
