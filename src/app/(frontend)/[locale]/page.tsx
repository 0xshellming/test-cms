import { type Locale, isValidLocale } from '@/lib/translations'
import { notFound } from 'next/navigation'
import { HomePageContent } from '@/components/home/HomePageContent'
import { getPayload } from 'payload'
import config from '@/payload.config'

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

  // 获取 Payload 实例
  const payload = await getPayload({ config })

  // 获取首页展示的合集（带内容项）
  let collectionsResult
  try {
    collectionsResult = await payload.find({
      collection: 'collections',
      where: {
        'displayLocations.showOnHomepage': { equals: true },
        _status: { equals: 'published' },
      },
      sort: 'sortOrder',
      limit: 10,
      locale: locale,
      depth: 2, // 深度查询，获取关联的书籍/视频数据
    })
  } catch (error) {
    console.error('Failed to fetch collections:', error)
    collectionsResult = { docs: [] }
  }

  // 获取推荐书籍（用于"你可能也喜欢"部分）
  let bookRecommendations
  try {
    bookRecommendations = await payload.find({
      collection: 'book-summaries',
      where: {
        _status: { equals: 'published' },
      },
      sort: '-publishedDate',
      limit: 6,
      locale: locale,
    })
  } catch (error) {
    console.error('Failed to fetch book recommendations:', error)
    bookRecommendations = { docs: [] }
  }

  // 获取分类
  let topics
  try {
    topics = await payload.find({
      collection: 'topics',
      limit: 20,
      locale: locale,
    })
  } catch (error) {
    console.error('Failed to fetch topics:', error)
    topics = { docs: [] }
  }

  return (
    <div className="min-h-screen bg-white">
      <HomePageContent
        locale={locale}
        collections={collectionsResult.docs}
        bookRecommendations={bookRecommendations.docs}
        topics={topics.docs}
      />
    </div>
  )
}
