'use client'

import { useState, useEffect } from 'react'
import { subscribeUser, unsubscribeUser, sendNotification } from '@/app/actions'
import { createTranslator, type Locale } from '@/lib/translations'

type Props = {
  locale: Locale
}

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

export default function PushNotificationManager({ locale }: Props) {
  const t = createTranslator(locale)
  const [isSupported, setIsSupported] = useState(false)
  const [subscription, setSubscription] = useState<PushSubscription | null>(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      setIsSupported(true)
      registerServiceWorker()
    }
  }, [])

  async function registerServiceWorker() {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
        updateViaCache: 'none',
      })
      const sub = await registration.pushManager.getSubscription()
      setSubscription(sub)
    } catch (error) {
      console.error('Service Worker registration failed:', error)
    }
  }

  async function subscribeToPush() {
    try {
      if (!process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY) {
        alert('VAPID public key is not configured')
        return
      }

      const registration = await navigator.serviceWorker.ready
      const sub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY),
      })
      setSubscription(sub)
      const serializedSub = JSON.parse(JSON.stringify(sub))
      await subscribeUser(serializedSub)
    } catch (error) {
      console.error('Failed to subscribe to push notifications:', error)
      alert('Failed to subscribe to push notifications')
    }
  }

  async function unsubscribeFromPush() {
    try {
      await subscription?.unsubscribe()
      setSubscription(null)
      await unsubscribeUser()
    } catch (error) {
      console.error('Failed to unsubscribe from push notifications:', error)
    }
  }

  async function sendTestNotification() {
    if (subscription && message.trim()) {
      try {
        await sendNotification(message)
        setMessage('')
      } catch (error) {
        console.error('Failed to send notification:', error)
        alert('Failed to send notification')
      }
    }
  }

  if (!isSupported) {
    return <p>{t('pwa.push.notSupported')}</p>
  }

  return (
    <div>
      <h3>{t('pwa.push.title')}</h3>
      {subscription ? (
        <>
          <p>{t('pwa.push.subscribed')}</p>
          <button onClick={unsubscribeFromPush}>{t('pwa.push.unsubscribe')}</button>
          <div style={{ marginTop: '1rem' }}>
            <input
              type="text"
              placeholder={t('pwa.push.enterMessage')}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{ marginRight: '0.5rem', padding: '0.5rem' }}
            />
            <button onClick={sendTestNotification} disabled={!message.trim()}>
              {t('pwa.push.sendTest')}
            </button>
          </div>
        </>
      ) : (
        <>
          <p>{t('pwa.push.notSubscribed')}</p>
          <button onClick={subscribeToPush}>{t('pwa.push.subscribe')}</button>
        </>
      )}
    </div>
  )
}







