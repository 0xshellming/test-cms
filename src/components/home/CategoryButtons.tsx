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
              'flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 flex-shrink-0 hover:shadow-md transition-shadow',
              item.color,
            )}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-medium text-sm whitespace-nowrap">{item.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
