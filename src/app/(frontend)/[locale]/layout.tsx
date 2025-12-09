import React from 'react'
import '@/app/globals.css'
import { isValidLocale, type Locale } from '@/lib/translations'
import { notFound } from 'next/navigation'
import { ServiceWorkerRegistration } from '@/components/pwa/ServiceWorkerRegistration'

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export async function generateStaticParams() {
  return [{ locale: 'zh' }, { locale: 'en' }]
}

// 启用增量静态再生，每1小时重新生成
export const revalidate = 3600

export default async function LocaleLayout(props: Props) {
  const { children, params } = props
  const { locale: localeParam } = await params

  // 验证 locale
  if (!isValidLocale(localeParam)) {
    notFound()
  }

  const locale = localeParam as Locale

  return (
    <html lang={locale}>
      <body>
        <ServiceWorkerRegistration locale={locale} />
        <main>{children}</main>
      </body>
    </html>
  )
}
