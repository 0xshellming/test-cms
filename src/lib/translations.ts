// 前端翻译字典
// 注意：这是前端页面使用的翻译，与 Payload Admin 的 I18n 是分开的

export const translations = {
  zh: {
    home: {
      welcome: '欢迎',
      title: 'Payload CMS 演示',
      description: '这是一个使用 Payload CMS 构建的多语言博客演示项目。',
      admin: '管理后台',
      firstForToday: '今日首要',
      learnForMinutes: '学习 15 分钟',
      freeDailyRead: '每日免费阅读',
      getItNow: '立即获取',
      youMightAlsoLike: '你可能也喜欢',
      youMightAlsoLikeSubtitle: '基于你的评分的摘要',
      categoriesInterested: '你感兴趣的类别',
      dailyMicrolearning: '每日微学习课程',
      dailyMicrolearningSubtitle: '在 3 分钟内浏览 10 个知识点',
      moreToHaveSuccessfulCareer: '更多助你成功的职业建议',
      youMightLikeForGoal: '你可能喜欢这些实现目标的摘要',
      collectionsMadeForYou: '为你定制的合集',
      rollTheDice: '掷骰子',
      rollTheDiceSubtitle: '获取随机摘要',
      giftForYou: '给你的礼物',
      explore: '探索',
      library: '图书馆',
      home: '首页',
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
    pwa: {
      install: {
        title: '安装应用',
        button: '添加到主屏幕',
        iosInstructions: '要在 iOS 设备上安装此应用，请点击分享按钮',
        iosInstructionsEnd: '然后选择"添加到主屏幕"',
        alreadyInstalled: '应用已安装',
      },
      push: {
        title: '推送通知',
        subscribed: '您已订阅推送通知',
        notSubscribed: '您尚未订阅推送通知',
        subscribe: '订阅',
        unsubscribe: '取消订阅',
        enterMessage: '输入通知消息',
        sendTest: '发送测试',
        notSupported: '此浏览器不支持推送通知',
      },
      offline: {
        message: '您当前处于离线状态，部分功能可能受限',
        dismiss: '关闭',
        title: '离线模式',
        description: '应用已缓存，可以在离线状态下访问',
        cacheStatus: '缓存状态',
        cacheSize: '缓存大小',
        clearCache: '清除缓存',
        cacheCleared: '缓存已清除',
      },
    },
  },
  en: {
    home: {
      welcome: 'Welcome',
      title: 'Payload CMS Demo',
      description: 'This is a multilingual blog demo project built with Payload CMS.',
      admin: 'Admin',
      firstForToday: 'FIRST FOR TODAY',
      learnForMinutes: 'Learn for 15 min',
      freeDailyRead: 'Free daily read',
      getItNow: 'Get it now',
      youMightAlsoLike: 'You might also like',
      youMightAlsoLikeSubtitle: 'Summaries based on your ratings',
      categoriesInterested: "Categories you're interested in",
      dailyMicrolearning: 'Daily microlearning session',
      dailyMicrolearningSubtitle: 'Tap through 10 bits of knowledge in 3 min',
      moreToHaveSuccessfulCareer: 'More to have a successful career',
      youMightLikeForGoal: 'You might like these summaries for this goal',
      collectionsMadeForYou: 'Collections made for you',
      rollTheDice: 'Roll the dice',
      rollTheDiceSubtitle: 'Get a random summary',
      giftForYou: 'Gift for you',
      explore: 'Explore',
      library: 'Library',
      home: 'Home',
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
    pwa: {
      install: {
        title: 'Install App',
        button: 'Add to Home Screen',
        iosInstructions: 'To install this app on your iOS device, tap the share button',
        iosInstructionsEnd: 'and then "Add to Home Screen"',
        alreadyInstalled: 'App is already installed',
      },
      push: {
        title: 'Push Notifications',
        subscribed: 'You are subscribed to push notifications',
        notSubscribed: 'You are not subscribed to push notifications',
        subscribe: 'Subscribe',
        unsubscribe: 'Unsubscribe',
        enterMessage: 'Enter notification message',
        sendTest: 'Send Test',
        notSupported: 'Push notifications are not supported in this browser',
      },
      offline: {
        message: 'You are currently offline. Some features may be limited',
        dismiss: 'Dismiss',
        title: 'Offline Mode',
        description: 'App is cached and can be accessed offline',
        cacheStatus: 'Cache Status',
        cacheSize: 'Cache Size',
        clearCache: 'Clear Cache',
        cacheCleared: 'Cache cleared',
      },
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
