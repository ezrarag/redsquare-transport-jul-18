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
    // Avoid bundling Resend so build succeeds without RESEND_API_KEY
    serverComponentsExternalPackages: ["resend"],
  },
}

export default nextConfig