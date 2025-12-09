# 首页卡片设计系统

## 🎨 设计理念

首页采用**现代卡片式设计**，强调视觉层次、品牌一致性和流畅的交互体验。所有卡片组件遵循统一的设计语言，营造高端、专业的产品感。

## 📐 卡片尺寸规范

### 大型卡片（Collection Cards / Feature Cards）
**用途**: 主推内容、精选合集、重要功能
- **尺寸**: `w-72` 或 `w-80` × `h-48` 或 `h-56`
- **场景**: 
  - 为你定制的合集
  - 主题策划内容
  - 重点推荐功能

### 中型卡片（Content Cards）
**用途**: 书籍、课程、文章等内容展示
- **尺寸**: `w-48` 或 `w-56` × `h-56` 或 `h-64`
- **场景**:
  - 书籍推荐
  - 课程列表
  - 摘要卡片
  - 可点击拉起浮层的内容

### 小型卡片（Quick Access Cards）
**用途**: 快速访问、标签、分类
- **尺寸**: `w-40` 或 `w-48` × `h-40` 或 `h-48`
- **场景**:
  - 微学习课程
  - 每日任务
  - 快速入口

## 🎨 色彩系统

### 主色调方案

#### 深色渐变卡片（推荐用于重要内容）
**特点**: 高对比度、吸引注意力、品牌感强

**常用渐变组合**:
```tsx
// 暖色系
'bg-gradient-to-br from-orange-500 to-orange-700'
'bg-gradient-to-br from-red-500 to-pink-600'
'bg-gradient-to-br from-yellow-500 to-orange-600'

// 冷色系
'bg-gradient-to-br from-blue-600 to-blue-800'
'bg-gradient-to-br from-purple-600 to-indigo-700'
'bg-gradient-to-br from-teal-500 to-cyan-600'

// 中性色系
'bg-gradient-to-br from-gray-700 to-gray-900'
'bg-gradient-to-br from-slate-600 to-slate-800'
```

**文字颜色**: 白色 `text-white`，副标题 `text-white/90`

#### 亮色渐变卡片（用于活泼内容）
**特点**: 明亮、友好、轻松

**常用渐变组合**:
```tsx
'bg-gradient-to-br from-purple-400 to-pink-500'
'bg-gradient-to-br from-blue-400 to-cyan-500'
'bg-gradient-to-br from-yellow-400 to-orange-500'
'bg-gradient-to-br from-green-400 to-emerald-500'
```

**文字颜色**: 深色 `text-gray-900`，副标题 `text-gray-700`

#### 白色背景卡片（用于传统内容）
**特点**: 简洁、专业、易读

**背景**: `bg-white`
**边框**: `border border-gray-200` 或 `border-2 border-gray-300`
**文字颜色**: `text-gray-900`

### 推荐渐变色方案（按模块）

#### 📚 书籍推荐 & 内容展示卡片
**特点**: 明亮、吸引眼球、温暖感强

```tsx
// 推荐组合（500-600 级别，明亮不刺眼）
'bg-gradient-to-br from-pink-500 to-rose-600'      // 粉红色系
'bg-gradient-to-br from-red-500 to-orange-600'     // 暖橙色系
'bg-gradient-to-br from-blue-600 to-indigo-700'    // 深蓝色系
'bg-gradient-to-br from-purple-500 to-pink-600'    // 紫粉色系
'bg-gradient-to-br from-orange-500 to-red-600'     // 橙红色系
'bg-gradient-to-br from-rose-500 to-pink-600'      // 玫瑰粉色系
```

**适用场景**: 
- 你可能也喜欢
- 每日微学习课程
- 书籍推荐
- 课程卡片

#### 🎯 重点功能 & 合集卡片
**特点**: 高端、品牌感、专业

```tsx
// 推荐组合（单色深浅渐变 or 跨色系渐变）
'bg-gradient-to-br from-orange-500 to-orange-600'  // 品牌橙色
'bg-gradient-to-br from-gray-600 to-gray-700'      // 专业灰色
'bg-gradient-to-br from-blue-500 to-indigo-600'    // 品牌蓝色
'bg-gradient-to-br from-teal-500 to-cyan-600'      // 清新青色
```

**适用场景**:
- 为你定制的合集
- 精选内容
- 主推功能
- VIP 内容

#### 💡 职业建议 & 学习内容卡片
**特点**: 明亮活泼、富有能量

