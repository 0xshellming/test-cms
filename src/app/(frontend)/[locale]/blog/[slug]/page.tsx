import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import React from 'react'
import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html'

import config from '@/payload.config'
import LocaleSwitcher from '@/components/LocaleSwitcher'
import { createTranslator, type Locale, isValidLocale } from '@/lib/translations'
import { getAbsoluteImageUrl, getBaseUrlFromHeaders } from '@/lib/image-url'

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

  const _headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

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
    depth: 2,
    draft: false,
    locale: locale,
  })

  if (posts.docs.length === 0) {
    return {
      title: t('blog.postNotFound'),
    }
  }

  const post = posts.docs[0]

  return {
    title: post.title || t('blog.blogPost'),
    description: post.excerpt || undefined,
  }
}

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
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

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
    depth: 2,
    draft: false,
    locale: locale,
  })

  if (posts.docs.length === 0) {
    notFound()
  }

  const post = posts.docs[0]
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
