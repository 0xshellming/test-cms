'use client'

import { CardWithDrawer } from './CardWithDrawer'
import { type Locale } from '@/lib/translations'

type Props = {
  locale: Locale
}

/**
 * 点击卡片拉起浮窗的示例组件
 *
 * 这个组件展示了如何使用 Drawer 组件实现点击卡片后从底部拉起浮窗的效果。
 * 浮窗包含：
 * - 标题和描述
 * - 可滚动的内容区域
 * - 底部操作按钮
 */
export function CardWithDrawerExample({ locale }: Props) {
  // 示例数据 - 根据图片中的设计
  const exampleCards = [
    {
      id: '1',
      title: 'Learn Like a CEO',
      subtitle: 'SUMMARY',
      description: 'Transform your approach to learning',
      icon: '💎',
      color: 'bg-gradient-to-br from-blue-500 to-yellow-500',
      tags: ['GEMS'],
      drawerTitle: 'Learn Like a CEO',
      drawerDescription: 'based on titles by James Clear, William H. McRaven, and Stephen R. Covey',
      drawerContent: [
        {
          section: "You'll learn",
          items: [
            'How small daily investments compound into massive expertise',
            'Why calculated risks separate leaders from followers',
            'The character foundation that sustains long-term success',
            'Strategic thinking patterns of top executives',
          ],
        },
        {
          section: 'Key points',
          items: [
            'Learn like a CEO',
            'The Steady Drummer: your daily rhythm of growth',
            'The Bold Lead Guitar: your strategic risk-taking solos',
            'The Reliable Bassist: your unshakeable character foundation',
          ],
        },
      ],
      aboutText:
        'This gem brings curated insights from leading experts: James Clear, William H. McRaven, and Stephen R. Covey. This content is for educational purposes only and not intended as medical advice.',
      categories: [
        { name: 'Leadership', icon: '🏆' },
        { name: 'Productivity', icon: '⚡' },
      ],
    },
    {
      id: '2',
      title: 'Effective Decision-Making',
      subtitle: 'SUMMARY',
      description: 'How to make better decisions under uncertainty and pressure',
      icon: '🤔',
      color: 'bg-gradient-to-br from-emerald-500 to-green-600',
      drawerTitle: 'Effective Decision-Making',
      drawerDescription: 'Learn proven frameworks for making smart decisions in complex situations',
      drawerContent: [
        {
          section: "You'll learn",
          items: [
            'Mental models for clearer thinking under pressure',
            'How to identify and overcome cognitive biases',
            'Techniques for evaluating options objectively',
            'When to trust your intuition vs. analytical thinking',
          ],
        },
        {
          section: 'Key frameworks',
          items: [
            'The 10/10/10 Rule: Consider consequences across different timeframes',
            'Pre-mortem analysis: Anticipate failures before they happen',
            'Decision matrix: Systematically evaluate multiple options',
            'First principles thinking: Break problems down to fundamentals',
          ],
        },
      ],
      aboutText:
        'This summary synthesizes research from behavioral economics, cognitive psychology, and leadership studies to provide practical decision-making tools.',
      categories: [
        { name: 'Leadership', icon: '🏆' },
        { name: 'Psychology', icon: '🧠' },
      ],
    },
    {
      id: '3',
      title: 'Do What You Are',
      subtitle: 'SUMMARY',
      description: 'Discover the perfect career through personality type',
      icon: '❤️',
      color: 'bg-gradient-to-br from-blue-500 to-purple-600',
      drawerTitle: 'Do What You Are',
      drawerDescription:
        'Find career fulfillment by understanding your personality type and natural strengths',
      drawerContent: [
        {
          section: "You'll discover",
          items: [
            'How personality type influences career satisfaction',
            'Your natural strengths and work preferences',
            'Career paths aligned with your personality',
            'Strategies for leveraging your unique traits',
          ],
        },
        {
          section: 'Personality insights',
          items: [
            'Understanding the 16 personality types framework',
            'Identifying your core values and motivations',
            'Work environments where you thrive',
            'Communication styles that match your personality',
          ],
        },
      ],
      aboutText:
        'Based on decades of personality research and career counseling, this book helps match your innate preferences with fulfilling career paths.',
      categories: [
        { name: 'Career', icon: '💼' },
        { name: 'Psychology', icon: '🧠' },
      ],
    },
  ]

  return (
    <div className="overflow-x-auto -mx-4 px-4">
      <div className="flex gap-4 pb-4">
        {exampleCards.map((card) => (
          <CardWithDrawer key={card.id} card={card} locale={locale} />
        ))}
      </div>
    </div>
  )
}
