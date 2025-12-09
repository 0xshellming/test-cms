'use client'

import { createTranslator, type Locale } from '@/lib/translations'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

type Props = {
  locale: Locale
}

export function FreeDailyRead({ locale }: Props) {
  const t = createTranslator(locale)

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl p-6 shadow-lg overflow-hidden relative cursor-pointer hover:shadow-xl transition-all active:scale-[0.98]">
      <div className="relative z-10">
        <h2 className="text-3xl font-bold text-white mb-6">{t('home.freeDailyRead')}</h2>

        <button className="flex items-center gap-2 text-white font-semibold hover:gap-3 transition-all">
          <span className="text-lg">{t('home.getItNow')}</span>
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>

      {/* 装饰性书籍图片 - 使用渐变色背景模拟 */}
      <div className="absolute -right-8 -bottom-8 w-48 h-56 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg transform rotate-12 opacity-90 shadow-2xl">
        <div className="absolute top-4 left-4 right-4">
          <div className="bg-slate-800 text-white text-center py-2 px-4 rounded text-xs font-bold">
            GEMS
          </div>
          <div className="text-white text-2xl font-bold mt-8 text-center leading-tight">
            Learn Like
            <br />a CEO
          </div>
          {/* 装饰性图形 */}
          <div className="mt-8 flex justify-center">
            <div className="relative">
              <div className="w-20 h-20 bg-orange-600 rounded-full opacity-80" />
              <div className="absolute top-1 left-1 w-16 h-16 bg-yellow-500 rounded-full" />
              <div className="absolute top-6 left-6 text-4xl">💎</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
