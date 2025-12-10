import type { CollectionConfig } from 'payload'

/**
 * YouTube 视频总结 Collection
 *
 * 用于存储 YouTube 视频的总结和笔记
 */
export const YouTubeSummaries: CollectionConfig = {
  slug: 'youtube-summaries',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'channel', 'lang', '_status', 'publishedDate'],
    group: '内容管理',
  },
  access: {
    read: () => true,
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
        description: 'URL 友好的视频标识符',
      },
    },
    {
      name: 'lang',
      type: 'select',
      required: true,
      defaultValue: 'en',
      options: [
        { label: 'English', value: 'en' },
        { label: '中文', value: 'zh' },
      ],
      admin: {
        description: '视频总结的语言',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        description: '视频标题',
      },
    },
    {
      name: 'desc',
      type: 'textarea',
      localized: true,
      admin: {
        description: '简短描述',
      },
    },

    // YouTube 视频信息
    {
      name: 'videoInfo',
      type: 'group',
      label: '视频信息',
      fields: [
        {
          name: 'videoId',
          type: 'text',
          required: true,
          label: 'YouTube 视频 ID',
          admin: {
            description: '例如：dQw4w9WgXcQ',
          },
        },
        {
          name: 'videoUrl',
          type: 'text',
          label: '视频 URL',
          admin: {
            description: '完整的 YouTube 视频链接',
          },
        },
        {
          name: 'channel',
          type: 'text',
          label: '频道名称',
        },
        {
          name: 'channelUrl',
          type: 'text',
          label: '频道链接',
        },
        {
          name: 'duration',
          type: 'text',
          label: '视频时长',
          admin: {
            description: '例如：15:30',
          },
        },
        {
          name: 'viewCount',
          type: 'text',
          label: '观看次数',
        },
        {
          name: 'likeCount',
          type: 'text',
          label: '点赞次数',
        },
        {
          name: 'publishDate',
          type: 'date',
          label: '发布日期',
        },
      ],
    },

    // 缩略图
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
      label: '缩略图',
    },
    {
      name: 'thumbnailUrl',
      type: 'text',
      label: '外部缩略图 URL',
      admin: {
        description: 'YouTube 视频缩略图 URL',
      },
    },

    // 视频标签
    {
      name: 'tags',
      type: 'array',
      label: '标签',
      fields: [
        {
          name: 'tag',
          type: 'text',
        },
      ],
    },

    // 视频摘要
    {
      name: 'summary',
      type: 'richText',
      required: true,
      localized: true,
      label: '视频摘要',
      admin: {
        description: '视频内容的简短摘要',
      },
    },

    // 详细笔记/要点
    {
      name: 'keyPoints',
      type: 'richText',
      localized: true,
      label: '关键要点',
      admin: {
        description: '视频的关键要点和重点内容',
      },
    },

    // 时间戳笔记
    {
      name: 'timestampNotes',
      type: 'array',
      label: '时间戳笔记',
      admin: {
        description: '按时间戳组织的笔记',
      },
      fields: [
        {
          name: 'timestamp',
          type: 'text',
          required: true,
          label: '时间戳',
          admin: {
            description: '例如：05:30',
          },
        },
        {
          name: 'note',
          type: 'textarea',
          required: true,
          localized: true,
          label: '笔记内容',
        },
      ],
    },

    // 评论
    {
      name: 'review',
      type: 'richText',
      localized: true,
      label: '评价',
    },

    // 完整内容（JSON格式存储）
    {
      name: 'rawContent',
      type: 'json',
      label: '原始内容（JSON）',
      admin: {
        description: '完整的视频数据 JSON，用于数据导入和备份',
        readOnly: true,
      },
    },

    // 分类
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      label: '分类',
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
      ],
    },
  ],
  versions: {
    drafts: true,
  },
}