```tsx
// 推荐组合（500 级别起，跨色系渐变）
'bg-gradient-to-br from-blue-500 to-yellow-500'    // 蓝黄渐变（创新）
'bg-gradient-to-br from-emerald-500 to-green-600'  // 绿色系（成长）
'bg-gradient-to-br from-blue-500 to-purple-600'    // 蓝紫渐变（智慧）
'bg-gradient-to-br from-cyan-500 to-blue-600'      // 青蓝渐变（专业）
```

**适用场景**:
- 职业建议卡片
- 摘要内容
- 学习路径
- 成长主题

### 渐变色选择指南

#### 亮度级别说明
- **400 级**: 非常明亮，适合装饰性元素，但可能影响文字对比度
- **500 级**: 明亮且平衡，推荐作为渐变起点 ✅
- **600 级**: 饱和度高，适合渐变终点或单独使用 ✅
- **700 级**: 较深，仅在需要强对比时使用
- **800 级**: 很深，不推荐用于大面积背景

#### 组合原则
1. **单色渐变**: 使用同一色系的不同亮度（如 `from-orange-500 to-orange-600`）
2. **近色渐变**: 使用相邻色系（如 `from-pink-500 to-rose-600`）
3. **跨色渐变**: 使用对比色系（如 `from-blue-500 to-yellow-500`），营造活力感
4. **起点推荐 500，终点推荐 600**: 确保明亮且不失深度

### 色彩使用原则

1. **同一模块使用统一色调**: 深色卡片使用深色渐变，浅色卡片使用浅色渐变
2. **避免混搭**: 不要在同一组卡片中混用深色和浅色背景
3. **保持对比度**: 确保文字在背景上清晰可读
4. **品牌一致性**: 主要动作使用蓝色系，强调内容使用橙色系
5. **明亮优先**: 优先使用 500-600 级别的渐变，避免过深的 700-800 级别

## 🔤 字体层次

### 标题层次
```tsx
// 特大标题（用于大型卡片）
'text-3xl font-bold'        // 30px

// 大标题（用于中型卡片）
'text-2xl font-bold'        // 24px

// 中标题（用于小型卡片）
'text-lg font-bold'         // 18px

// 小标题（用于次要信息）
'text-base font-bold'       // 16px
```

### 正文层次
```tsx
// 大正文（副标题、描述）
'text-base leading-relaxed'  // 16px

// 中正文（标准描述）
'text-sm leading-relaxed'    // 14px

// 小正文（辅助信息）
'text-xs font-medium'        // 12px
```

### 标签文字
```tsx
// 标签、徽章
'text-xs font-semibold uppercase tracking-wide'
```

## 🖼️ 图标系统

### 图标尺寸
```tsx
// 超大图标（主视觉元素）
'text-7xl'  // 72px - 用于封面/主图标

// 大图标（重要元素）
'text-5xl' or 'text-6xl'  // 48-60px - 用于卡片主图标

// 中图标（标准元素）
'text-4xl'  // 36px - 用于普通卡片图标

// 小图标（装饰元素）
'text-2xl' or 'text-3xl'  // 24-30px - 用于小卡片/标签
```

### 图标使用原则
1. **主视觉图标**: 使用 emoji 或 lucide-react 图标
2. **装饰图标**: 半透明显示 `opacity-80` 或 `opacity-20`
3. **功能图标**: 保持标准尺寸 `h-5 w-5` 或 `h-6 w-6`

## 🎭 装饰元素

### 背景装饰
所有渐变卡片都应包含装饰性背景层：

```tsx
// 顶层半透明渐变（增加深度）
<div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />

// 或者装饰性图标
<div className="absolute top-4 right-4 opacity-20">
  <Sparkles className="h-20 w-20" />
</div>
```

### 底部装饰线
用于大型卡片增加精致感：

```tsx
<div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
```

### 标签/徽章
```tsx
<span className="text-xs bg-white/70 backdrop-blur-sm px-2 py-1 rounded-md font-medium">
  GEMS
</span>
```

## 📏 间距系统

### 内边距（Padding）
```tsx
// 大卡片
'p-6' or 'p-8'  // 24px or 32px

// 中卡片
'p-5'           // 20px

// 小卡片
'p-4'           // 16px
```

### 卡片间距（Gap）
```tsx
// 卡片之间
'gap-4'   // 16px - 标准间距
'gap-6'   // 24px - 大间距（用于重要模块）
```

