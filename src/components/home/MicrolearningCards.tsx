'use client'

import { cn } from '@/lib/utils'
import { Sparkles } from 'lucide-react'

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
              'flex-shrink-0 w-52 h-56 rounded-2xl shadow-lg p-6',
              'flex flex-col justify-between cursor-pointer',
              'hover:shadow-xl transition-all active:scale-[0.98]',
              'relative overflow-hidden',
              item.color,
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
              {/* 标签 */}
              {item.tags && (
                <div className="flex flex-wrap gap-1 mb-4">
                  {item.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-md font-bold text-gray-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* 图标 - 居中显示 */}
              {item.icon && (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-7xl transform hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                </div>
              )}

              {/* 标题 */}
              <h3 className="font-bold text-xl text-white line-clamp-2 leading-tight text-center mt-4">
                {item.title}
              </h3>
            </div>

            {/* 底部装饰线 */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
          </div>
        ))}
      </div>
    </div>
  )
}
