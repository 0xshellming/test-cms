# 点击卡片拉起浮窗使用指南

## 概述

`CardWithDrawer` 组件实现了点击卡片后从底部拉起浮窗的效果，适用于移动端和桌面端的详情展示场景。

## 组件结构

- **CardWithDrawer**: 单个卡片和浮窗的组合组件
- **CardWithDrawerExample**: 完整的使用示例

## 使用方法

### 基础用法

```tsx
import { CardWithDrawer } from '@/components/home/CardWithDrawer'

const cardData = {
  id: '1',
  title: 'Learn Like a CEO',
  subtitle: 'SUMMARY',
  description: 'Transform your approach to learning',
  icon: '💎',
  color: 'bg-gradient-to-br from-blue-600 to-yellow-500',
  tags: ['GEMS'],
  drawerTitle: 'Learn Like a CEO',
  drawerDescription: 'based on titles by James Clear, William H. McRaven, and Stephen R. Covey',
  drawerContent: [
    {
      section: "You'll learn",
      items: [
        'How small daily investments compound into massive expertise',
        'Why calculated risks separate leaders from followers',
      ],
    },
  ],
  aboutText: 'This gem brings curated insights from leading experts...',
  categories: [
    { name: 'Leadership', icon: '🏆' },
    { name: 'Productivity', icon: '⚡' },
  ],
}

<CardWithDrawer card={cardData} locale="en" />
```

### 在页面中使用

```tsx
import { CardWithDrawerExample } from '@/components/home/CardWithDrawerExample'

export function MyPage({ locale }: { locale: Locale }) {
  return (
    <div>
      <h2>点击卡片查看详情</h2>
      <CardWithDrawerExample locale={locale} />
    </div>
  )
}
```

## 数据结构

### CardData 类型

```typescript
type CardData = {
  id: string                    // 唯一标识
  title: string                 // 卡片标题
  subtitle?: string             // 卡片副标题（可选）
  description: string           // 卡片描述
  icon?: string                 // 卡片图标（emoji 或文本）
  color: string                 // 卡片背景颜色类名
  tags?: string[]               // 卡片标签（可选）
  
  // 浮窗内容
  drawerTitle: string           // 浮窗标题
  drawerDescription: string     // 浮窗描述
  drawerContent: {              // 浮窗内容列表
    section?: string            // 章节标题（可选）
    items: string[]             // 内容项列表
  }[]
  aboutText?: string            // 关于文本（可选）
  categories?: {                // 分类卡片（可选）
    name: string
    icon: string
  }[]
}
```

## 特性

1. **响应式设计**: 适配移动端和桌面端
2. **可滚动内容**: 浮窗内容区域支持滚动
3. **平滑动画**: 使用 vaul 库实现流畅的底部抽屉动画
4. **可定制**: 支持自定义颜色、图标、内容等
5. **操作按钮**: 底部提供 Read 和 Listen 操作按钮

## 样式定制

### 卡片颜色

使用 Tailwind CSS 类名自定义卡片背景：

```tsx
color: 'bg-gradient-to-br from-blue-600 to-yellow-500'  // 渐变背景
color: 'bg-yellow-100'                                    // 纯色背景
color: 'bg-purple-500'                                    // 单色背景
```

### 浮窗高度

默认最大高度为 `60vh`，可在 `CardWithDrawer.tsx` 中修改：

```tsx
<div className="max-h-[60vh] overflow-y-auto px-4 pb-4">
  {/* 内容 */}
</div>
```

## 注意事项

1. 组件使用 `'use client'` 指令，必须在客户端组件中使用
2. 确保已安装 `vaul` 和 `lucide-react` 依赖
3. 图标使用 lucide-react 的 `BookOpen` 和 `Headphones` 组件
4. 卡片点击区域包含整个卡片，确保有足够的点击区域

## 技术栈

- **Drawer**: shadcn/ui Drawer 组件（基于 vaul）
- **Icons**: lucide-react
- **Styling**: Tailwind CSS
- **Animation**: vaul 内置动画
