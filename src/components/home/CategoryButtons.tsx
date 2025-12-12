'use client'

import { cn } from '@/lib/utils'
import { Topic } from '@/payload-types'

import Link from 'next/link'
import { Locale } from '@/lib/translations'

type Props = {
  items: Topic[]
  locale: Locale
}

export function CategoryButtons({ items, locale }: Props) {
  return (
    <div className="overflow-x-auto -mx-4 px-4">
      <div className="flex gap-3 pb-4">
        {items.map((item) => (
          <Link
            key={item.id}
            href={`/${locale}/topic/${item.slug}`}
            style={{
              backgroundColor: item.backgroundColor || '#f3f4f6',
            }}  
            className={cn(
              'flex items-center gap-2 px-5 py-3 rounded-full border-2 border-gray-200 flex-shrink-0 hover:shadow-md hover:border-blue-300 transition-all active:scale-95',
            )}
          >
            <span className="text-2xl">{item.icon}</span>
            <span className="font-semibold text-sm whitespace-nowrap text-gray-900">
              {item.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
