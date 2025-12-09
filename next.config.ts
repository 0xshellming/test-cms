import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Your Next.js config here
  eslint: {
    // 在构建时运行 ESLint
    ignoreDuringBuilds: false,
  },
  typescript: {
    // 在构建时进行类型检查
    ignoreBuildErrors: false,
  },
  images: {
    // 配置图片优化
    remotePatterns: [
      {
        protocol: 'https' as const,
        hostname: 'app.3min.top',
        pathname: '/api/media/**',
      },
      {
        protocol: 'http' as const,
        hostname: 'localhost',
        pathname: '/api/media/**',
      },
    ],
  },
  webpack: (webpackConfig: any) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
