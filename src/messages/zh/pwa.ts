export const pwa = {
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
} as const
