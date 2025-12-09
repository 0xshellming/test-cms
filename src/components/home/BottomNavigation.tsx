'use client'

import { createTranslator, type Locale } from '@/lib/translations'
import { Home, Compass, BookOpen } from 'lucide-react'
import Link from 'next/link'

type Props = {
  locale: Locale
}

export function BottomNavigation({ locale }: Props) {
  const t = createTranslator(locale)

  const navItems = [
    {
      id: 'home',
      label: 'Home',
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
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex items-center justify-around max-w-7xl mx-auto py-2">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                item.active ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon className={`h-5 w-5 ${item.active ? 'text-blue-600' : ''}`} />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
