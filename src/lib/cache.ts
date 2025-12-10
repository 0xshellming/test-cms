import { getPayload } from 'payload'
import config from '@/payload.config'
import type { Locale } from '@/lib/translations'

/**
 * 获取 Payload 实例
 * 注意：在 Cloudflare Workers 环境中，不使用 unstable_cache
 * 依赖 Next.js 的 ISR (revalidate) 来缓存页面
 */
export async function getCachedPayload() {
  const payloadConfig = await config
  return await getPayload({ config: payloadConfig })
}

/**
 * 获取博客文章列表
 * 注意：在 Cloudflare Workers 环境中，直接查询数据库
 * 页面级别的缓存通过 Next.js ISR (revalidate) 实现
 */
export async function getCachedPosts(locale: Locale, limit = 20) {
  try {
    const payload = await getCachedPayload()

    return await payload.find({
      collection: 'posts',
      where: {
        _status: {
          equals: 'published',
        },
      },
      sort: '-publishedDate',
      limit,
      depth: 1, // 减少 depth 以提高性能
      draft: false,
      locale,
    })
  } catch (error) {
    // 记录错误并重新抛出，让调用者处理
    console.error(`Error fetching posts for locale ${locale}:`, error)
    throw error
  }
}

/**
 * 获取博客文章详情
 * 注意：在 Cloudflare Workers 环境中，直接查询数据库
 * 页面级别的缓存通过 Next.js ISR (revalidate) 实现
 */
export async function getCachedBookSummary(slug: string, locale: Locale) {
  try {
    const payload = await getCachedPayload()

    const bookSummaries = await payload.find({
      collection: 'book-summaries',
      where: {
        and: [
          {
            slug: {
              equals: slug,
            },
          },
          {
            _status: {
              equals: 'published',
            },
          },
        ],
      },
      limit: 1,
      depth: 2, // 详情页需要更多关联数据
      draft: false,
      locale,
    })

    return bookSummaries.docs[0] || null
  } catch (error) {
    // 记录错误并重新抛出，让调用者处理
    console.error(`Error fetching post ${slug} for locale ${locale}:`, error)
    throw error
  }
}

/**
 * 获取所有已发布的博客文章 slug（用于静态生成）
 * 注意：在构建时调用，如果失败则返回空数组，让页面在运行时生成
 */
export async function getCachedBookSummarySlugs(locale: Locale) {
  try {
    const payload = await getCachedPayload()

    const bookSummaries = await payload.find({
      collection: 'book-summaries',
      where: {
        _status: {
          equals: 'published',
        },
      },
      select: {
        slug: true,
      },
      limit: 1000, // 假设最多1000篇文章
      depth: 0, // 不需要关联数据
      draft: false,
      locale,
    })

    return bookSummaries.docs
      .map((bookSummary) => bookSummary.slug)
      .filter((slug): slug is string => typeof slug === 'string')
  } catch (error) {
    // 在构建时如果无法获取数据，返回空数组
    // 页面将在运行时通过 ISR 生成
    console.error(`Failed to get post slugs for locale ${locale}:`, error)
    return []
  }
}
