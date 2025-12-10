# 电子书系统架构文档

本文档描述了电子书总结和内容合集系统的架构设计和使用方法。

## 📋 目录

- [系统概述](#系统概述)
- [数据模型](#数据模型)
- [数据导入](#数据导入)
- [前端展示](#前端展示)
- [扩展指南](#扩展指南)

---

## 系统概述

该系统支持管理多种类型的内容（电子书总结、YouTube 视频总结、文章等），并通过**通用合集**功能将这些内容组织起来展示。

### 核心特性

- ✅ **多语言支持**：所有内容支持中英文双语
- ✅ **多态关系**：合集可以包含不同类型的内容
- ✅ **灵活分组**：通过合集组织内容的多种展示方式
- ✅ **SEO 优化**：完善的 SEO 元数据支持
- ✅ **批量导入**：提供脚本快速导入大量数据

---

## 数据模型

### 1. BookSummaries（电子书总结）

存储电子书的总结内容。

#### 字段说明

| 字段 | 类型 | 说明 |
|------|------|------|
| `slug` | text | URL 标识符（唯一） |
| `lang` | select | 内容语言（en/zh） |
| `title` | text | 书籍标题（本地化） |
| `author` | text | 作者姓名 |
| `desc` | textarea | 简短描述（本地化） |
| `metadata` | group | 书籍元数据（页数、评分等） |
| `cover` | upload | 封面图片 |
| `coverUrl` | text | 外部封面 URL |
| `aboutAuthor` | textarea | 作者简介（本地化） |
| `summary` | richText | 书籍摘要（本地化） |
| `chapterSummary` | richText | 章节总结（本地化） |
| `review` | richText | 书评（本地化） |
| `faq` | richText | 常见问题（本地化） |
| `summaryReviews` | textarea | 读者评论摘要 |
| `rawContent` | json | 原始 JSON 数据（备份） |
| `publishedDate` | date | 发布日期 |
| `seo` | group | SEO 设置 |

#### 数据示例

```json
{
  "slug": "make-your-bed",
  "lang": "en",
  "title": "Make Your Bed",
  "author": "William H. McRaven",
  "desc": "Small things that can change your life",
  "metadata": {
    "pageCount": "144",
    "ratingValue": "4.01",
    "ratingsCount": "148.7K ratings",
    "tags": [
      { "tag": "/genres/self-help" },
      { "tag": "/genres/leadership" }
    ]
  },
  "coverUrl": "https://example.com/cover.jpg"
}
```

---

### 2. YouTubeSummaries（YouTube 视频总结）

存储 YouTube 视频的总结和笔记。

#### 字段说明

| 字段 | 类型 | 说明 |
|------|------|------|
| `slug` | text | URL 标识符（唯一） |
| `lang` | select | 内容语言（en/zh） |
| `title` | text | 视频标题（本地化） |
| `desc` | textarea | 简短描述（本地化） |
| `videoInfo` | group | 视频信息（ID、频道等） |
| `thumbnail` | upload | 缩略图 |
| `thumbnailUrl` | text | 外部缩略图 URL |
| `tags` | array | 标签 |
| `summary` | richText | 视频摘要（本地化） |
| `keyPoints` | richText | 关键要点（本地化） |
| `timestampNotes` | array | 时间戳笔记 |
| `review` | richText | 评价（本地化） |
| `rawContent` | json | 原始 JSON 数据 |
| `categories` | relationship | 分类 |
| `publishedDate` | date | 发布日期 |
| `seo` | group | SEO 设置 |

---

### 3. Collections（通用内容合集）

**核心功能：使用多态关系，支持组合不同类型的内容。**

#### 字段说明

| 字段 | 类型 | 说明 |
|------|------|------|
| `slug` | text | URL 标识符（唯一） |
| `title` | text | 合集标题（本地化） |
| `desc` | textarea | 合集描述（本地化） |
| `subtitle` | text | 副标题（本地化） |
| `collectionType` | select | 主要内容类型（mixed/books/youtube/posts/courses） |
| `image` | upload | 合集封面 |
| `imageUrl` | text | 外部图片 URL |
| `displaySettings` | group | 显示设置（图标、背景色） |
| `items` | array | **多态关系**：合集项目 |
| `itemCount` | number | 项目数量（自动计算） |
| `sortOrder` | number | 排序顺序 |
| `displayLocations` | group | 显示位置（首页、探索页、精选） |
| `stats` | group | 统计信息（浏览、点赞、收藏） |
| `publishedDate` | date | 发布日期 |
| `seo` | group | SEO 设置 |

#### items 数组结构（多态关系）

```typescript
items: [
  {
    item: {
      relationTo: 'book-summaries', // 或 'youtube-summaries', 'posts'
      value: '书籍ID'
    },
    sortOrder: 0,
    featured: false,
    note: '关于这个项目的说明'
  }
]
```

#### 数据示例

```json
{
  "slug": "leadership-essentials",
  "title": "Leadership Essentials",
  "desc": "Master the art of leadership",
  "collectionType": "mixed",
  "displaySettings": {
    "icon": "🏆",
    "bgColor": "bg-gradient-to-br from-purple-500 to-purple-600"
  },
  "items": [
    {
      "item": {
        "relationTo": "book-summaries",
        "value": "book-id-123"
      },
      "sortOrder": 0,
      "featured": true
    },
    {
      "item": {
        "relationTo": "youtube-summaries",
        "value": "video-id-456"
      },
      "sortOrder": 1,
      "featured": false
    }
  ],
  "displayLocations": {
    "showOnHomepage": true,
    "showInExplore": true,
    "featured": false
  }
}
```

---

## 数据导入

### 准备数据文件

在 `data/` 目录下创建以下 JSON 文件：

#### 1. `book-summaries.json`

```json
[
  {
    "slug": "make-your-bed",
    "lang": "en",
    "title": "Make Your Bed",
    "desc": "Small things that can change your life",
    "summary": "Book summary content...",
    "review": "Book review content...",
    "rawContent": {
      "title": "Make Your Bed",
      "author": "William H. McRaven",
      "page_count": "144",
      "ratingValue": "4.01",
      "ratingsValue": "148.7K ratings",
      "tags": ["/genres/self-help"],
      "cover": "https://example.com/cover.jpg"
    }
  }
]
```

#### 2. `book-collections.json`

```json
[
  {
    "slug": "leadership-essentials",
    "title": "Leadership Essentials",
    "desc": "Master the art of leadership",
    "image": "https://example.com/collection.jpg",
    "icon": "🏆",
    "bgColor": "bg-gradient-to-br from-purple-500 to-purple-600"
  }
]
```

#### 3. `collection-books.json`

关联合集和书籍：

```json
[
  {
    "book_slug": "make-your-bed",
    "collection_slug": "leadership-essentials"
  },
  {
    "book_slug": "another-book",
    "collection_slug": "leadership-essentials"
  }
]
```

### 运行导入脚本

```bash
# 使用 tsx 运行导入脚本
npx tsx scripts/import-books.ts
```

### 导入流程

1. **导入书籍总结** → 创建所有 BookSummaries 记录
2. **导入合集** → 创建所有 Collections 记录
3. **建立关联** → 使用多态关系将书籍添加到合集的 items 数组中

---

## 前端展示

### 首页组件

首页会自动从 Payload CMS 获取数据并展示：

```typescript
// src/app/(frontend)/[locale]/page.tsx

// 获取首页展示的合集
const collectionsResult = await payload.find({
  collection: 'collections',
  where: {
    'displayLocations.showOnHomepage': { equals: true },
    _status: { equals: 'published' },
  },
  sort: 'sortOrder',
  limit: 10,
  locale: locale,
  depth: 2, // 深度查询，获取关联的内容数据
})

// 获取推荐书籍
const bookRecommendations = await payload.find({
  collection: 'book-summaries',
  where: {
    _status: { equals: 'published' },
  },
  sort: '-publishedDate',
  limit: 6,
  locale: locale,
})
```

### 展示区域

首页包含以下内容区域：

1. **你可能也喜欢** - 显示最新的书籍推荐
2. **你感兴趣的类别** - 显示分类按钮
3. **每日微学习课程** - 快速浏览内容
4. **为你定制的合集** - 显示内容合集卡片

---

## 扩展指南

### 添加新的内容类型

假设要添加"播客总结"（Podcast Summaries）：

#### 1. 创建 Collection

```typescript
// src/collections/PodcastSummaries.ts

export const PodcastSummaries: CollectionConfig = {
  slug: 'podcast-summaries',
  admin: {
    useAsTitle: 'title',
    group: '内容管理',
  },
  fields: [
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    // 其他字段...
  ],
}
```

#### 2. 注册到 Payload

```typescript
// src/payload.config.ts

import { PodcastSummaries } from './collections/PodcastSummaries'

export default buildConfig({
  collections: [
    // ...其他 collections
    PodcastSummaries,
  ],
})
```

#### 3. 更新 Collections 的 relationTo

```typescript
// src/collections/Collections.ts

{
  name: 'items',
  type: 'array',
  fields: [
    {
      name: 'item',
      type: 'relationship',
      relationTo: [
        'book-summaries',
        'youtube-summaries',
        'posts',
        'podcast-summaries', // 添加新类型
      ],
    },
  ],
}
```

#### 4. 更新 collectionType 选项

```typescript
{
  name: 'collectionType',
  type: 'select',
  options: [
    { label: '混合内容', value: 'mixed' },
    { label: '电子书', value: 'books' },
    { label: 'YouTube 视频', value: 'youtube' },
    { label: '文章', value: 'posts' },
    { label: '播客', value: 'podcasts' }, // 添加新类型
  ],
}
```

#### 5. 运行数据库迁移

```bash
npm run payload generate
```

### 自定义首页展示

编辑 `src/components/home/HomePageContent.tsx` 来自定义首页展示逻辑：

```typescript
// 根据合集类型使用不同的展示组件
const renderCollection = (collection: any) => {
  switch (collection.collectionType) {
    case 'books':
      return <BookCollectionCard collection={collection} />
    case 'youtube':
      return <VideoCollectionCard collection={collection} />
    case 'podcasts':
      return <PodcastCollectionCard collection={collection} />
    default:
      return <MixedCollectionCard collection={collection} />
  }
}
```

---

## 最佳实践

### 1. 数据组织

- **使用有意义的 slug**：便于 SEO 和 URL 管理
- **保持原始数据**：使用 `rawContent` 字段保存完整的原始 JSON 数据
- **合理分类**：为每种内容类型创建清晰的分类体系

### 2. 性能优化

- **使用 depth 参数**：控制关联数据的查询深度，避免过度查询
- **启用缓存**：对不常变化的数据使用 ISR（增量静态再生）
- **分页查询**：大量数据时使用分页，避免一次性加载

### 3. SEO 优化

- **填写完整的 SEO 元数据**：为每个内容和合集设置 meta 标题和描述
- **使用语义化的 slug**：包含关键词的 URL 更有利于 SEO
- **多语言 hreflang**：正确设置多语言页面的 hreflang 标签

### 4. 内容管理

- **使用草稿功能**：在发布前预览和检查内容
- **设置发布日期**：便于内容的时间管理和排序
- **定期更新**：保持内容的时效性和准确性

---

## 常见问题

### Q: 如何批量更新已有的书籍数据？

A: 修改 `data/book-summaries.json` 文件，重新运行导入脚本。脚本会自动检测已存在的记录并更新它们。

### Q: 如何在合集中调整项目顺序？

A: 在 Payload Admin 后台编辑合集，调整 items 数组中每个项目的 `sortOrder` 值，数字越小越靠前。

### Q: 如何控制哪些合集显示在首页？

A: 在合集的 `displayLocations` 设置中，勾选 `showOnHomepage` 选项。

### Q: 如何支持更多语言？

A: 在 `src/payload.config.ts` 和 `src/lib/translations.ts` 中添加新的语言代码和翻译内容。

---

## 技术栈

- **Payload CMS**: 内容管理系统
- **Next.js 15**: 前端框架（App Router）
- **TypeScript**: 类型安全开发
- **Cloudflare D1**: 数据库（SQLite）
- **Cloudflare R2**: 对象存储（图片/媒体）

---

## 相关文档

- [Payload CMS 文档](https://payloadcms.com/docs)
- [Next.js 文档](https://nextjs.org/docs)
- [项目 I18n 规范](../.cursor/rules/i18n.mdc)

---

## 更新日志

- **2024-12-10**: 初始版本，支持电子书总结和通用合集
- **2024-12-10**: 添加 YouTube 视频总结支持
- **2024-12-10**: 实现多态关系，支持混合内容合集

---

**Happy Coding! 🚀**
