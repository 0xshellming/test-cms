'use client'

import { cn } from '@/lib/utils'

type MicrolearningItem = {
  id: string
  title: string
  icon?: string
  tags?: string[]
  color: string
}

type Props = {
  items: MicrolearningItem[]
}

export function MicrolearningCards({ items }: Props) {
  return (
    <div className="overflow-x-auto -mx-4 px-4">
      <div className="flex gap-4 pb-4">
        {items.map((item) => (
          <div
            key={item.id}
            className={cn(
              'flex-shrink-0 w-48 h-36 rounded-2xl shadow-md border border-gray-200 p-5 flex flex-col justify-between cursor-pointer hover:shadow-lg transition-all active:scale-[0.98] relative overflow-hidden',
              item.color,
            )}
          >
            {/* 装饰性背景 */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />

            <div className="relative z-10 flex flex-col h-full">
              {item.icon && <div className="text-4xl mb-2">{item.icon}</div>}
              {item.tags && (
                <div className="flex flex-wrap gap-1 mb-2">
                  {item.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-white/70 backdrop-blur-sm px-2 py-1 rounded-md font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <h3 className="font-bold text-sm line-clamp-2 text-gray-900 mt-auto">{item.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
