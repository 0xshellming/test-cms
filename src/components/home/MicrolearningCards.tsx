'use client'

import { cn } from '@/lib/utils'
import { Sparkles } from 'lucide-react'
import { BookSummaryDrawer } from '../book-summary/book-summary-drawer'
import { BookSummary } from '@/payload-types'

type Props = {
  items: BookSummary[]
}

export function MicrolearningCards({ items }: Props) {
  return (
    <div className="overflow-x-auto -mx-4 px-4">
      <div className="flex gap-4 pb-4">
        {items.map((item) => (
          <BookSummaryDrawer key={item.id} bookSummary={item} locale={'zh'}>
            <div
              className={cn(
                'flex-shrink-0 w-52 h-56 rounded-2xl shadow-lg p-6',
                'flex flex-col justify-between cursor-pointer',
                'hover:shadow-xl transition-all active:scale-[0.98]',
                'relative overflow-hidden',
              )}
            >
              {/* 装饰性背景层 */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/15 to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-tl from-black/10 to-transparent pointer-events-none" />

              {/* 装饰性图案 - 右上角 */}
              <div className="absolute -top-8 -right-8 opacity-10">
                <Sparkles className="h-32 w-32 text-white" />
              </div>

              {/* 装饰性圆形 - 左下角 */}
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-white/10 rounded-full blur-xl" />

              {/* 内容 */}
              <div className="relative z-10 flex flex-col h-full">
                {/* 标题 */}
                <h3 className="font-bold text-xl text-white line-clamp-2 leading-tight text-center mt-4">
                  {item.title}
                </h3>
              </div>

              {/* 底部装饰线 */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
            </div>
          </BookSummaryDrawer>
        ))}
      </div>
    </div>
  )
}
