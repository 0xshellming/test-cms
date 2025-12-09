import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
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
        protocol: 'https',
        hostname: 'app.3min.top',
        pathname: '/api/media/**',
      },
      {
        protocol: 'http',
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
