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
            className="flex-shrink-0 w-64 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
          >
            {/* 书封 */}
            <div className={cn(item.coverColor, 'h-48 flex items-center justify-center relative')}>
              <span className="text-6xl">{item.coverIcon}</span>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full h-8 w-8"
              >
                <Bookmark className="h-4 w-4" />
              </Button>
            </div>

            {/* 内容 */}
            <div className="p-4">
              <h3 className="font-bold text-lg mb-1 line-clamp-2">{item.title}</h3>
              <p className="text-sm text-gray-600 mb-2 line-clamp-2">{item.description}</p>
              <p className="text-xs text-gray-500">{item.author}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
