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

  // Only use static export for production builds.
  // In dev mode, we need dynamic routing to support new AI-generated blog slugs.
  ...(process.env.NODE_ENV === "production" ? { output: "export" } : {}),
}

export default nextConfig
