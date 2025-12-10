export const pwa = {
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
} as const

