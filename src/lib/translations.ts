// 前端翻译字典
// 注意：这是前端页面使用的翻译，与 Payload Admin 的 I18n 是分开的

export const translations = {
  zh: {
    home: {
      welcome: '欢迎',
      title: 'Payload CMS 演示',
      description: '这是一个使用 Payload CMS 构建的多语言博客演示项目。',
      admin: '管理后台',
    },
    blog: {
      title: '博客',
      backToHome: '返回首页',
      backToBlog: '返回博客列表',
      noArticles: '暂无发布的文章',
      goToAdmin: '前往管理后台创建文章',
      author: '作者',
      unknown: '未知作者',
      postNotFound: '文章未找到',
      blogPost: '博客文章',
      description: '查看所有博客文章',
    },
    common: {
      loading: '加载中...',
      error: '发生错误',
      switchLanguage: '切换语言',
    },
  },
  en: {
    home: {
      welcome: 'Welcome',
      title: 'Payload CMS Demo',
      description: 'This is a multilingual blog demo project built with Payload CMS.',
      admin: 'Admin',
    },
    blog: {
      title: 'Blog',
      backToHome: 'Back to Home',
      backToBlog: 'Back to Blog',
      noArticles: 'No published articles',
      goToAdmin: 'Go to admin to create articles',
      author: 'Author',
      unknown: 'Unknown',
      postNotFound: 'Post not found',
      blogPost: 'Blog Post',
      description: 'View all blog posts',
    },
    common: {
      loading: 'Loading...',
      error: 'An error occurred',
      switchLanguage: 'Switch language',
    },
  },
} as const

export type Locale = 'zh' | 'en'

// 支持的语言列表
export const locales: Locale[] = ['zh', 'en']
export const defaultLocale: Locale = 'zh'

// 类型工具：将嵌套对象转换为点分隔的键
type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`
}[keyof ObjectType & (string | number)]

// 从翻译对象中提取所有可能的键（类型安全）
export type TranslationKey = NestedKeyOf<(typeof translations)['zh']>

// 类型安全的获取翻译文本函数
export function getTranslation(locale: Locale, key: TranslationKey): string {
  const keys = key.split('.')
  let value: any = translations[locale]

  for (const k of keys) {
    value = value?.[k]
  }

  return value || key
}

// 创建类型安全的翻译辅助函数
export function createTranslator(locale: Locale) {
  return (key: TranslationKey): string => getTranslation(locale, key)
}

// 工具类型：用于获取翻译值的类型
type TranslationValue<T> = T extends object ? { [K in keyof T]: TranslationValue<T[K]> } : string

// 导出完整的翻译类型
export type Translations = TranslationValue<(typeof translations)['zh']>

// 工具函数：验证 locale 是否有效
export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale)
}
