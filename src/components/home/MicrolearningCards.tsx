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
              'flex-shrink-0 w-48 h-32 rounded-lg shadow-sm border border-gray-200 p-4 flex flex-col justify-between',
              item.color,
            )}
          >
            {item.icon && <div className="text-3xl mb-2">{item.icon}</div>}
            {item.tags && (
              <div className="flex flex-wrap gap-1 mb-2">
                {item.tags.map((tag, idx) => (
                  <span key={idx} className="text-xs bg-white/50 px-2 py-0.5 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <h3 className="font-semibold text-sm line-clamp-2">{item.title}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}
