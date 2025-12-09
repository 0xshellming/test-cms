'use client'

import { type Locale } from '@/lib/translations'
import { Flame, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Suspense } from 'react'
import LocaleSwitcher from '@/components/LocaleSwitcher'

type Props = {
  locale: Locale
}

export function HomeHeader({ locale }: Props) {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* 品牌标识 */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
            <span className="text-white font-bold text-sm">3m</span>
          </div>
          <span className="text-lg font-semibold">三分钟阅读</span>
        </div>

        {/* 右侧按钮 */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-gray-100 hover:bg-gray-200 h-9 w-9"
            >
              <Flame className="h-4 w-4" />
            </Button>
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              0
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-gray-100 hover:bg-gray-200 h-9 w-9"
          >
            <User className="h-4 w-4" />
          </Button>
          <Suspense fallback={<div style={{ width: '120px', height: '40px' }} />}>
            <LocaleSwitcher currentLocale={locale} />
          </Suspense>
        </div>
      </div>
    </header>
  )
}
