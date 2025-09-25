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
  // Ensure proper handling of dynamic routes
  experimental: {
    serverComponentsExternalPackages: ['mongoose', 'bcrypt', 'nodemailer'],
  },
}

export default nextConfig
