'use client'

import { createTranslator, type Locale } from '@/lib/translations'
import { HomeHeader } from './HomeHeader'
import { BookRecommendations } from './BookRecommendations'
import { CategoryButtons } from './CategoryButtons'
import { MicrolearningCards } from './MicrolearningCards'
import { FloatingActions } from './FloatingActions'
import { BottomNavigation } from './BottomNavigation'

type Props = {
  locale: Locale
}

export function HomePageContent({ locale }: Props) {
  const t = createTranslator(locale)

  // 模拟数据 - 实际应该从 Payload CMS 获取
  const bookRecommendations = [
    {
      id: '1',
      title: 'STEAL Like an Artist',
      description: '10 things nobody told you about being creative',
      author: 'Austin Kleon',
      coverColor: 'bg-pink-200',
      coverIcon: '✋',
    },
    {
      id: '2',
      title: 'THE EDUCATION OF MILLION-AIRES',
      description: "Everything you won't learn in college about how to be successful",
      author: 'Michael Ellsberg',
      coverColor: 'bg-red-200',
      coverIcon: '🦁',
    },
    {
      id: '3',
      title: 'Unlock Me',
      description: 'A guide to personal growth',
      author: 'Kevin Ho',
      coverColor: 'bg-blue-200',
      coverIcon: '🔓',
    },
  ]

  const categories = [
    { id: '1', name: 'Leadership', icon: '🏆', color: 'bg-purple-100' },
    { id: '2', name: 'Business & Career', icon: '🔑', color: 'bg-orange-100' },
    { id: '3', name: 'Productivity', icon: '⚡', color: 'bg-yellow-100' },
    { id: '4', name: 'Psychology', icon: '🧠', color: 'bg-green-100' },
  ]

  const microlearningItems = [
    { id: '1', title: 'Never Enough', icon: '💰', color: 'bg-yellow-100' },
    { id: '2', title: 'SCRUM', tags: ['To Do', 'Doing', 'Done'], color: 'bg-blue-100' },
    { id: '3', title: 'Keep It', icon: '💡', color: 'bg-green-100' },
    { id: '4', title: 'Crying in H Mart', icon: '📖', color: 'bg-pink-100' },
  ]

  return (
    <div className="flex flex-col min-h-screen pb-20">
      {/* 头部 */}
      <HomeHeader locale={locale} />

      {/* 主内容区域 */}
      <main className="flex-1 px-4 space-y-8 pb-4">
        {/* 你可能也喜欢 */}
        <section>
          <h2 className="text-2xl font-bold mb-1">{t('home.youMightAlsoLike')}</h2>
          <p className="text-sm text-gray-600 mb-4">{t('home.youMightAlsoLikeSubtitle')}</p>
          <BookRecommendations items={bookRecommendations} />
        </section>

        {/* 你感兴趣的类别 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">{t('home.categoriesInterested')}</h2>
          <CategoryButtons items={categories} />
        </section>

        {/* 每日微学习课程 */}
        <section>
          <h2 className="text-2xl font-bold mb-1">{t('home.dailyMicrolearning')}</h2>
          <p className="text-sm text-gray-600 mb-4">{t('home.dailyMicrolearningSubtitle')}</p>
          <MicrolearningCards items={microlearningItems} />
        </section>
      </main>

      {/* 浮动操作按钮 */}
      <FloatingActions locale={locale} />

      {/* 底部导航栏 */}
      <BottomNavigation locale={locale} />
    </div>
  )
}
