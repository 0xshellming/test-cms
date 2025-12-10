import type { CollectionConfig } from 'payload'

/**
 * Collections - 通用内容合集
 *
 * 支持多种内容类型的合集：
 * - 电子书总结 (book-summaries)
 * - YouTube 视频总结 (youtube-summaries)
 * - 文章 (posts)
 * - 未来可扩展更多类型
 */
export const Collections: CollectionConfig = {
  slug: 'collections',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'collectionType', 'itemCount', '_status', 'publishedDate'],
    group: '内容管理',
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    // 基本信息
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'URL 友好的合集标识符（例如：leadership-books）',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        description: '合集标题',
      },
    },
    {
      name: 'desc',
      type: 'textarea',
      required: true,
      localized: true,
      admin: {
        description: '合集描述',
      },
    },
    {
      name: 'subtitle',
      type: 'text',
      localized: true,
      admin: {
        description: '副标题（可选）',
      },
    },

    // 合集类型
    {
      name: 'collectionType',
      type: 'select',
      required: true,
      defaultValue: 'mixed',
      options: [
        { label: '混合内容', value: 'mixed' },
        { label: '电子书', value: 'books' },
        { label: 'YouTube 视频', value: 'youtube' },
        { label: '文章', value: 'posts' },
        { label: '课程', value: 'courses' },
      ],
      admin: {
        description: '合集包含的主要内容类型',
      },
    },

    // 合集图片
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: '合集封面',
      admin: {
        description: '合集的封面图片',
      },
    },
    {
      name: 'imageUrl',
      type: 'text',
      label: '外部图片URL',
      admin: {
        description: '如果没有上传图片，可以使用外部 URL',
      },
    },

    // 视觉设计
    {
      name: 'displaySettings',
      type: 'group',
      label: '显示设置',
      fields: [
        {
          name: 'icon',
          type: 'text',
          label: '图标 Emoji',
          admin: {
            description: '用于显示的 Emoji 图标（例如：💬、✅、🏆）',
          },
        },
        {
          name: 'bgColor',
          type: 'select',
          label: '背景颜色',
          defaultValue: 'bg-gradient-to-br from-blue-500 to-blue-600',
          options: [
            { label: '橙色渐变', value: 'bg-gradient-to-br from-orange-500 to-orange-600' },
            { label: '灰色渐变', value: 'bg-gradient-to-br from-gray-600 to-gray-700' },
            { label: '蓝色渐变', value: 'bg-gradient-to-br from-blue-500 to-blue-600' },
            { label: '紫色渐变', value: 'bg-gradient-to-br from-purple-500 to-purple-600' },
            { label: '绿色渐变', value: 'bg-gradient-to-br from-green-500 to-green-600' },
            { label: '红色渐变', value: 'bg-gradient-to-br from-red-500 to-red-600' },
            { label: '粉色渐变', value: 'bg-gradient-to-br from-pink-500 to-pink-600' },
            { label: '靛蓝渐变', value: 'bg-gradient-to-br from-indigo-500 to-indigo-600' },
            { label: '黄色渐变', value: 'bg-gradient-to-br from-yellow-500 to-yellow-600' },
            { label: '青色渐变', value: 'bg-gradient-to-br from-cyan-500 to-cyan-600' },
          ],
        },
        {
          name: 'customBgColor',
          type: 'text',
          label: '自定义背景颜色',
          admin: {
            description: '如需其他颜色，输入 Tailwind CSS 类名',
          },
        },
      ],
    },

    // 多态关系 - 合集项目
    {
      name: 'items',
      type: 'array',
      label: '合集项目',
      admin: {
        description: '添加各种类型的内容到合集中',
      },
      fields: [
        {
          name: 'item',
          type: 'relationship',
          relationTo: ['book-summaries', 'youtube-summaries', 'posts'],
          required: true,
          label: '内容项',
        },
        {
          name: 'sortOrder',
          type: 'number',
          label: '排序',
          defaultValue: 0,
          admin: {
            description: '数字越小越靠前',
          },
        },
        {
          name: 'featured',
          type: 'checkbox',
          label: '精选',
          defaultValue: false,
          admin: {
            description: '标记为精选项目',
          },
        },
        {
          name: 'note',
          type: 'textarea',
          label: '备注',
          localized: true,
          admin: {
            description: '关于这个项目在合集中的说明',
          },
        },
      ],
    },

    // 项目数量（自动计算）
    {
      name: 'itemCount',
      type: 'number',
      label: '项目数量',
      admin: {
        description: '合集中的项目数量（自动计算）',
        readOnly: true,
      },
      hooks: {
        beforeChange: [
          ({ data }) => {
            if (data?.items && Array.isArray(data.items)) {
              return data.items.length
            }
            return 0
          },
        ],
      },
    },

    // 排序和显示
    {
      name: 'sortOrder',
      type: 'number',
      label: '排序顺序',
      defaultValue: 0,
      admin: {
        description: '数字越小越靠前显示',
      },
    },

    // 显示位置
    {
      name: 'displayLocations',
      type: 'group',
      label: '显示位置',
      fields: [
        {
          name: 'showOnHomepage',
          type: 'checkbox',
          label: '在首页显示',
          defaultValue: true,
        },
        {
          name: 'showInExplore',
          type: 'checkbox',
          label: '在探索页显示',
          defaultValue: true,
        },
        {
          name: 'featured',
          type: 'checkbox',
          label: '精选合集',
          defaultValue: false,
          admin: {
            description: '标记为精选合集，会在首页突出显示',
          },
        },
      ],
    },

    // 统计信息
    {
      name: 'stats',
      type: 'group',
      label: '统计信息',
      admin: {
        description: '合集的统计数据',
      },
      fields: [
        {
          name: 'viewCount',
          type: 'number',
          label: '浏览次数',
          defaultValue: 0,
        },
        {
          name: 'likeCount',
          type: 'number',
          label: '点赞次数',
          defaultValue: 0,
        },
        {
          name: 'bookmarkCount',
          type: 'number',
          label: '收藏次数',
          defaultValue: 0,
        },
      ],
    },

    // 发布日期
    {
      name: 'publishedDate',
      type: 'date',
      label: '发布日期',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },

    // SEO 优化
    {
      name: 'seo',
      type: 'group',
      label: 'SEO 设置',
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          localized: true,
          label: 'Meta 标题',
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          localized: true,
          label: 'Meta 描述',
        },
        {
          name: 'keywords',
          type: 'text',
          localized: true,
          label: '关键词',
        },
      ],
    },
  ],
  versions: {
    drafts: true,
  },
}
