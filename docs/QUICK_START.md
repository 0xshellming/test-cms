# 电子书系统快速开始指南

本指南帮助你快速导入电子书数据并在首页展示。

## 📦 准备工作

确保已安装依赖：

```bash
npm install
# 或
pnpm install
```

## 🚀 快速开始（3 步）

### 第 1 步：准备数据文件

在项目根目录的 `data/` 文件夹中创建三个 JSON 文件：

#### `data/book-summaries.json`

```json
[
  {
    "slug": "make-your-bed",
    "lang": "en",
    "title": "Make Your Bed",
    "desc": "Small things that can change your life...and maybe the world",
    "summary": "Admiral William H. McRaven shares ten life lessons from Navy SEAL training...",
    "review": "An inspiring book that turns military discipline into practical life advice.",
    "rawContent": {
      "title": "Make Your Bed",
      "author": "William H. McRaven",
      "page_count": "144 pages",
      "ratingValue": "4.01",
      "ratingsValue": "148.7K ratings",
      "tags": ["/genres/self-help", "/genres/personal-development", "/genres/leadership"],
      "aboutAuthor": "Admiral William H. McRaven is a highly decorated retired U.S. Navy SEAL...",
      "chapter-summary": "1. START YOUR DAY WITH A TASK COMPLETED...",
      "faq": "WHAT'S 'MAKE YOUR BED' ABOUT?...",
      "summary_reviews": "Make Your Bed received mostly positive reviews...",
      "cover": "https://images.sobrief.com/social/cover_make-your-bed_360px.jpg"
    }
  }
]
```

> 💡 **提示**：你有 2000+ 电子书数据，按照这个格式准备即可。

#### `data/book-collections.json`

```json
[
  {
    "slug": "leadership-essentials",
    "title": "Leadership Essentials",
    "desc": "Master the art of leadership with these essential reads",
    "image": "https://example.com/leadership-collection.jpg",
    "icon": "🏆",
    "bgColor": "bg-gradient-to-br from-purple-500 to-purple-600"
  },
  {
    "slug": "productivity-masters",
    "title": "Productivity Masters",
    "desc": "Learn from the best on how to get more done",
    "icon": "⚡",
    "bgColor": "bg-gradient-to-br from-orange-500 to-orange-600"
  }
]
```

> 💡 **提示**：你有 100+ 合集，按照这个格式准备。

#### `data/collection-books.json`

```json
[
  {
    "book_slug": "make-your-bed",
    "collection_slug": "leadership-essentials"
  },
  {
    "book_slug": "make-your-bed",
    "collection_slug": "productivity-masters"
  }
]
```

> 💡 **提示**：定义每本书属于哪些合集。

### 第 2 步：运行数据库迁移

首次使用需要生成数据库结构：

```bash
npm run payload generate
```

### 第 3 步：导入数据

运行导入脚本：

```bash
npx tsx scripts/import-books.ts
```

你会看到导入进度：

```
🚀 开始导入电子书数据...

✅ Payload CMS 初始化成功

📚 开始导入书籍总结...
   找到 2000 本书籍

   ✅ 创建: Make Your Bed
   ✅ 创建: Atomic Habits
   ...

📊 书籍导入完成: 成功 2000 本, 失败 0 本

📦 开始导入内容合集...
   找到 100 个合集

   ✅ 创建: Leadership Essentials
   ✅ 创建: Productivity Masters
   ...

📊 合集导入完成: 成功 100 个, 失败 0 个

🔗 开始建立合集与内容的关联关系...
   找到 3000 个关联关系

   ✅ Leadership Essentials: 关联了 50 个项目
   ✅ Productivity Masters: 关联了 30 个项目
   ...

📊 关联完成: 成功 100 个, 失败 0 个

🎉 所有数据导入完成！
```

## 🎯 验证导入结果

### 1. 访问管理后台

```bash
npm run dev
```

访问：http://localhost:3000/admin

登录后台，你会看到：

- **电子书管理** 分组
  - Book Summaries（电子书总结）
- **内容管理** 分组
  - Collections（内容合集）
  - YouTube Summaries（YouTube 总结）

### 2. 查看首页

访问：
- 中文版：http://localhost:3000/zh
- 英文版：http://localhost:3000/en

你会看到：
- ✅ "你可能也喜欢" - 显示最新的书籍
- ✅ "为你定制的合集" - 显示你创建的合集

## 🎨 自定义显示

### 控制哪些合集显示在首页

在 Payload Admin 中：

1. 进入 **Collections** → 选择一个合集
2. 找到 **Display Locations**（显示位置）部分
3. 勾选 **Show On Homepage**（在首页显示）
4. 保存

### 调整合集显示顺序

1. 进入合集编辑页面
2. 修改 **Sort Order**（排序顺序）字段
3. 数字越小，显示越靠前

### 自定义合集样式

每个合集可以设置：

- **Icon**（图标）：Emoji 图标，如 🏆、⚡、📚
- **Background Color**（背景色）：选择预设的渐变色
- **Custom Bg Color**（自定义背景色）：输入 Tailwind CSS 类名

## 🔄 更新数据

### 更新已有书籍

1. 修改 `data/book-summaries.json`
2. 重新运行导入脚本：`npx tsx scripts/import-books.ts`
3. 脚本会自动检测并更新已存在的记录

### 添加新书籍

1. 在 `data/book-summaries.json` 中添加新书籍数据
2. 运行导入脚本

### 添加书籍到合集

1. 在 `data/collection-books.json` 中添加关联关系
2. 运行导入脚本

## 📱 添加其他内容类型

系统已经支持 YouTube 视频总结，你可以类似地添加：

```typescript
// 在合集的 items 中混合不同类型的内容
{
  "items": [
    {
      "item": {
        "relationTo": "book-summaries",  // 电子书
        "value": "book-id-123"
      }
    },
    {
      "item": {
        "relationTo": "youtube-summaries",  // YouTube 视频
        "value": "video-id-456"
      }
    },
    {
      "item": {
        "relationTo": "posts",  // 文章
        "value": "post-id-789"
      }
    }
  ]
}
```

## 🐛 常见问题

### Q: 导入脚本报错 "未找到文件"

**A**: 确保你在项目根目录创建了 `data/` 文件夹和相应的 JSON 文件。

### Q: 导入成功但首页没有显示

**A**: 检查以下几点：
1. 合集的 `displayLocations.showOnHomepage` 是否为 `true`
2. 合集的 `_status` 是否为 `published`
3. 清除浏览器缓存或重启开发服务器

### Q: 如何批量修改合集的显示设置

**A**: 使用 Payload Admin 的批量编辑功能，或直接修改 JSON 文件重新导入。

### Q: 如何添加中文翻译

**A**: 在书籍数据中：
1. 创建另一个 `lang: "zh"` 的记录，使用相同的 `slug`
2. 或者在 Payload Admin 中切换语言后编辑本地化字段

## 📚 更多文档

- [完整系统架构文档](./BOOK_SYSTEM.md)
- [I18n 国际化规范](../.cursor/rules/i18n.mdc)

## 💡 下一步

- [ ] 创建书籍详情页
- [ ] 添加搜索功能
- [ ] 实现用户收藏功能
- [ ] 添加评论系统
- [ ] 实现推荐算法

---

**祝你使用愉快！有问题请参考完整文档或提 Issue。** 🚀
