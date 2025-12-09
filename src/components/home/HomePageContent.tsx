'use client'

import { createTranslator, type Locale } from '@/lib/translations'
import { BookRecommendations } from './BookRecommendations'
import { BottomNavigation } from './BottomNavigation'
import { CardWithDrawerExample } from './CardWithDrawerExample'
import { CategoryButtons } from './CategoryButtons'
import { FloatingActions } from './FloatingActions'
import { HomeHeader } from './HomeHeader'
import { MicrolearningCards } from './MicrolearningCards'
import { FirstForToday } from './FirstForToday'
import { FreeDailyRead } from './FreeDailyRead'
import { CollectionCards } from './CollectionCards'

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
      coverColor: 'bg-gradient-to-br from-pink-500 to-rose-600',
      coverIcon: '✋',
    },
    {
      id: '2',
      title: 'THE EDUCATION OF MILLIONAIRES',
      description: "Everything you won't learn in college about how to be successful",
      author: 'Michael Ellsberg',
      coverColor: 'bg-gradient-to-br from-red-500 to-orange-600',
      coverIcon: '🦁',
    },
    {
      id: '3',
      title: 'Unlock Me',
      description: 'A guide to personal growth',
      author: 'Kevin Ho',
      coverColor: 'bg-gradient-to-br from-blue-600 to-indigo-700',
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
    {
      id: '1',
      title: 'The Practice',
      icon: '🎯',
      color: 'bg-gradient-to-br from-purple-600 to-pink-600',
    },
    {
      id: '2',
      title: 'The TB12 Method',
      icon: '👕',
      color: 'bg-gradient-to-br from-yellow-500 to-orange-600',
    },
    {
      id: '3',
      title: 'The Obesity Code',
      icon: '📊',
      color: 'bg-gradient-to-br from-orange-600 to-red-600',
    },
    {
      id: '4',
      title: 'More Than This',
      icon: '❤️',
      color: 'bg-gradient-to-br from-rose-600 to-pink-700',
    },
  ]

  const collectionItems = [
    {
      id: '1',
      title: 'How to Talk to Succeed',
      subtitle: 'Speak Like a CEO and Win Every Interaction',
      icon: '💬',
      bgColor: 'bg-gradient-to-br from-orange-500 to-orange-600',
    },
    {
      id: '2',
      title: 'Think Like a CEO',
      subtitle: 'Plan, Achieve, Succeed',
      icon: '✅',
      bgColor: 'bg-gradient-to-br from-gray-600 to-gray-700',
    },
  ]

  return (
    <div className="flex flex-col min-h-screen pb-20 bg-gray-50">
      {/* 头部 */}
      <HomeHeader locale={locale} />

      {/* 主内容区域 */}
      <main className="flex-1 px-4 space-y-6 pb-4 pt-4">
        {/* 今日首要任务 */}
        <FirstForToday locale={locale} />

        {/* 每日免费阅读推广 */}
        <FreeDailyRead locale={locale} />

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

        {/* 更多助你成功的职业建议 */}
        <section>
          <h2 className="text-2xl font-bold mb-1">{t('home.moreToHaveSuccessfulCareer')}</h2>
          <p className="text-sm text-gray-600 mb-4">{t('home.youMightLikeForGoal')}</p>
          <CardWithDrawerExample locale={locale} />
        </section>

        {/* 为你定制的合集 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">{t('home.collectionsMadeForYou')}</h2>
          <CollectionCards items={collectionItems} />
        </section>
      </main>

      {/* 浮动操作按钮 */}
      {/* <FloatingActions locale={locale} /> */}

      {/* 底部导航栏 */}
      <BottomNavigation locale={locale} />
    </div>
  )
}
