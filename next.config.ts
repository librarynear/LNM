import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images:{
    domains: ['bbitvowiiqynqkdeuujc.supabase.co'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hebbkx1anhila5yf.public.blob.vercel-storage.com',
        pathname: '/**',
      },
    ],
  }
};

export default nextConfig;
