'use client'

import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerFooter,
} from '@/components/ui/drawer'
import { cn } from '@/lib/utils'
import { BookOpen, Headphones, X } from 'lucide-react'
import { useState } from 'react'

type CardData = {
  id: string
  title: string
  subtitle?: string
  description: string
  icon?: string
  color: string
  tags?: string[]
  // 浮窗内容
  drawerTitle: string
  drawerDescription: string
  drawerContent: {
    section?: string
    items: string[]
  }[]
  aboutText?: string
  categories?: { name: string; icon: string }[]
}

type Props = {
  card: CardData
  locale?: string
}

export function CardWithDrawer({ card, locale = 'en' }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <Drawer open={open} onOpenChange={setOpen} shouldScaleBackground={true}>
      <DrawerTrigger asChild>
        <div
          className={cn(
            'flex-shrink-0 w-48 h-40 rounded-2xl shadow-md p-5 flex flex-col justify-between cursor-pointer transition-all hover:shadow-lg active:scale-[0.97] relative overflow-hidden',
            card.color,
          )}
        >
          {/* 装饰性背景 */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />

          {/* 内容 */}
          <div className="relative z-10 flex flex-col h-full">
            {card.icon && <div className="text-4xl mb-3">{card.icon}</div>}
            {card.tags && (
              <div className="flex flex-wrap gap-1 mb-2">
                {card.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-white/70 backdrop-blur-sm px-2 py-1 rounded-md font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <div className="mt-auto">
              {card.subtitle && (
                <p className="text-xs font-semibold text-gray-700 mb-1 uppercase tracking-wide">
                  {card.subtitle}
                </p>
              )}
              <h3 className="font-bold text-base line-clamp-2 text-gray-900">{card.title}</h3>
            </div>
          </div>
        </div>
      </DrawerTrigger>
      <DrawerContent className="max-h-[95vh] rounded-t-3xl">
        <div className="mx-auto w-full max-w-md">
          {/* 拖拽指示器 */}
          <div className="mx-auto mt-4 h-1.5 w-16 rounded-full bg-gray-300" />

          <DrawerHeader className="text-left px-6 pt-6 pb-4">
            <DrawerTitle className="text-2xl font-bold pr-8">{card.drawerTitle}</DrawerTitle>
            <DrawerDescription className="text-base text-gray-600 mt-2">
              {card.drawerDescription}
            </DrawerDescription>
          </DrawerHeader>

          {/* 可滚动内容区域 */}
          <div className="max-h-[55vh] overflow-y-auto px-6 pb-4">
            <div className="space-y-6">
              {/* 内容部分 */}
              {card.drawerContent.map((section, idx) => (
                <div key={idx} className="space-y-3">
                  {section.section && (
                    <h4 className="font-bold text-lg text-gray-900">{section.section}</h4>
                  )}
                  <ul className="space-y-3">
                    {section.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-3 text-sm leading-relaxed">
                        <span className="text-blue-600 mt-1 font-bold text-lg">•</span>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* About 部分 */}
              {card.aboutText && (
                <div className="space-y-3 pt-4 border-t border-gray-200">
                  <h4 className="font-bold text-lg text-gray-900">About this gem</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{card.aboutText}</p>
                </div>
              )}

              {/* 分类探索 */}
              {card.categories && card.categories.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-gray-200">
                  <h4 className="font-bold text-lg text-gray-900">Explore categories</h4>
                  <div className="flex gap-3">
                    {card.categories.map((category, idx) => (
                      <div
                        key={idx}
                        className="flex-1 p-4 rounded-xl border-2 border-gray-200 bg-white hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer"
                      >
                        <div className="text-3xl mb-2">{category.icon}</div>
                        <div className="text-sm font-semibold text-gray-900">{category.name}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 底部操作按钮 */}
          <DrawerFooter className="flex-row gap-3 px-6 pb-8 pt-4 border-t border-gray-200">
            <Button
              variant="outline"
              className="flex-1 gap-2 h-12 rounded-xl border-2 border-gray-300 hover:bg-gray-50 font-semibold"
            >
              <BookOpen className="h-5 w-5" />
              Read
            </Button>
            <Button className="flex-1 gap-2 h-12 rounded-xl bg-blue-600 hover:bg-blue-700 font-semibold">
              <Headphones className="h-5 w-5" />
              Listen
            </Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