### 元素间距
```tsx
// 标题和副标题
'mb-3' or 'mb-4'  // 12-16px

// 段落之间
'space-y-6'       // 24px

// 列表项之间
'space-y-3'       // 12px
```

## 🎯 圆角系统

```tsx
// 超大圆角（现代感强）
'rounded-3xl'  // 24px - 浮层顶部

// 大圆角（标准卡片）
'rounded-2xl'  // 16px - 所有主要卡片

// 中圆角（内部元素）
'rounded-xl'   // 12px - 按钮、小卡片

// 小圆角（标签）
'rounded-lg' or 'rounded-md'  // 8px or 6px

// 圆形
'rounded-full' // 按钮、头像、徽章
```

## 💫 阴影系统

### 静态阴影
```tsx
'shadow-sm'   // 轻微阴影 - 次要元素
'shadow-md'   // 标准阴影 - 普通卡片
'shadow-lg'   // 明显阴影 - 重要卡片
'shadow-xl'   // 强烈阴影 - 浮层/弹窗
```

### 交互阴影
```tsx
// 卡片悬停
'hover:shadow-lg'  // 标准卡片
'hover:shadow-xl'  // 大型卡片

// 卡片静态->悬停
'shadow-md hover:shadow-lg'
'shadow-lg hover:shadow-xl'
```

## 🎬 动画与交互

### 点击反馈
```tsx
// 标准点击缩放
'active:scale-[0.98]'  // 大中型卡片
'active:scale-95'      // 小型卡片/按钮

// 完整的交互类
'cursor-pointer transition-all hover:shadow-lg active:scale-[0.98]'
```

### 悬停效果
```tsx
// 阴影加深
'hover:shadow-lg'
'hover:shadow-xl'

// 边框高亮
'hover:border-blue-500'

// 背景变化
'hover:bg-blue-50'
'hover:bg-gray-50'
```

### 过渡动画
```tsx
// 标准过渡（推荐）
'transition-all'

// 特定属性过渡
'transition-shadow'
'transition-transform'
```

## 📱 响应式规范

### 横向滚动容器
所有卡片列表使用统一的横向滚动模式：

```tsx
<div className="overflow-x-auto -mx-4 px-4">
  <div className="flex gap-4 pb-4">
    {items.map((item) => (
      <Card key={item.id} />
    ))}
  </div>
</div>
```

### 卡片宽度
- 使用固定宽度 `w-{size}`，不使用 `w-full`
- 允许横向滚动查看更多内容
- 保持卡片完整可见，不裁切

## 🎪 层次与布局

### Z-Index 层次
```tsx
z-0   // 背景装饰
z-10  // 主要内容
z-20  // 浮动元素
z-40  // 浮动操作按钮
z-50  // 固定导航栏
```

### 内容布局
```tsx
// 上下布局（推荐）
'flex flex-col justify-between'

// 内容居底
'mt-auto'

// 内容居顶
'mb-auto'
```

## ✅ 标准卡片模板

### 模板 A：深色渐变大卡片（参考 CollectionCards）
**用途**: 精选合集、主推内容

```tsx
<div className={cn(
  'flex-shrink-0 w-72 h-56 rounded-2xl shadow-lg p-6',
  'flex flex-col justify-between cursor-pointer',
  'hover:shadow-xl transition-all active:scale-[0.98]',
  'relative overflow-hidden',
  'bg-gradient-to-br from-orange-600 to-orange-800'
)}>
  {/* 装饰背景 */}
  <div className="absolute top-4 right-4 opacity-20">
    <Sparkles className="h-20 w-20 text-white" />
  </div>
  
  {/* 内容 */}
  <div className="relative z-10">
    <h3 className="text-3xl font-bold text-white leading-tight mb-3">
      标题文字
    </h3>
    <p className="text-base text-white/90 leading-relaxed">
      副标题或描述文字
    </p>
  </div>
  
  {/* 主图标 */}
  <div className="relative z-10 flex items-center justify-center h-24">
    <div className="text-6xl opacity-80">💎</div>
  </div>
  
  {/* 底部装饰线 */}
  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
</div>
```

### 模板 B：深色渐变中卡片
**用途**: 书籍、课程、可点击内容

