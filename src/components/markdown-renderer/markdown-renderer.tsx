// src/components/MarkdownRenderer.tsx
'use client'

import { Streamdown } from 'streamdown'
import { Suspense } from 'react'

// 用于 SSR 的静态模式
export function StaticMarkdown({ content }: { content: string }) {
  return (
    <div>
      <Streamdown mode="static">{content}</Streamdown>
    </div>
  )
}

// 用于流式渲染
export function StreamingMarkdown({ content }: { content: string }) {
  return (
    <Suspense fallback={<div>加载中...</div>}>
      <Streamdown>{content}</Streamdown>
    </Suspense>
  )
}
