'use client'

import { createTranslator, type Locale } from '@/lib/translations'
import { Target, ChevronRight } from 'lucide-react'
import Link from 'next/link'

type Props = {
  locale: Locale
}

export function FirstForToday({ locale }: Props) {
  const t = createTranslator(locale)

  return (
    <Link href={`/${locale}/book-summary/test`}>
      <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 shadow-sm border border-orange-200 hover:shadow-md transition-all cursor-pointer active:scale-[0.98]">
        <div className="flex items-center justify-between">
          <div className="flex items-start gap-3 flex-1">
            {/* 图标 */}
            <div className="bg-orange-500 rounded-full p-3 flex-shrink-0">
              <Target className="h-6 w-6 text-white" />
            </div>

            {/* 内容 */}
            <div className="flex-1 min-w-0">
              <p className="text-xs text-orange-700 font-semibold uppercase tracking-wide mb-1">
                {t('home.firstForToday')}
              </p>
              <h3 className="text-lg font-bold text-gray-900">{t('home.learnForMinutes')}</h3>
            </div>
          </div>

          {/* 箭头 */}
          <ChevronRight className="h-6 w-6 text-gray-400 flex-shrink-0" />
        </div>
      </div>
    </Link>
  )
}
