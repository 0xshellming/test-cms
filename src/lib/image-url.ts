/**
 * 将相对路径或绝对路径转换为完整的绝对 URL
 * 用于 Next.js Image 组件，确保图片优化器可以正确访问
 */

/**
 * 获取图片的绝对 URL
 * @param url - Payload CMS 返回的图片 URL（可能是相对路径或绝对路径）
 * @param baseUrl - 基础 URL（可选，如果不提供则从环境变量获取）
 * @returns 完整的绝对 URL
 */
export function getAbsoluteImageUrl(url: string | null | undefined, baseUrl?: string): string {
  if (!url) {
    return ''
  }

  // 如果已经是绝对 URL（以 http:// 或 https:// 开头），直接返回
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }

  // 如果是相对路径（以 / 开头），需要添加基础 URL
  if (url.startsWith('/')) {
    const base = baseUrl || process.env.NEXT_PUBLIC_SITE_URL || 'https://app.3min.top'
    // 确保 base 不以 / 结尾，url 以 / 开头
    return `${base.replace(/\/$/, '')}${url}`
  }

  // 其他情况（可能是相对路径但不以 / 开头），也尝试添加基础 URL
  const base = baseUrl || process.env.NEXT_PUBLIC_SITE_URL || 'https://app.3min.top'
  return `${base.replace(/\/$/, '')}/${url}`
}

/**
 * 在服务器端从 headers 获取基础 URL
 * @param headers - Next.js headers 对象
 * @returns 基础 URL（包含协议和域名）
 */
export function getBaseUrlFromHeaders(headers: Headers): string {
  try {
    const forwardedProto = headers.get('x-forwarded-proto')
    const cfVisitor = headers.get('cf-visitor')
    const protocol = forwardedProto || (cfVisitor?.includes('https') ? 'https' : 'https')
    const host = headers.get('host') || headers.get('x-forwarded-host') || 'app.3min.top'
    return `${protocol}://${host}`
  } catch (error) {
    // 如果获取失败，返回默认值
    console.error('Failed to get base URL from headers:', error)
    return 'https://app.3min.top'
  }
}
