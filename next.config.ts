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
    // 优化图片加载性能
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 3600, // 图片缓存1小时
  },
  // 优化缓存策略
  experimental: {
    // 启用优化的包导入
    optimizePackageImports: ['@payloadcms/richtext-lexical'],
  },
  // 压缩配置
  compress: true,
  // 注意：swcMinify 在 Next.js 15 中已废弃，默认启用
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
