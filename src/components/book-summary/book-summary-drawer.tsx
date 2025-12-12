'use client'

import { BookOpen, Headphones, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { Button } from '../ui/button'
import {
  DrawerTrigger,
  DrawerContent,
  Drawer,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '../ui/drawer'
import { BookSummary } from '@/payload-types'
import { createTranslator, type Locale } from '@/lib/translations'
import { StaticMarkdown } from '../markdown-renderer/markdown-renderer'
import Image from 'next/image'
import { ScrollRestorationLink } from '../ui/scroll-restoration-link'

type BookSummaryDrawerProps = {
  children: React.ReactNode
  bookSummary: BookSummary
  locale: Locale
}

// 分类图标映射
const categoryIcons: Record<string, string> = {
  Productivity: '⏳',
  Business: '💼',
  'Self-Help': '🌟',
  Psychology: '🧠',
  Leadership: '👔',
  Management: '📊',
  Technology: '💻',
  Science: '🔬',
  Health: '❤️',
  Finance: '💰',
  Marketing: '📢',
  Career: '🎯',
}

export function BookSummaryDrawer({ children, bookSummary, locale }: BookSummaryDrawerProps) {
  const t = createTranslator(locale)
  const [expandedKeyPoints, setExpandedKeyPoints] = useState<Set<number>>(new Set())

  const toggleKeyPoint = (index: number) => {
    setExpandedKeyPoints((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(index)) {
        newSet.delete(index)
      } else {
        newSet.add(index)
      }
      return newSet
    })
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="rounded-t-3xl " aria-label={bookSummary.title}>
        <div className="mx-auto w-full px-6 max-h-[75vh] overflow-scroll pb-8">
          <DrawerHeader className="pt-6 pb-4 text-center gap-1">
            <Image
              className="rounded block mx-auto"
              src={bookSummary.coverUrl}
              alt={bookSummary.title}
              width={150}
              height={100}
            />
            <DrawerTitle className="text-2xl font-bold text-center">
              {bookSummary.title}
            </DrawerTitle>
            <DrawerDescription className="text-base text-gray-600 -mt-1 text-center">
              {bookSummary.author}
            </DrawerDescription>
          </DrawerHeader>

          {/* 可滚动内容区域 */}
          <div className="space-y-6">
            {/* 简介 */}
            {bookSummary.desc && (
              <p className="text-sm text-gray-600 leading-relaxed">{bookSummary.desc}</p>
            )}

            {/* You'll learn 部分 (使用 summary Markdown) */}
            {bookSummary.summary && (
              <section
                className="space-y-3  rounded-lg p-4 pb-2 bg-gray-50 border border-gray-200 shadow-sm"
                aria-labelledby="youll-learn-heading"
              >
                <h3 id="youll-learn-heading" className="font-bold text-lg text-gray-900">
                  {t('bookSummary.youllLearn')}
                </h3>
                <div className="text-sm text-gray-600 leading-relaxed prose prose-sm max-w-none prose-ul:my-2 prose-li:my-1">
                  <StaticMarkdown content={bookSummary.summary} />
                </div>
              </section>
            )}

            {/* 核心要点部分 - 可展开 */}
            {bookSummary.keypoints && bookSummary.keypoints.length > 0 && (
              <section className="space-y-3" aria-labelledby="key-points-heading">
                <h3 id="key-points-heading" className="font-bold text-lg text-gray-900">
                  {t('bookSummary.keyPoints')}
                </h3>
                <div className="space-y-2">
                  {bookSummary.keypoints.map((point) => (
                    <div key={point.index} className="border-b border-gray-200 last:border-b-0">
                      <button
                        onClick={() => toggleKeyPoint(point.index)}
                        className="w-full flex items-center justify-between py-3 text-left hover:bg-gray-50 transition-colors rounded-lg px-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        aria-expanded={expandedKeyPoints.has(point.index)}
                        aria-label={
                          expandedKeyPoints.has(point.index)
                            ? t('bookSummary.collapseKeyPoint')
                            : t('bookSummary.expandKeyPoint')
                        }
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-semibold text-sm flex-shrink-0">
                            {point.index}
                          </span>
                          <span className="font-medium text-gray-900 text-sm">{point.title}</span>
                        </div>
                        <ChevronRight
                          className={`h-5 w-5 text-gray-400 transition-transform flex-shrink-0 ${
                            expandedKeyPoints.has(point.index) ? 'rotate-90' : ''
                          }`}
                          aria-hidden="true"
                        />
                      </button>
                      {expandedKeyPoints.has(point.index) && point.content && (
                        <div className="px-2 pb-3 pl-[52px] animate-in fade-in slide-in-from-top-2 duration-200">
                          <p className="text-sm text-gray-600 leading-relaxed">{point.content}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 关于作者部分 */}
            {bookSummary.aboutAuthor && (
              <section className="space-y-3" aria-labelledby="about-author-heading">
                <h3 id="about-author-heading" className="font-bold text-lg text-gray-900">
                  {t('bookSummary.aboutThisGem')}
                </h3>
                <div className="text-sm text-gray-600 leading-relaxed">
                  <StaticMarkdown content={bookSummary.aboutAuthor} />
                </div>
              </section>
            )}

            {/* 关于作者部分 */}
            {bookSummary.review && (
              <section className="space-y-3" aria-labelledby="about-author-heading">
                <h3 id="about-author-heading" className="font-bold text-lg text-gray-900">
                  {t('bookSummary.reviews')}
                </h3>
                <div>
                  {bookSummary.metadata?.ratingValue} {bookSummary.metadata?.ratingsCount}
                </div>
                <div className="text-sm text-gray-600 leading-relaxed">
                  <StaticMarkdown content={bookSummary.review} />
                </div>
              </section>
            )}

            {/* 分类探索部分 */}
            {bookSummary.metadata?.tags && bookSummary.metadata?.tags.length > 0 && (
              <section
                className="space-y-3 pt-4 border-t border-gray-200"
                aria-labelledby="categories-heading"
              >
                <h3 id="categories-heading" className="font-bold text-lg text-gray-900">
                  {t('bookSummary.exploreCategories')}
                </h3>
                <div className="flex gap-3 flex-wrap">
                  {bookSummary.metadata?.tags.map((category, idx) => (
                    <button
                      key={idx}
                      className="flex items-center gap-3 flex-1 min-w-[140px] p-4 rounded-xl border-2 border-gray-200 bg-white hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      aria-label={`${t('bookSummary.exploreCategories')}: ${category.tag}`}
                    >
                      <div className="text-3xl flex-shrink-0" aria-hidden="true">
                        {categoryIcons[category.tag || ''] || '📚'}
                      </div>
                      <span className="text-sm font-medium text-gray-900 text-left">
                        {category.tag}
                      </span>
                    </button>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>

        {/* 底部操作按钮 */}
        <DrawerFooter className="flex-row gap-3 px-6 pb-8 pt-4 border-t border-gray-200">
          <Button
            variant="outline"
            className="flex-1 gap-2 h-12 rounded-xl border-2 border-gray-300 hover:bg-gray-50 font-semibold focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            asChild
          >
            <ScrollRestorationLink
              href={`/${locale}/book-summary/${bookSummary.slug}`}
              aria-label={t('bookSummary.readAriaLabel')}
              scrollKey={`home-scroll-${locale}`}
            >
              <BookOpen className="h-5 w-5" aria-hidden="true" />
              {t('bookSummary.read')}
            </ScrollRestorationLink>
          </Button>
          <Button
            className="flex-1 gap-2 h-12 rounded-xl bg-blue-600 hover:bg-blue-700 font-semibold focus:ring-2 focus:ring-blue-700 focus:ring-offset-2"
            asChild
          >
            <ScrollRestorationLink
              href={`/${locale}/book-summary/${bookSummary.slug}`}
              aria-label={t('bookSummary.listenAriaLabel')}
              scrollKey={`home-scroll-${locale}`}
            >
              <Headphones className="h-5 w-5" aria-hidden="true" />
              {t('bookSummary.listen')}
            </ScrollRestorationLink>
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
