'use client'

import { useState, useEffect } from 'react'
import { createTranslator, type Locale } from '@/lib/translations'

type Props = {
  locale: Locale
}

export default function OfflineIndicator({ locale }: Props) {
  const t = createTranslator(locale)
  const [_isOnline, setIsOnline] = useState(true)
  const [showOfflineBanner, setShowOfflineBanner] = useState(false)

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true)
      setShowOfflineBanner(false)
    }

    const handleOffline = () => {
      setIsOnline(false)
      setShowOfflineBanner(true)
    }

    setIsOnline(navigator.onLine)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  if (!showOfflineBanner) {
    return null
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#f59e0b',
        color: '#fff',
        padding: '0.75rem 1rem',
        textAlign: 'center',
        zIndex: 9999,
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}
      role="alert"
      aria-live="polite"
    >
      <span>{t('pwa.offline.message')}</span>
      <button
        onClick={() => setShowOfflineBanner(false)}
        style={{
          marginLeft: '1rem',
          background: 'rgba(255,255,255,0.2)',
          border: '1px solid rgba(255,255,255,0.3)',
          color: '#fff',
          padding: '0.25rem 0.75rem',
          borderRadius: '0.25rem',
          cursor: 'pointer',
        }}
        aria-label={t('pwa.offline.dismiss')}
      >
        {t('pwa.offline.dismiss')}
      </button>
    </div>
  )
}
