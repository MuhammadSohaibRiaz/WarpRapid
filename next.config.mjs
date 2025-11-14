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
    // Silence build-time CSR bailout rule for useSearchParams on Next 14.x
    missingSuspenseWithCSRBailout: false,
  },
  async redirects() {
    return [
      {
        source: '/portfolio',
        destination: '/case-studies',
        permanent: true,
      },
      {
        source: '/portfolio/:slug',
        destination: '/case-studies/:slug',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
