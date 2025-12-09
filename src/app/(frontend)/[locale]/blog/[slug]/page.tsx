import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'
import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html'

import LocaleSwitcher from '@/components/LocaleSwitcher'
import { createTranslator, type Locale, isValidLocale } from '@/lib/translations'
import { getAbsoluteImageUrl, getBaseUrlFromHeaders } from '@/lib/image-url'
import { getCachedPost, getCachedPostSlugs } from '@/lib/cache'

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
    const post = await getCachedPost(slug, locale)

    if (!post) {
      return {
        title: t('blog.postNotFound'),
      }
    }

    return {
      title: post.title || t('blog.blogPost'),
      description: post.excerpt || undefined,
    }
  } catch (error) {
    // 如果获取元数据失败，返回默认值
    console.error(`Failed to generate metadata for post ${slug}:`, error)
    return {
      title: t('blog.blogPost'),
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
      const slugs = await getCachedPostSlugs(locale)
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

  const _headers = await getHeaders()
  const baseUrl = getBaseUrlFromHeaders(_headers)

  // 使用缓存的查询结果
  let post
  try {
    post = await getCachedPost(slug, locale)
  } catch (error) {
    // 如果查询失败，记录错误并返回 404
    console.error(`Failed to fetch post ${slug} for locale ${locale}:`, error)
    notFound()
  }

  if (!post) {
    notFound()
  }
  const featuredImage =
    typeof post.featuredImage === 'object' && post.featuredImage ? post.featuredImage : null

  return (
    <div className="blog-container">
      <header className="blog-header">
        <div className="blog-header-top">
          <Link href={`/${locale}/blog`} className="back-link">
            ← {t('blog.backToBlog')}
          </Link>
          <LocaleSwitcher currentLocale={locale} />
        </div>
      </header>

      <article className="blog-post">
        <h1>{post.title}</h1>

        <div className="post-header-meta">
          {post.publishedDate && (
            <time dateTime={post.publishedDate}>
              {new Date(post.publishedDate).toLocaleDateString(
                locale === 'zh' ? 'zh-CN' : 'en-US',
                {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                },
              )}
            </time>
          )}
          {typeof post.author === 'object' && post.author && (
            <span className="author">
              {t('blog.author')}:{' '}
              {typeof post.author.email === 'string' ? post.author.email : t('blog.unknown')}
            </span>
          )}
        </div>

        {featuredImage && typeof featuredImage.url === 'string' && (
          <div className="featured-image">
            <Image
              src={getAbsoluteImageUrl(featuredImage.url, baseUrl)}
              alt={featuredImage.alt || post.title || ''}
              width={1200}
              height={600}
              style={{
                objectFit: 'cover',
                width: '100%',
                height: 'auto',
              }}
            />
          </div>
        )}

        {post.excerpt && <p className="post-excerpt-large">{post.excerpt}</p>}

        <div className="post-content-rich">
          {typeof post.content === 'object' && post.content && (
            <div
              dangerouslySetInnerHTML={{
                __html: convertLexicalToHTML({ data: post.content }),
              }}
            />
          )}
        </div>
      </article>
    </div>
  )
}
