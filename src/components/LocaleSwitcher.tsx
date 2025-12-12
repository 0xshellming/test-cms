'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import React, { useState, useEffect, useRef } from 'react'
import './LocaleSwitcher.css'

interface LocaleSwitcherProps {
  currentLocale?: string
}

const locales = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'zh', label: '中文', flag: '🇨🇳' },
]

export default function LocaleSwitcher({ currentLocale = 'en' }: LocaleSwitcherProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const currentLocaleData = locales.find((l) => l.code === currentLocale) || locales[0]

  // 点击外部关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleLocaleChange = (newLocale: string) => {
    // 将当前路径中的语言代码替换为新的语言代码
    // 例如: /zh/blog/post -> /en/blog/post
    const segments = pathname.split('/')

    // 如果路径以语言代码开头，替换它
    if (segments.length > 1 && (segments[1] === 'zh' || segments[1] === 'en')) {
      segments[1] = newLocale
    } else {
      // 如果没有语言代码，添加到开头
      segments.splice(1, 0, newLocale)
    }

    const newPath = segments.join('/')

    // 保留查询参数（如果有）
    const query = searchParams.toString()
    const newUrl = query ? `${newPath}?${query}` : newPath

    router.push(newUrl)
    router.refresh()
    setIsOpen(false)
  }

  // 根据当前语言获取 aria-label
  const getAriaLabel = () => {
    return currentLocale === 'zh' ? '切换语言' : 'Switch language'
  }

  return (
    <div className="locale-switcher" ref={dropdownRef}>
      <button
        className="locale-switcher-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={getAriaLabel()}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="locale-flag" aria-hidden="true">
          {currentLocaleData.flag}
        </span>
        <span className="locale-label">{currentLocaleData.label}</span>
        <span className={`locale-arrow ${isOpen ? 'open' : ''}`} aria-hidden="true">
          ▼
        </span>
      </button>

      {isOpen && (
        <div className="locale-dropdown" role="menu">
          {locales.map((locale) => (
            <button
              key={locale.code}
              className={`locale-option ${locale.code === currentLocale ? 'active' : ''}`}
              onClick={() => handleLocaleChange(locale.code)}
              role="menuitem"
              aria-current={locale.code === currentLocale ? 'true' : 'false'}
            >
              <span className="locale-flag" aria-hidden="true">
                {locale.flag}
              </span>
              <span className="locale-label">{locale.label}</span>
              {locale.code === currentLocale && (
                <span className="locale-check" aria-hidden="true">
                  ✓
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}









