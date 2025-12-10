'use client'

import { type Locale } from '@/lib/translations'
import { cn } from '@/lib/utils'
import { Sparkles, Bookmark } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type BookItem = {
  id: string
  locale: string
  slug: string
  title: string
  description: string
  author: string
  coverColor: string
  coverIcon: string
  coverUrl: string
}

type Props = {
  items: BookItem[]
}

export function BookRecommendations({ items }: Props) {
  const pathname = usePathname()
  const locale = pathname.split('/')[1] as Locale

  return (
    <div className="overflow-x-auto -mx-4 px-4">
      <div className="flex gap-4 pb-4">
        {items.map((item) => (
          <Link key={item.id} href={`/${item.locale}/book-summary/${item.slug}`}>
            {item.coverUrl ? (
              <div
                className={cn(
                  'flex-shrink-0 w-40 rounded-2xl shadow-lg',
                  'flex flex-col cursor-pointer',
                  'hover:shadow-xl transition-all active:scale-[0.98]',
                  'relative overflow-hidden',
                )}
              >
                <Image
                  className="w-full h-full object-cover"
                  src={item.coverUrl}
                  alt={item.title}
                  width={100}
                  height={100}
                />
              </div>
            ) : (
              <BookRecommendationItem item={item} />
            )}
          </Link>
        ))}
      </div>
    </div>
  )
}

function BookRecommendationItem({ item }: { item: BookItem }) {
  return (
    <div
      className={cn(
        'flex-shrink-0 w-56 h-72 rounded-2xl shadow-lg p-6',
        'flex flex-col cursor-pointer',
        'hover:shadow-xl transition-all active:scale-[0.98]',
        'relative overflow-hidden',
        item.coverColor,
      )}
    >
      {/* 装饰性背景 */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
      <div className="absolute top-4 right-4 opacity-10">
        <Sparkles className="h-20 w-20 text-white" />
      </div>

      {/* 书签按钮 */}
      <button className="absolute top-4 right-4 z-20 bg-white/20 backdrop-blur-md hover:bg-white/30 rounded-full h-9 w-9 flex items-center justify-center transition-all">
        <Bookmark className="h-5 w-5 text-white" />
      </button>

      {/* 内容 */}
      <div className="relative z-10 flex flex-col h-full">
        {/* 图标/封面 */}
        <div className="text-7xl mb-4 flex items-center justify-center h-24">{item.coverIcon}</div>

        {/* 文字内容 */}
        <div className="mt-auto">
          <h3 className="text-xl font-bold text-white line-clamp-2 mb-3 leading-tight">
            {item.title}
          </h3>
          <p className="text-sm text-white/90 line-clamp-2 mb-3 leading-relaxed">
            {item.description}
          </p>
          <p className="text-xs text-white/80 font-medium">{item.author}</p>
        </div>
      </div>

      {/* 底部装饰线 */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
    </div>
  )
}
