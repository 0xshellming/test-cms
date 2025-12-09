'use client'

import { Bookmark } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type BookItem = {
  id: string
  title: string
  description: string
  author: string
  coverColor: string
  coverIcon: string
}

type Props = {
  items: BookItem[]
}

export function BookRecommendations({ items }: Props) {
  return (
    <div className="overflow-x-auto -mx-4 px-4">
      <div className="flex gap-4 pb-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex-shrink-0 w-64 bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-all cursor-pointer active:scale-[0.98]"
          >
            {/* 书封 */}
            <div className={cn(item.coverColor, 'h-52 flex items-center justify-center relative')}>
              <span className="text-7xl">{item.coverIcon}</span>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-3 right-3 bg-white/90 hover:bg-white rounded-full h-9 w-9 shadow-sm"
              >
                <Bookmark className="h-5 w-5 text-gray-700" />
              </Button>
            </div>

            {/* 内容 */}
            <div className="p-5">
              <h3 className="font-bold text-lg mb-2 line-clamp-2 text-gray-900">{item.title}</h3>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2 leading-relaxed">
                {item.description}
              </p>
              <p className="text-xs text-gray-500 font-medium">{item.author}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
