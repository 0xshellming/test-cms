// Service Worker 版本号 - 更新此值以强制更新缓存
const CACHE_VERSION = 'v5'
const CACHE_NAME = `pwa-cache-${CACHE_VERSION}`

// 需要预缓存的资源列表
const PRECACHE_URLS = ['/', '/icon-192x192.png', '/icon-512x512.png']

// 安装事件 - 预缓存关键资源
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...')
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Precaching files')
      return cache.addAll(PRECACHE_URLS).catch((err) => {
        console.error('[Service Worker] Precache failed:', err)
      })
    }),
  )
  // 强制激活新的 Service Worker
  self.skipWaiting()
})

// 激活事件 - 清理旧缓存
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...')
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', cacheName)
            return caches.delete(cacheName)
          }
        }),
      )
    }),
  )
  // 立即控制所有客户端
  return self.clients.claim()
})

// 获取策略：Network First，失败时使用缓存
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request)
    // 如果网络请求成功，更新缓存
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME)
      cache.put(request, networkResponse.clone())
    }
    return networkResponse
  } catch (error) {
    console.log('[Service Worker] Network failed, using cache:', request.url)
    const cachedResponse = await caches.match(request)
    if (cachedResponse) {
      return cachedResponse
    }
    // 如果是导航请求且没有缓存，返回离线页面
    if (request.mode === 'navigate') {
      return caches.match('/')
    }
    throw error
  }
}

// 获取策略：Cache First，缓存未命中时使用网络
async function cacheFirst(request) {
  const cachedResponse = await caches.match(request)
  if (cachedResponse) {
    return cachedResponse
  }
  try {
    const networkResponse = await fetch(request)
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME)
      cache.put(request, networkResponse.clone())
    }
    return networkResponse
  } catch (error) {
    console.error('[Service Worker] Fetch failed:', error)
    throw error
  }
}

// 获取策略：Stale While Revalidate - 立即返回缓存，后台更新
async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME)
  const cachedResponse = await caches.match(request)

  const fetchPromise = fetch(request).then((networkResponse) => {
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone())
    }
    return networkResponse
  })

  return cachedResponse || fetchPromise
}

// 判断资源类型并选择合适的策略
function getStrategy(request) {
  const url = new URL(request.url)

  // 静态资源（图片、字体、CSS、JS）使用 Cache First
  if (url.pathname.match(/\.(jpg|jpeg|png|gif|webp|svg|ico|woff|woff2|ttf|eot|css|js)$/)) {
    return cacheFirst(request)
  }

  // API 请求使用 Network First
  if (url.pathname.startsWith('/api/')) {
    return networkFirst(request)
  }

  // HTML 页面使用 Stale While Revalidate
  if (request.mode === 'navigate' || request.headers.get('accept')?.includes('text/html')) {
    return staleWhileRevalidate(request)
  }

  // 默认使用 Network First
  return networkFirst(request)
}

// 拦截 fetch 请求
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // 跳过非 GET 请求
  if (request.method !== 'GET') {
    return
  }

  // 跳过 Chrome 扩展和浏览器内部请求
  if (url.protocol === 'chrome-extension:' || url.protocol === 'chrome:') {
    return
  }

  // 跳过 Payload Admin 相关请求（避免缓存管理后台）
  if (url.pathname.startsWith('/admin')) {
    return
  }

  event.respondWith(getStrategy(request))
})

// 推送通知处理
self.addEventListener('push', function (event) {
  if (event.data) {
    const data = event.data.json()
    const options = {
      body: data.body,
      icon: data.icon || '/icon-192x192.png',
      badge: '/icon-192x192.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: '2',
      },
    }
    event.waitUntil(self.registration.showNotification(data.title, options))
  }
})

// 通知点击处理
self.addEventListener('notificationclick', function (event) {
  console.log('Notification click received.')
  event.notification.close()

  // 打开应用主页
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (clientList) {
      // 如果已经有打开的窗口，聚焦它
      for (let i = 0; i < clientList.length; i++) {
        const client = clientList[i]
        if (client.url === '/' && 'focus' in client) {
          return client.focus()
        }
      }
      // 否则打开新窗口
      if (clients.openWindow) {
        return clients.openWindow('/')
      }
    }),
  )
})

// 消息处理 - 用于与主线程通信
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
  if (event.data && event.data.type === 'CACHE_URLS') {
    event.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.addAll(event.data.urls)
      }),
    )
  }
})
