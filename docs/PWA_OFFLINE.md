# PWA 离线访问功能说明

## 📋 功能概述

本项目已实现完整的 PWA（Progressive Web App）离线访问功能，允许用户在离线状态下访问已缓存的内容。

## ✨ 主要特性

### 1. 智能缓存策略

Service Worker 实现了多种缓存策略，根据资源类型自动选择：

- **Cache First（缓存优先）**: 适用于静态资源（图片、字体、CSS、JS）
  - 优先从缓存读取，提升加载速度
  - 缓存未命中时从网络获取并更新缓存

- **Network First（网络优先）**: 适用于 API 请求
  - 优先从网络获取最新数据
  - 网络失败时使用缓存作为后备

- **Stale While Revalidate（后台更新）**: 适用于 HTML 页面
  - 立即返回缓存内容，提升用户体验
  - 后台更新缓存，下次访问使用最新内容

### 2. 离线状态检测

- 自动检测网络连接状态
- 显示离线提示横幅
- 在离线状态下仍可访问已缓存的内容

### 3. 自动更新机制

- Service Worker 自动检查更新
- 新版本安装后提示用户刷新
- 支持强制更新和跳过等待

## 🚀 使用方法

### 开发环境测试

1. **启动开发服务器**:
   ```bash
   npm run dev
   ```

2. **访问应用**:
   - 打开浏览器访问 `http://localhost:3000`
   - 浏览几个页面，让 Service Worker 缓存内容

3. **测试离线功能**:
   - 打开浏览器开发者工具（F12）
   - 进入 Network 标签
   - 选择 "Offline" 模式
   - 刷新页面，应该仍能看到已缓存的内容

4. **检查 Service Worker**:
   - 打开开发者工具 > Application > Service Workers
   - 确认 Service Worker 已注册并激活
   - 查看 Cache Storage 中的缓存内容

### 生产环境部署

1. **构建应用**:
   ```bash
   npm run build
   ```

2. **部署到 HTTPS 服务器**:
   - PWA 功能需要 HTTPS（本地开发可以使用 localhost）
   - 确保 `public/sw.js` 文件被正确部署

3. **验证功能**:
   - 访问应用并浏览页面
   - 检查 Service Worker 是否注册成功
   - 测试离线访问功能

## 📁 文件结构

```
src/
├── components/
│   └── pwa/
│       ├── ServiceWorkerRegistration.tsx  # Service Worker 注册组件
│       ├── InstallPrompt.tsx              # 安装提示组件
│       └── PushNotificationManager.tsx    # 推送通知管理器
├── app/
│   ├── manifest.ts                        # Web App Manifest
│   └── (frontend)/
│       └── [locale]/
│           └── layout.tsx                 # 集成 PWA 组件
public/
└── sw.js                                  # Service Worker 主文件
```

## 🔧 配置说明

### Service Worker 缓存版本

在 `public/sw.js` 中修改 `CACHE_VERSION` 可以强制更新所有缓存：

```javascript
const CACHE_VERSION = 'v1'  // 更新此值以强制更新缓存
```

### 预缓存资源

在 `public/sw.js` 的 `PRECACHE_URLS` 数组中添加需要预缓存的资源：

```javascript
const PRECACHE_URLS = [
  '/',
  '/icon-192x192.png',
  '/icon-512x512.png',
  // 添加更多需要预缓存的资源
]
```

### 缓存策略自定义

在 `public/sw.js` 的 `getStrategy` 函数中自定义不同资源的缓存策略：

```javascript
function getStrategy(request) {
  const url = new URL(request.url)
  
  // 自定义规则
  if (url.pathname.startsWith('/api/')) {
    return networkFirst(request)  // API 使用网络优先
  }
  
  // ... 其他规则
}
```

## 🎯 缓存策略详解

### Cache First（缓存优先）

**适用场景**: 静态资源、图片、字体

**工作流程**:
1. 检查缓存
2. 如果缓存存在，直接返回
3. 如果缓存不存在，从网络获取
4. 将网络响应存入缓存

**优点**: 加载速度快，减少网络请求

### Network First（网络优先）

**适用场景**: API 请求、动态内容

**工作流程**:
1. 尝试从网络获取
2. 如果成功，更新缓存并返回
3. 如果失败，从缓存返回（如果存在）

**优点**: 确保数据最新，离线时仍可用

### Stale While Revalidate（后台更新）

**适用场景**: HTML 页面

**工作流程**:
1. 立即返回缓存内容
2. 后台从网络获取最新内容
3. 更新缓存供下次使用

**优点**: 快速响应，后台保持内容最新

## 🔍 调试技巧

### 1. 查看 Service Worker 状态

```javascript
// 在浏览器控制台执行
navigator.serviceWorker.getRegistrations().then(registrations => {
  console.log('Service Workers:', registrations)
})
```

### 2. 清除缓存

```javascript
// 清除所有缓存
caches.keys().then(names => {
  names.forEach(name => caches.delete(name))
})
```

### 3. 强制更新 Service Worker

```javascript
// 取消注册并重新注册
navigator.serviceWorker.getRegistrations().then(registrations => {
  registrations.forEach(registration => registration.unregister())
})
```

### 4. 检查缓存内容

在浏览器开发者工具中：
- Application > Cache Storage > 查看缓存的内容
- Application > Service Workers > 查看 Service Worker 状态

## ⚠️ 注意事项

1. **HTTPS 要求**: 
   - 生产环境必须使用 HTTPS
   - 本地开发可以使用 `localhost` 或 `127.0.0.1`

2. **缓存大小限制**:
   - 浏览器对缓存大小有限制（通常 50MB-100MB）
   - 定期清理旧缓存避免超出限制

3. **更新机制**:
   - Service Worker 更新后需要刷新页面才能生效
   - 可以通过 `skipWaiting()` 强制立即激活

4. **Admin 后台**:
   - Payload Admin 路径 (`/admin`) 被排除在缓存之外
   - 确保管理后台始终使用最新版本

5. **API 请求**:
   - API 请求使用 Network First 策略
   - 离线时可能无法获取最新数据

## 🐛 常见问题

### Q: Service Worker 没有注册？

**A**: 检查以下几点：
- 确保使用 HTTPS 或 localhost
- 检查浏览器是否支持 Service Worker
- 查看浏览器控制台的错误信息

### Q: 离线时看不到内容？

**A**: 确保：
- 已访问过需要离线访问的页面
- Service Worker 已成功注册
- 资源已被缓存（检查 Cache Storage）

### Q: 更新后看不到新内容？

**A**: 
- 清除浏览器缓存
- 更新 `CACHE_VERSION` 强制更新
- 取消注册并重新注册 Service Worker

### Q: 缓存占用空间太大？

**A**: 
- 减少预缓存资源列表
- 实现缓存清理机制
- 使用更激进的缓存过期策略

## 📚 相关资源

- [MDN: Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Web.dev: PWA](https://web.dev/progressive-web-apps/)
- [Next.js: Metadata API](https://nextjs.org/docs/app/api-reference/file-conventions/metadata)

## 🔄 更新日志

### v1.0.0 (2024)
- ✅ 实现基础离线缓存功能
- ✅ 添加多种缓存策略
- ✅ 实现离线状态检测
- ✅ 添加离线提示横幅
- ✅ 支持 Service Worker 自动更新

