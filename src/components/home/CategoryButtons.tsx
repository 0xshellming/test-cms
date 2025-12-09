'use client'

import { cn } from '@/lib/utils'

type CategoryItem = {
  id: string
  name: string
  icon: string
  color: string
}

type Props = {
  items: CategoryItem[]
}

export function CategoryButtons({ items }: Props) {
  return (
    <div className="overflow-x-auto -mx-4 px-4">
      <div className="flex gap-3 pb-4">
        {items.map((item) => (
          <button
            key={item.id}
            className={cn(
              'flex items-center gap-2 px-5 py-3 rounded-full border-2 border-gray-200 flex-shrink-0 hover:shadow-md hover:border-blue-300 transition-all active:scale-95',
              item.color,
            )}
          >
            <span className="text-2xl">{item.icon}</span>
            <span className="font-semibold text-sm whitespace-nowrap text-gray-900">
              {item.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
