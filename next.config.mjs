/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",

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

  // ❌ Removed redirects (static export does not support them)
}

export default nextConfig
