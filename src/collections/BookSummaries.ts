import type { CollectionConfig } from 'payload'

export const BookSummaries: CollectionConfig = {
  slug: 'book-summaries',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'author', 'lang', '_status', 'publishedDate'],
    group: '电子书管理',
  },
  access: {
    read: () => true,
    create: () => true, // 添加这行
    update: () => true, // 添加这行
    delete: () => true, // 添加这行（可选）
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
        description: 'URL 友好的书籍标识符（例如：make-your-bed）',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        description: '书籍标题',
      },
    },
    {
      name: 'author',
      type: 'text',
      required: true,
      admin: {
        description: '作者姓名',
      },
    },
    {
      name: 'desc',
      type: 'textarea',
      localized: true,
      admin: {
        description: '简短描述，用于列表页和 SEO',
      },
    },

    // 书籍元数据
    {
      name: 'metadata',
      type: 'group',
      label: '书籍元数据',
      fields: [
        {
          name: 'pageCount',
          type: 'text',
          label: '页数',
        },
        {
          name: 'ratingValue',
          type: 'text',
          label: '评分',
        },
        {
          name: 'ratingsCount',
          type: 'text',
          label: '评分人数',
        },
        {
          name: 'tags',
          type: 'array',
          label: '标签/类别',
          fields: [
            {
              name: 'tag',
              type: 'text',
            },
          ],
        },
      ],
    },

    // 封面图片
    {
      name: 'cover',
      type: 'upload',
      relationTo: 'media',
      label: '封面图片',
      admin: {
        description: '书籍封面图片，推荐尺寸：360px 宽',
      },
    },
    {
      name: 'coverUrl',
      type: 'text',
      label: '外部封面URL',
      admin: {
        description: '如果没有上传封面，可以使用外部 URL',
      },
    },

    // 作者简介
    {
      name: 'aboutAuthor',
      type: 'textarea',
      label: '作者简介',
      localized: true,
    },

    // 总结内容（短版）
    {
      name: 'summary',
      type: 'textarea',
      localized: true,
      required: true,
      label: '书籍摘要',
      admin: {
        description: '你会获得, Markdown 格式, Bullet List 格式',
      },
    },

    // 关键要点
    {
      name: 'keypoints',
      type: 'array',
      label: '关键要点',
      admin: {
        description: '书籍的关键要点列表',
      },
      fields: [
        {
          name: 'index',
          type: 'number',
          required: true,
          label: '序号',
          admin: {
            description: '要点的序号',
          },
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
          label: '标题',
          admin: {
            description: '要点的标题',
          },
        },
        {
          name: 'content',
          type: 'textarea',
          required: true,
          localized: true,
          label: '内容',
          admin: {
            description: '要点的详细内容',
          },
        },
      ],
    },

    // 详细章节总结
    {
      name: 'chapterSummary',
      type: 'textarea',
      localized: true,
      label: '章节总结',
      admin: {
        description: '详细的章节内容总结',
      },
    },

    // 书评
    {
      name: 'review',
      type: 'textarea',
      localized: true,
      label: '书评',
    },

    // FAQ
    {
      name: 'faq',
      type: 'array',
      label: '常见问题',
      admin: {
        description: '书籍的常见问题列表',
      },
      fields: [
        {
          name: 'index',
          type: 'number',
          required: true,
          label: '序号',
          admin: {
            description: '问题的序号',
          },
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
          label: '标题',
          admin: {
            description: '问题的标题',
          },
        },
        {
          name: 'content',
          type: 'textarea',
          required: true,
          localized: true,
          label: '内容',
          admin: {
            description: '问题的详细内容',
          },
        },
      ],
    },

    // 读者评论摘要
    {
      name: 'summaryReviews',
      type: 'textarea',
      localized: true,
      label: '读者评论摘要',
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
