import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

import LocaleSwitcher from '@/components/LocaleSwitcher'
import { StaticMarkdown } from '@/components/markdown-renderer/markdown-renderer'
import { getCachedBookSummary, getCachedBookSummarySlugs } from '@/lib/cache'
import { createTranslator, isValidLocale, type Locale } from '@/lib/translations'

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateMetadata(props: Props) {
  const { locale: localeParam, slug } = await props.params

  if (!isValidLocale(localeParam)) {
    return { title: 'Not Found' }
  }

  const locale = localeParam as Locale
  const t = createTranslator(locale)

  try {
    const bookSummary = await getCachedBookSummary(slug, locale)

    if (!bookSummary) {
      return {
        title: t('bookSummary.notFound'),
      }
    }

    return {
      title: bookSummary.title || t('bookSummary.summary'),
      description: bookSummary.desc || undefined,
    }
  } catch (error) {
    // 如果获取元数据失败，返回默认值
    console.error(`Failed to generate metadata for post ${slug}:`, error)
    return {
      title: t('bookSummary.summary'),
    }
  }
}

// 生成所有博客文章的静态参数
// 注意：如果构建时无法获取数据，返回空数组，页面将在运行时通过 ISR 生成
export async function generateStaticParams() {
  const locales: Locale[] = ['zh', 'en']
  const params: Array<{ locale: string; slug: string }> = []

  for (const locale of locales) {
    try {
      const slugs = await getCachedBookSummarySlugs(locale)
      if (slugs.length > 0) {
        for (const slug of slugs) {
          params.push({ locale, slug })
        }
      }
    } catch (error) {
      // 构建时失败不影响运行时，页面将通过 ISR 生成
      console.error(`Failed to generate static params for locale ${locale}:`, error)
    }
  }

  // 如果构建时无法获取任何数据，返回空数组
  // Next.js 会在首次请求时通过 ISR 生成页面
  return params
}

// 启用增量静态再生，每1小时重新生成
export const revalidate = 3600

export default async function BlogPostPage(props: Props) {
  const { locale: localeParam, slug } = await props.params

  // 验证 locale
  if (!isValidLocale(localeParam)) {
    notFound()
  }

  const locale = localeParam as Locale
  const t = createTranslator(locale)

  // 使用环境变量或默认值作为 baseUrl
  // 注意：在静态生成时不能使用 headers，所以使用环境变量
  const _baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://app.3min.top'

  // 使用缓存的查询结果
  let bookSummary
  try {
    bookSummary = await getCachedBookSummary(slug, locale)
  } catch (error) {
    // 如果查询失败，记录错误并返回 404
    console.error(`Failed to fetch post ${slug} for locale ${locale}:`, error)
    notFound()
  }

  if (!bookSummary) {
    notFound()
  }

  // 安全地获取字段值
  const _postTitle = bookSummary.title || t('bookSummary.summary')
  const _featuredImage =
    typeof bookSummary.cover === 'object' && bookSummary.cover ? bookSummary.cover : null

  // try {
  //   if (typeof bookSummary.summary === 'object' && bookSummary.summary) {
  //     contentHtml = convertLexicalToHTML({ data: bookSummary.summary })
  //   }
  // } catch (error) {
  //   console.error(`Failed to convert content for post ${slug}:`, error)
  //   contentHtml = ''
  // }

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link
            href={`/${locale}`}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="font-medium">{t('bookSummary.backToHome')}</span>
          </Link>
          <Suspense fallback={<div style={{ width: '120px', height: '40px' }} />}>
            <LocaleSwitcher currentLocale={locale} />
          </Suspense>
        </div>
      </header>

      <article className="prose prose-lg max-w-none mx-auto px-4">
        {bookSummary.keypoints?.map((keypoint) => (
          <div key={keypoint.index}>
            <h3>
              {keypoint.index}. {keypoint.title}
            </h3>
            <StaticMarkdown content={keypoint.content} />
          </div>
        ))}

        {bookSummary.faq?.length && (
          <div>
            <h3>FAQ</h3>
            {
              bookSummary.faq.map((faq) => (
                <div key={faq.index}>
                  <h4>{faq.title}</h4>
                  <StaticMarkdown content={faq.content} />
                </div>
              ))
            }
          </div>
        )}
      </article>
    </div>
  )
}
