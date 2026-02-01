/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    unoptimized: true,
  },

  experimental: {
    missingSuspenseWithCSRBailout: false,
  },

  // Note: Removed "output: export" to support dynamic CMS content from Supabase
}

export default nextConfig
