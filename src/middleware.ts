import { NextRequest, NextResponse } from 'next/server'
import { locales, defaultLocale } from './lib/translations'

// 匹配语言前缀的正则
const localeRegex = new RegExp(`^/(${locales.join('|')})(/.*)?$`)

// 从 Accept-Language 头中获取首选语言
function getPreferredLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get('accept-language')

  if (!acceptLanguage) {
    return defaultLocale
  }

  // 解析 Accept-Language 头
  // 例如: "zh-CN,zh;q=0.9,en;q=0.8" -> ['zh-CN', 'zh', 'en']
  const languages = acceptLanguage.split(',').map((lang) => {
    const [locale] = lang.split(';')
    return locale.trim().split('-')[0] // 只取主语言代码
  })

  // 查找第一个支持的语言
  for (const lang of languages) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (locales.includes(lang as any)) {
      return lang
    }
  }

  return defaultLocale
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 跳过 API 路由、静态文件、管理后台等
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/admin') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.match(/\.(jpg|jpeg|png|gif|svg|ico|css|js|woff|woff2|ttf|eot)$/)
  ) {
    return NextResponse.next()
  }

  // 检查路径是否已经包含语言前缀
  const hasLocalePrefix = localeRegex.test(pathname)

  if (hasLocalePrefix) {
    // 路径已经包含有效的语言前缀，继续
    return NextResponse.next()
  }

  // 路径没有语言前缀，需要重定向
  const preferredLocale = getPreferredLocale(request)

  // 构建新的 URL
  const newUrl = request.nextUrl.clone()
  newUrl.pathname = `/${preferredLocale}${pathname}`

  return NextResponse.redirect(newUrl)
}

export const config = {
  // 匹配所有路径，除了 API 和静态文件
  matcher: [
    /*
     * 匹配所有请求路径，除了：
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - 其他静态资源文件
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|admin).*)',
  ],
}
