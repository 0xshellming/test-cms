'use client'

import { useState, useEffect } from 'react'
import { createTranslator, type Locale } from '@/lib/translations'

type Props = {
  locale: Locale
}

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export default function InstallPrompt({ locale }: Props) {
  const t = createTranslator(locale)
  const [isIOS, setIsIOS] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)

  useEffect(() => {
    // 检测 iOS 设备
    setIsIOS(
      /iPad|iPhone|iPod/.test(navigator.userAgent) &&
        !('MSStream' in window && (window as { MSStream?: unknown }).MSStream),
    )

    // 检测是否已安装（standalone 模式）
    setIsStandalone(
      window.matchMedia('(display-mode: standalone)').matches ||
        ('standalone' in window.navigator &&
          (window.navigator as { standalone?: boolean }).standalone === true),
    )

    // 监听 beforeinstallprompt 事件（Chrome/Edge）
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      console.log(`User response to the install prompt: ${outcome}`)
      setDeferredPrompt(null)
    }
  }

  return (
    <div>
      <h3>{t('pwa.install.title')}</h3>
      {deferredPrompt ? 'deferredPrompt' : 'not deferredPrompt'}
      <br />
      {isIOS ? 'isIOS' : 'not isIOS'}
      <br />
      {isStandalone ? 'isStandalone' : 'not isStandalone'}
      <br />
      {deferredPrompt && (
        <button onClick={handleInstallClick} style={{ marginBottom: '1rem' }}>
          {t('pwa.install.button')}
        </button>
      )}
      {isIOS && (
        <p>
          {t('pwa.install.iosInstructions')}
          <span role="img" aria-label="share icon">
            {' '}
            ⎋{' '}
          </span>
          {t('pwa.install.iosInstructionsEnd')}
          <span role="img" aria-label="plus icon">
            {' '}
            ➕{' '}
          </span>
          .
        </p>
      )}
    </div>
  )
}
