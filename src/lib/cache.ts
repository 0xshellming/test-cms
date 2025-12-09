import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import config from '@/payload.config'
import type { Locale } from '@/lib/translations'

/**
 * 缓存 Payload 查询结果
 * 使用 Next.js 的 unstable_cache 来缓存数据，减少数据库查询
 */
export async function getCachedPayload() {
  const payloadConfig = await config
  return await getPayload({ config: payloadConfig })
}

/**
 * 获取缓存的博客文章列表
 * 缓存时间：1小时（3600秒）
 */
export async function getCachedPosts(locale: Locale, limit = 20) {
  const payload = await getCachedPayload()

  return unstable_cache(
    async () => {
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
    },
    [`posts-${locale}-${limit}`], // 缓存键
    {
      revalidate: 3600, // 1小时重新验证
      tags: [`posts-${locale}`], // 标签用于按需重新验证
    },
  )()
}

/**
 * 获取缓存的博客文章详情
 * 缓存时间：1小时（3600秒）
 */
export async function getCachedPost(slug: string, locale: Locale) {
  const payload = await getCachedPayload()

  return unstable_cache(
    async () => {
      const posts = await payload.find({
        collection: 'posts',
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

      return posts.docs[0] || null
    },
    [`post-${slug}-${locale}`], // 缓存键
    {
      revalidate: 3600, // 1小时重新验证
      tags: [`post-${slug}-${locale}`, `posts-${locale}`], // 标签用于按需重新验证
    },
  )()
}

/**
 * 获取所有已发布的博客文章 slug（用于静态生成）
 * 缓存时间：1小时（3600秒）
 */
export async function getCachedPostSlugs(locale: Locale) {
  const payload = await getCachedPayload()

  return unstable_cache(
    async () => {
      const posts = await payload.find({
        collection: 'posts',
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

      return posts.docs
        .map((post) => post.slug)
        .filter((slug): slug is string => typeof slug === 'string')
    },
    [`post-slugs-${locale}`], // 缓存键
    {
      revalidate: 3600, // 1小时重新验证
      tags: [`posts-${locale}`], // 标签用于按需重新验证
    },
  )()
}
