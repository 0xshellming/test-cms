'use client'

import { useEffect, useState } from 'react'
import { createTranslator, type Locale } from '@/lib/translations'

type Props = {
  locale: Locale
}

export function ServiceWorkerRegistration({ locale }: Props) {
  const t = createTranslator(locale)
  const [isOnline, setIsOnline] = useState(true)
  const [swRegistration, setSwRegistration] = useState<globalThis.ServiceWorkerRegistration | null>(
    null,
  )

  useEffect(() => {
    // 检测在线/离线状态
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    setIsOnline(navigator.onLine)

    // 注册 Service Worker
    if ('serviceWorker' in navigator) {
      registerServiceWorker()
    }

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  async function registerServiceWorker() {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
        updateViaCache: 'none',
      })

      setSwRegistration(registration)

      // 监听 Service Worker 更新
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // 新版本已安装，提示用户刷新
              console.log('[Service Worker] New version available')
              // 可以在这里显示更新提示
            }
          })
        }
      })

      // 检查是否有更新
      registration.update()

      console.log('[Service Worker] Registered successfully')
    } catch (error) {
      console.error('[Service Worker] Registration failed:', error)
    }
  }

  // 手动更新 Service Worker
  async function updateServiceWorker() {
    if (swRegistration) {
      try {
        await swRegistration.update()
        // 通知 Service Worker 跳过等待
        if (swRegistration.waiting) {
          swRegistration.waiting.postMessage({ type: 'SKIP_WAITING' })
          window.location.reload()
        }
      } catch (error) {
        console.error('[Service Worker] Update failed:', error)
      }
    }
  }

  return <div />
}









