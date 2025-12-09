import Image from 'next/image'
import Link from 'next/link'
import React, { Suspense } from 'react'

import { Tag } from '@/payload-types'
import LocaleSwitcher from '@/components/LocaleSwitcher'
import { createTranslator, type Locale, isValidLocale } from '@/lib/translations'
import { getAbsoluteImageUrl } from '@/lib/image-url'
import { notFound } from 'next/navigation'
import { getCachedPosts } from '@/lib/cache'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata(props: Props) {
  const { locale: localeParam } = await props.params
  const locale = isValidLocale(localeParam) ? localeParam : 'zh'
  const t = createTranslator(locale)

  return {
    title: t('blog.title'),
    description: t('blog.description'),
  }
}

// 生成静态参数
export async function generateStaticParams() {
  return [{ locale: 'zh' }, { locale: 'en' }]
}

// 启用增量静态再生，每1小时重新生成
export const revalidate = 3600

export default async function BlogPage(props: Props) {
  const { locale: localeParam } = await props.params

  // 验证 locale
  if (!isValidLocale(localeParam)) {
    notFound()
  }

  const locale = localeParam as Locale
  const t = createTranslator(locale)

  // 使用环境变量或默认值作为 baseUrl
  // 注意：在静态生成时不能使用 headers，所以使用环境变量
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://app.3min.top'

  // 使用缓存的查询结果
  let posts
  try {
    posts = await getCachedPosts(locale, 20)
  } catch (error) {
    // 如果查询失败，记录错误并显示空状态
    console.error(`Failed to fetch posts for locale ${locale}:`, error)
    posts = { docs: [] }
  }

  return (
    <div className="blog-container">
      <header className="blog-header">
        <div className="blog-header-top">
          <Link href={`/${locale}`} className="back-link">
            ← {t('blog.backToHome')}
          </Link>
          <Suspense fallback={<div style={{ width: '120px', height: '40px' }} />}>
            <LocaleSwitcher currentLocale={locale} />
          </Suspense>
        </div>
        <h1>{t('blog.title')}</h1>
      </header>

      {posts.docs.length === 0 ? (
        <div className="empty-state">
          <p>{t('blog.noArticles')}</p>
          <Link href="/admin" className="admin-link">
            {t('blog.goToAdmin')}
          </Link>
        </div>
      ) : (
        <div className="posts-grid">
          {posts.docs.map((post) => {
            const featuredImage =
              typeof post.featuredImage === 'object' && post.featuredImage
                ? post.featuredImage
                : null

            return (
              <article key={post.id} className="post-card">
                <Link href={`/${locale}/blog/${post.slug}`} className="post-link">
                  {featuredImage && typeof featuredImage.url === 'string' && (
                    <div className="post-image" data-url={featuredImage.url || '-'}>
                      <Image
                        src={getAbsoluteImageUrl(featuredImage.url, baseUrl)}
                        alt={featuredImage.alt || post.title || ''}
                        width={400}
                        height={250}
                        style={{
                          objectFit: 'cover',
                          width: '100%',
                          height: 'auto',
                        }}
                      />
                    </div>
                  )}
                  <div className="post-content">
                    <h2>{post.title}</h2>
                    {post.excerpt && <p className="post-excerpt">{post.excerpt}</p>}
                    <div className="post-meta">
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
                          {typeof post.author.email === 'string'
                            ? post.author.email
                            : t('blog.unknown')}
                        </span>
                      )}
                      {post.tags?.map((tag: number | Tag) =>
                        typeof tag === 'object' ? (
                          <span key={tag.id} className="tag" data-id={tag.id}>
                            {tag.name}
                          </span>
                        ) : (
                          <span key={tag} className="tag" data-id={tag}>
                            {tag}
                          </span>
                        ),
                      )}
                    </div>
                  </div>
                </Link>
              </article>
            )
          })}
        </div>
      )}
    </div>
  )
}
