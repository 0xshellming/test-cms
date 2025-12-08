import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import React from 'react'
import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html'

import config from '@/payload.config'
import '../../styles.css'
import '../blog.css'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata(props: Props) {
  const { slug } = await props.params
  const headers = await getHeaders()
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
  })

  if (posts.docs.length === 0) {
    return {
      title: '文章未找到',
    }
  }

  const post = posts.docs[0]

  return {
    title: post.title || '博客文章',
    description: post.excerpt || undefined,
  }
}

export default async function BlogPostPage(props: Props) {
  const { slug } = await props.params
  const headers = await getHeaders()
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
        <Link href="/blog" className="back-link">
          ← 返回博客列表
        </Link>
      </header>

      <article className="blog-post">
        <h1>{post.title}</h1>

        <div className="post-header-meta">
          {post.publishedDate && (
            <time dateTime={post.publishedDate}>
              {new Date(post.publishedDate).toLocaleDateString('zh-CN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          )}
          {typeof post.author === 'object' && post.author && (
            <span className="author">
              作者: {typeof post.author.email === 'string' ? post.author.email : '未知作者'}
            </span>
          )}
        </div>

        {featuredImage && typeof featuredImage.url === 'string' && (
          <div className="featured-image">
            <Image
              src={featuredImage.url}
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
