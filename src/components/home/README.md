# 首页组件文档

本文档介绍首页的组件结构和实现的功能。

## 🎨 整体设计

首页采用现代化的卡片式布局，参考了 Headway 应用的设计风格，具有以下特点：

- **移动优先设计**：所有组件都针对移动端体验进行优化
- **流畅的动画**：卡片点击、悬停等交互都有平滑的过渡效果
- **渐变色彩**：使用现代化的渐变配色方案
- **圆角设计**：采用较大的圆角（rounded-2xl）营造柔和的视觉效果

## 📦 组件列表

### 1. HomePageContent
**路径**: `src/components/home/HomePageContent.tsx`

主容器组件，整合所有首页模块。

**功能**：
- 管理首页的整体布局
- 提供模拟数据（实际应从 Payload CMS 获取）
- 协调各个子组件的展示

### 2. HomeHeader
**路径**: `src/components/home/HomeHeader.tsx`

顶部导航栏组件。

**功能**：
- 显示品牌标识（Headway logo）
- 火焰图标（打卡/连续学习天数）
- 用户头像按钮
- 语言切换器（支持中英文）

### 3. FirstForToday
**路径**: `src/components/home/FirstForToday.tsx`

今日首要任务卡片。

**功能**：
- 突出显示每日学习目标
- 显示建议的学习时长（15 分钟）
- 点击后可跳转到学习页面

**设计特点**：
- 橙色渐变背景
- 左侧目标图标
- 右侧箭头指示可点击

### 4. FreeDailyRead
**路径**: `src/components/home/FreeDailyRead.tsx`

每日免费阅读推广卡片。

**功能**：
- 推广每日免费阅读功能
- 展示精选书籍封面
- 引导用户获取内容

**设计特点**：
- 蓝色渐变背景
- 右侧装饰性书籍封面
- 包含 "Get it now" 行动召唤按钮

### 5. BookRecommendations
**路径**: `src/components/home/BookRecommendations.tsx`

书籍推荐列表组件。

**功能**：
- 横向滚动展示推荐书籍
- 每本书显示封面、标题、描述和作者
- 书签按钮（保存到图书馆）

**设计特点**：
- 大尺寸书籍封面（52高度）
- 圆角卡片设计
- 悬停时阴影加深效果

### 6. CardWithDrawer
**路径**: `src/components/home/CardWithDrawer.tsx`

点击拉起浮层的卡片组件（核心交互组件）。

**功能**：
- 展示摘要/课程卡片
- 点击后从底部拉起详情浮窗
- 浮窗包含完整的内容、分类和操作按钮

**浮窗内容**：
- 标题和描述
- "You'll learn" 学习要点列表
- "Key points" 关键要点
- "About this gem" 内容介绍
- "Explore categories" 相关分类
- 底部操作按钮（Read / Listen）

**技术实现**：
- 使用 `vaul` 库的 Drawer 组件
- 支持拖拽关闭
- 可滚动的内容区域
- 响应式设计

### 7. CardWithDrawerExample
**路径**: `src/components/home/CardWithDrawerExample.tsx`

CardWithDrawer 的使用示例组件。

**功能**：
- 提供预设的示例数据
- 展示如何使用 CardWithDrawer 组件
- 包含多个不同主题的卡片

**示例卡片**：
1. Learn Like a CEO - 学习方法
2. Effective Decision-Making - 决策技巧
3. Do What You Are - 职业发展

### 8. CategoryButtons
**路径**: `src/components/home/CategoryButtons.tsx`

分类按钮列表组件。

**功能**：
- 横向滚动展示用户感兴趣的分类
- 每个分类显示图标和名称
- 点击可筛选相关内容

**设计特点**：
- 圆角胶囊形状
- 悬停时边框高亮
- 点击时缩放动画

### 9. MicrolearningCards
**路径**: `src/components/home/MicrolearningCards.tsx`

微学习卡片列表组件。

**功能**：
- 展示每日微学习课程
- 横向滚动浏览
- 每个卡片显示标题和图标/标签

**设计特点**：
- 渐变色背景
- 装饰性半透明叠加层
- 统一的卡片尺寸

### 10. CollectionCards
**路径**: `src/components/home/CollectionCards.tsx`

主题合集卡片组件。

**功能**：
- 展示精心策划的内容合集
- 较大的卡片尺寸突出重要性
- 包含标题、副标题和装饰图标

**设计特点**：
- 深色渐变背景
- 装饰性背景图标
- 底部渐变线条装饰

