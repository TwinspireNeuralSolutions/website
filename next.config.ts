/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable the App Router
  experimental: {
    appDir: true,
  },
  // Ensure proper module resolution
  webpack: (config: any) => {
    config.resolve.fallback = { fs: false, path: false }
    return config
  },
}

module.exports = nextConfig
