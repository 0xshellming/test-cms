'use client'

import { createTranslator, type Locale } from '@/lib/translations'
import { BookSummary } from '@/payload-types'
import { BookSummaryList } from './BookSummaryList'
import { BottomNavigation } from './BottomNavigation'
import { CardWithDrawerExample } from './CardWithDrawerExample'
import { CategoryButtons } from './CategoryButtons'
import { CollectionCards } from './CollectionCards'
import { FreeDailyRead } from './FreeDailyRead'
import { HomeHeader } from './HomeHeader'
import { MicrolearningCards } from './MicrolearningCards'
import { useScrollRestoration } from '@/hooks/useScrollRestoration'

type Props = {
  locale: Locale
  collections?: any[]
  bookRecommendations?: BookSummary[]
  categories?: any[]
}

export function HomePageContent({
  locale,
  collections = [],
  bookRecommendations = [],
  categories = [],
}: Props) {
  const t = createTranslator(locale)

  // 使用滚动位置恢复 hook
  useScrollRestoration(`home-scroll-${locale}`)

  // 将 CMS 数据转换为组件需要的格式
  const formattedBookRecommendations = bookRecommendations.slice(0, 6)

  const formattedCategories = categories.slice(0, 8).map((category) => ({
    id: category.id,
    name: category.name,
    icon: '📖',
    color: 'bg-blue-100',
    slug: category.slug,
  }))

  // 为微学习课程使用部分书籍数据
  const microlearningItems = bookRecommendations.slice(0, 4)

  // 转换合集数据
  const collectionItems = collections.map((collection) => ({
    id: collection.id,
    locale: collection.locale,
    slug: collection.slug,
    title: collection.title,
    subtitle: collection.desc,
    icon: collection.displaySettings?.icon || '📦',
    bgColor:
      collection.displaySettings?.customBgColor ||
      collection.displaySettings?.bgColor ||
      'bg-gradient-to-br from-blue-500 to-blue-600',
    itemCount: collection.itemCount || 0,
  }))

  return (
    <div className="flex flex-col min-h-screen pb-20 bg-gray-50">
      {/* 头部 */}
      <HomeHeader locale={locale} />

      {/* 主内容区域 */}
      <main className="flex-1 px-4 space-y-6 pb-4 pt-4">
        {/* 今日首要任务 */}
        {/* <FirstForToday locale={locale} /> */}

        {/* 每日免费阅读推广 */}
        <FreeDailyRead locale={locale} />

        {/* 你可能也喜欢 */}
        {formattedBookRecommendations.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-1">{t('home.youMightAlsoLike')}</h2>
            <p className="text-sm text-gray-600 mb-4">{t('home.youMightAlsoLikeSubtitle')}</p>
            <BookSummaryList items={formattedBookRecommendations as any} locale={locale} />
          </section>
        )}

        {/* 你感兴趣的类别 */}
        {formattedCategories.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-4">{t('home.categoriesInterested')}</h2>
            <CategoryButtons items={formattedCategories} />
          </section>
        )}

        {/* 每日微学习课程 */}
        {microlearningItems.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-1">{t('home.dailyMicrolearning')}</h2>
            <p className="text-sm text-gray-600 mb-4">{t('home.dailyMicrolearningSubtitle')}</p>
            <MicrolearningCards items={microlearningItems} />
          </section>
        )}

        {/* 更多助你成功的职业建议 */}
        {formattedBookRecommendations.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-1">{t('home.moreToHaveSuccessfulCareer')}</h2>
            <p className="text-sm text-gray-600 mb-4">{t('home.youMightLikeForGoal')}</p>
            <CardWithDrawerExample locale={locale} />
          </section>
        )}

        {/* 为你定制的合集 */}
        {collectionItems.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-4">{t('home.collectionsMadeForYou')}</h2>
            <CollectionCards items={collectionItems} />
          </section>
        )}
      </main>

      {/* 浮动操作按钮 */}
      {/* <FloatingActions locale={locale} /> */}

      {/* 底部导航栏 */}
      <BottomNavigation locale={locale} />
    </div>
  )
}
