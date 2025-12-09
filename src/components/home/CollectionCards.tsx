'use client'

import { cn } from '@/lib/utils'
import { Sparkles } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { type Locale } from '@/lib/translations'

type CollectionItem = {
  id: string
  title: string
  subtitle: string
  icon?: string
  bgColor: string
  textColor?: string
}

type Props = {
  items: CollectionItem[]
}

export function CollectionCards({ items }: Props) {
  const pathname = usePathname()
  const locale = pathname.split('/')[1] as Locale

  return (
    <div className="overflow-x-auto -mx-4 px-4">
      <div className="flex gap-4 pb-4">
        {items.map((item) => (
          <Link key={item.id} href={`/${locale}/book-summary/test`}>
            <div
              className={cn(
                'flex-shrink-0 w-80 h-56 rounded-2xl shadow-lg p-6 flex flex-col justify-between cursor-pointer hover:shadow-xl transition-all active:scale-[0.98] relative overflow-hidden',
                item.bgColor,
              )}
            >
              {/* 装饰性背景元素 */}
              <div className="absolute top-4 right-4 opacity-20">
                <Sparkles className="h-20 w-20" />
              </div>

              <div className="relative z-10">
                <h3
                  className={cn(
                    'text-3xl font-bold leading-tight mb-3',
                    item.textColor || 'text-white',
                  )}
                >
                  {item.title}
                </h3>
                <p className={cn('text-base leading-relaxed', item.textColor || 'text-white/90')}>
                  {item.subtitle}
                </p>
              </div>

              {/* 装饰性图标/插画区域 */}
              <div className="relative z-10 flex items-center justify-center h-24">
                {item.icon && <div className="text-6xl opacity-80">{item.icon}</div>}
                {!item.icon && (
                  <div className="flex gap-2">
                    <div className="w-20 h-20 bg-white/20 rounded-full" />
                    <div className="w-16 h-16 bg-white/30 rounded-full mt-4" />
                  </div>
                )}
              </div>

              {/* 装饰性底部元素 */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
