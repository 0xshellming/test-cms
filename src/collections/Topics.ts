import { CollectionConfig } from 'payload'
import { seedTopics } from '../endpoints/seedTopics'

export const Topics: CollectionConfig = {
  slug: 'topics',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'icon'],
    group: '内容管理',
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  labels: {
    singular: 'Topic',
    plural: 'Topics',
  },
  endpoints: [
    {
      path: '/seed',
      method: 'post',
      handler: seedTopics,
    },
  ],
  fields: [
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'Unique English Identifier (e.g., career)',
      },
    },
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true, // Support localization if needed, though user requirement said "Chinese Name" specifically, keeping it simple first.
      admin: {
        description: 'Display Name (Chinese)',
      },
    },
    {
      name: 'icon',
      type: 'text',
      label: 'Icon (Emoji)',
    },
    {
      name: 'keywords',
      type: 'array',
      label: 'Associated Keywords',
      admin: {
        description: 'Keywords to automatically map Books to this Topic',
      },
      fields: [
        {
          name: 'keyword',
          type: 'text',
        },
      ],
    },
    {
      name: 'backgroundColor',
      type: 'text',
      label: 'Background Color',
      admin: {
        description: 'Hex code for background color (e.g., #F3E5F5)',
      },
    },
    {
      name: 'sort',
      type: 'number',
      label: 'Sort Order',
      defaultValue: 0,
      admin: {
        description: 'Order for sorting topics (lower numbers first)',
      },
    },
  ],
}
