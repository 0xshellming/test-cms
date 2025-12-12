// 前端翻译字典
// 注意：这是前端页面使用的翻译，与 Payload Admin 的 I18n 是分开的
import { translations } from '@/messages/index'

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