### 11. FloatingActions
**路径**: `src/components/home/FloatingActions.tsx`

浮动操作按钮组件。

**功能**：
- 固定在页面底部（底部导航上方）
- "Roll the dice" - 随机推荐
- "Gift for you" - 专属礼物（带通知徽章）

**设计特点**：
- 半透明背景
- 阴影效果
- 图标 + 文字组合

### 12. BottomNavigation
**路径**: `src/components/home/BottomNavigation.tsx`

底部导航栏组件。

**功能**：
- 固定在页面最底部
- 三个主要导航项：Home、Explore、Library
- 当前页面高亮显示

**设计特点**：
- 图标 + 标签垂直排列
- 当前项蓝色高亮 + 背景色
- 平滑过渡动画

## 🎯 交互功能

### 点击拉起浮层
CardWithDrawer 组件实现了点击卡片拉起浮层的核心交互：

1. **触发器**: 点击卡片
2. **动画**: 浮层从底部平滑滑入
3. **手势**: 支持下拉拖拽关闭
4. **内容**: 可滚动的详细信息
5. **操作**: Read/Listen 按钮

### 横向滚动
多个列表组件支持横向滚动：

- BookRecommendations
- CategoryButtons
- MicrolearningCards
- CardWithDrawerExample
- CollectionCards

**实现方式**：
```tsx
<div className="overflow-x-auto -mx-4 px-4">
  <div className="flex gap-4 pb-4">
    {/* 卡片项目 */}
  </div>
</div>
```

### 交互反馈
所有可点击元素都有交互反馈：

- **悬停**: `hover:shadow-lg` 阴影加深
- **点击**: `active:scale-[0.98]` 轻微缩小
- **过渡**: `transition-all` 平滑动画

## 🌐 国际化支持

所有组件都支持中英文双语：

```tsx
const t = createTranslator(locale)
{t('home.youMightAlsoLike')}
```

**翻译文件**: `src/lib/translations.ts`

## 📱 响应式设计

- 移动优先的布局
- 横向滚动列表
- 固定定位的头部和底部导航
- 安全区域适配（pb-safe）

## 🎨 设计规范

### 颜色
- **主色**: 蓝色（text-blue-600, bg-blue-600）
- **渐变**: 多种渐变组合（from-x to-y）
- **文字**: 灰度色阶（text-gray-500/600/700/900）

### 圆角
- **小**: rounded-lg (8px)
- **中**: rounded-xl (12px)
- **大**: rounded-2xl (16px)
- **圆形**: rounded-full

### 阴影
- **默认**: shadow-md
- **悬停**: shadow-lg
- **强调**: shadow-xl

### 间距
- **卡片间距**: gap-4 (16px)
- **内边距**: p-4/p-5/p-6
- **外边距**: m-4

## 🚀 使用示例

### 在页面中使用
```tsx
import { HomePageContent } from '@/components/home/HomePageContent'

export default async function HomePage({ params }) {
  const { locale } = await params
  
  return <HomePageContent locale={locale} />
}
```

### 自定义卡片数据
```tsx
const customCards = [
  {
    id: '1',
    title: 'Your Title',
    description: 'Your description',
    icon: '🎯',
    color: 'bg-gradient-to-br from-blue-500 to-purple-500',
    drawerTitle: 'Detail Title',
    drawerDescription: 'Detail description',
    drawerContent: [
      {
        section: 'Key Points',
        items: ['Point 1', 'Point 2', 'Point 3'],
      },
    ],
  },
]

<CardWithDrawerExample items={customCards} locale={locale} />
```

## 📦 依赖

- **UI 组件**: `@/components/ui/button`, `@/components/ui/drawer`
- **图标**: `lucide-react`
- **工具**: `@/lib/utils` (cn 函数)
- **翻译**: `@/lib/translations`
- **浮层**: `vaul` (通过 ui/drawer)

## 🔧 后续改进建议

1. **数据集成**: 将模拟数据替换为 Payload CMS 的真实数据
2. **状态管理**: 添加用户收藏、进度跟踪等状态
3. **动画优化**: 使用 framer-motion 增强动画效果
4. **性能优化**: 图片懒加载、虚拟滚动等
5. **无障碍**: 增强键盘导航和屏幕阅读器支持

## 📝 注意事项

1. 所有客户端组件都标记了 `'use client'`
2. 遵循 Next.js 15 的最佳实践
3. 符合项目的 i18n 规范
4. 响应式设计适配移动端
5. 保持一致的设计语言









