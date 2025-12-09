import Link from 'next/link'
import { createTranslator, type Locale, isValidLocale } from '@/lib/translations'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import LocaleSwitcher from '@/components/LocaleSwitcher'

type Props = {
  params: Promise<{ locale: string }>
}

// 生成静态参数
export async function generateStaticParams() {
  return [{ locale: 'zh' }, { locale: 'en' }]
}

// 启用增量静态再生，每1小时重新生成
export const revalidate = 3600

export default async function HomePage(props: Props) {
  const { locale: localeParam } = await props.params

  if (!isValidLocale(localeParam)) {
    notFound()
  }

  const locale = localeParam as Locale
  const t = createTranslator(locale)

  return (
    <div className="blog-container">
      <header className="blog-header">
        <div className="blog-header-top">
          <h1>{t('home.welcome')}</h1>
          <Suspense fallback={<div style={{ width: '120px', height: '40px' }} />}>
            <LocaleSwitcher currentLocale={locale} />
          </Suspense>
        </div>
      </header>

      <div style={{ padding: '40px 0' }}>
        <h2>{t('home.title')}</h2>
        <p style={{ marginTop: '20px', fontSize: '18px', lineHeight: '1.6' }}>
          {t('home.description')}
        </p>

        <div style={{ marginTop: '40px' }}>
          <Link
            href={`/${locale}/blog`}
            style={{
              display: 'inline-block',
              padding: '12px 24px',
              background: 'rgb(100, 100, 100)',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '500',
              transition: 'background 0.2s',
            }}
          >
            {t('blog.title')} →
          </Link>

          <Link
            href="/admin"
            style={{
              display: 'inline-block',
              marginLeft: '16px',
              padding: '12px 24px',
              background: 'transparent',
              color: 'rgb(150, 150, 150)',
              textDecoration: 'none',
              border: '1px solid rgb(100, 100, 100)',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '500',
              transition: 'all 0.2s',
            }}
          >
            {t('home.admin')} →
          </Link>
        </div>
      </div>
    </div>
  )
}
