import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import '../styles.css'
import './blog.css'

export const metadata = {
  title: '博客',
  description: '查看所有博客文章',
}

export default async function BlogPage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const posts = await payload.find({
    collection: 'posts',
    where: {
      _status: {
        equals: 'published',
      },
    },
    sort: '-publishedDate',
    limit: 20,
    depth: 2,
    draft: false,
  })

  return (
    <div className="blog-container">
      <header className="blog-header">
        <Link href="/" className="back-link">
          ← 返回首页
        </Link>
        <h1>博客</h1>
      </header>

      {posts.docs.length === 0 ? (
        <div className="empty-state">
          <p>暂无发布的文章</p>
          <Link href="/admin" className="admin-link">
            前往管理后台创建文章
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
                <Link href={`/blog/${post.slug}`} className="post-link">
                  {featuredImage && typeof featuredImage.url === 'string' && (
                    <div className="post-image">
                      <Image
                        src={featuredImage.url}
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
                          {new Date(post.publishedDate).toLocaleDateString('zh-CN', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </time>
                      )}
                      {typeof post.author === 'object' && post.author && (
                        <span className="author">
                          {typeof post.author.email === 'string' ? post.author.email : '未知作者'}
                        </span>
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
