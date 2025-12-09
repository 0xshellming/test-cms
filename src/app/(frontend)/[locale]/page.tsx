import { type Locale, isValidLocale } from '@/lib/translations'
import { notFound } from 'next/navigation'
import { HomePageContent } from '@/components/home/HomePageContent'

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

  return (
    <div className="min-h-screen bg-white">
      <HomePageContent locale={locale} />
    </div>
  )
}
