'use client'

import { createTranslator, type Locale } from '@/lib/translations'
import { Home, Compass, BookOpen } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type Props = {
  locale: Locale
}

export function BottomNavigation({ locale }: Props) {
  const t = createTranslator(locale)

  const navItems = [
    {
      id: 'home',
      label: t('home.home'),
      icon: Home,
      href: `/${locale}`,
      active: true,
    },
    {
      id: 'explore',
      label: t('home.explore'),
      icon: Compass,
      href: `/${locale}/explore`,
      active: false,
    },
    {
      id: 'library',
      label: t('home.library'),
      icon: BookOpen,
      href: `/${locale}/library`,
      active: false,
    },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 pb-safe">
      <div className="flex items-center justify-around max-w-7xl mx-auto py-2">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                'flex flex-col items-center gap-1 px-6 py-3 rounded-xl transition-all flex-1',
                item.active
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50',
              )}
            >
              <Icon className={cn('h-6 w-6', item.active && 'stroke-[2.5]')} />
              <span className={cn('text-xs font-medium', item.active && 'font-semibold')}>
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