```tsx
<div className={cn(
  'flex-shrink-0 w-56 h-64 rounded-2xl shadow-lg p-6',
  'flex flex-col cursor-pointer',
  'hover:shadow-xl transition-all active:scale-[0.98]',
  'relative overflow-hidden',
  'bg-gradient-to-br from-purple-600 to-indigo-700'
)}>
  {/* 装饰背景 */}
  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
  
  {/* 内容 */}
  <div className="relative z-10 flex flex-col h-full">
    {/* 顶部图标 */}
    <div className="text-5xl mb-4">📚</div>
    
    {/* 标签 */}
    <span className="text-xs bg-white/70 backdrop-blur-sm px-2 py-1 rounded-md font-medium self-start mb-3">
      SUMMARY
    </span>
    
    {/* 标题 */}
    <div className="mt-auto">
      <h3 className="text-xl font-bold text-white line-clamp-2 mb-2">
        内容标题
      </h3>
      <p className="text-sm text-white/80 line-clamp-2">
        简短描述文字
      </p>
    </div>
  </div>
</div>
```

### 模板 C：亮色渐变小卡片
**用途**: 微学习、快速入口

```tsx
<div className={cn(
  'flex-shrink-0 w-48 h-48 rounded-2xl shadow-md p-5',
  'flex flex-col justify-between cursor-pointer',
  'hover:shadow-lg transition-all active:scale-[0.98]',
  'relative overflow-hidden',
  'bg-gradient-to-br from-blue-400 to-cyan-500'
)}>
  {/* 装饰背景 */}
  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
  
  {/* 内容 */}
  <div className="relative z-10 flex flex-col h-full">
    <div className="text-5xl mb-3">🎯</div>
    <h3 className="font-bold text-lg text-gray-900 mt-auto line-clamp-2">
      卡片标题
    </h3>
  </div>
</div>
```

## 🚫 避免的设计

### ❌ 不推荐的做法

1. **混合色调**: 不要在同一组卡片中混用深色和白色背景
2. **过小的文字**: 避免小于 12px 的文字
3. **过浅的对比度**: 确保文字在背景上清晰可读（对比度 > 4.5:1）
4. **不一致的圆角**: 同一组卡片使用统一的圆角大小
5. **过多装饰**: 装饰元素不应喧宾夺主
6. **固定宽度容器**: 避免使用 `w-full`，应使用固定宽度并允许横向滚动

### ✅ 推荐的做法

1. **统一风格**: 同一模块的卡片使用统一的设计风格
2. **清晰层次**: 使用字体大小和颜色建立清晰的信息层次
3. **适当留白**: 不要过度填充内容，保持呼吸感
4. **一致的交互**: 所有可点击元素都应有明确的反馈
5. **品牌色**: 合理使用品牌主色（蓝色）和强调色（橙色）

## 📋 设计检查清单

创建新卡片组件时，检查以下项目：

- [ ] 卡片尺寸符合规范（大/中/小）
- [ ] 使用了合适的渐变背景
- [ ] 添加了装饰性背景层
- [ ] 文字颜色对比度足够
- [ ] 圆角使用 `rounded-2xl`
- [ ] 阴影使用 `shadow-lg` 或 `shadow-md`
- [ ] 包含悬停效果 `hover:shadow-xl`
- [ ] 包含点击反馈 `active:scale-[0.98]`
- [ ] 添加了过渡动画 `transition-all`
- [ ] 图标尺寸合适（大卡片用 `text-6xl`，中卡片用 `text-5xl`）
- [ ] 内容布局合理（使用 `flex flex-col justify-between`）
- [ ] 横向滚动容器设置正确
- [ ] 固定宽度而非响应式宽度
- [ ] 相对定位用于叠加装饰元素

## 🎨 实际应用示例

### 适合深色渐变的场景
- 精选合集
- VIP 内容
- 主推课程
- 品牌宣传
- 行动召唤

### 适合亮色渐变的场景
- 日常任务
- 微学习
- 快速入口
- 轻松内容
- 趣味功能

### 适合白色背景的场景
- 书籍列表
- 文章卡片
- 数据展示
- 表单内容
- 传统内容

## 📖 总结

遵循这套设计系统可以确保：

1. **视觉一致性**: 所有卡片组件风格统一
2. **品牌识别**: 强化品牌形象和专业感
3. **用户体验**: 提供流畅的交互反馈
4. **可维护性**: 便于团队协作和后期维护
5. **可扩展性**: 易于添加新的卡片类型

**核心原则**: 大气、精致、统一、现代 ✨
