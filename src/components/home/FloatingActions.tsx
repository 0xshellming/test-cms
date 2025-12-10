'use client'

import { createTranslator, type Locale } from '@/lib/translations'
import { Dice1, Gift } from 'lucide-react'
import { Button } from '@/components/ui/button'

type Props = {
  locale: Locale
}

export function FloatingActions({ locale }: Props) {
  const t = createTranslator(locale)

  return (
    <div className="fixed bottom-24 left-0 right-0 px-4 z-40">
      <div className="flex gap-3 max-w-7xl mx-auto">
        {/* Roll the dice 按钮 */}
        <Button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-lg shadow-lg h-auto py-3 px-4 flex flex-col items-start gap-1">
          <div className="flex items-center gap-2 w-full">
            <Dice1 className="h-5 w-5" />
            <span className="font-bold text-base">{t('home.rollTheDice')}</span>
          </div>
          <span className="text-xs text-gray-600">{t('home.rollTheDiceSubtitle')}</span>
        </Button>

        {/* Gift for you 按钮 */}
        <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow-lg h-auto py-3 px-4 flex flex-col items-center justify-center relative min-w-[120px]">
          <Gift className="h-6 w-6 mb-1" />
          <span className="font-bold text-sm">{t('home.giftForYou')}</span>
          <span className="absolute -top-1 -right-1 bg-white text-purple-600 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            1
          </span>
        </Button>
      </div>
    </div>
  )
}


