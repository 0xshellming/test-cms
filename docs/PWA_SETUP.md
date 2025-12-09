# PWA 设置指南

本文档说明如何完成 PWA（Progressive Web Application）的设置。

## 1. 生成图标文件

PWA 需要以下图标文件，请将它们放置在 `public/` 目录下：

- `icon-192x192.png` - 192x192 像素的图标
- `icon-512x512.png` - 512x512 像素的图标

### 推荐工具

你可以使用以下工具生成图标：

1. [RealFaviconGenerator](https://realfavicongenerator.net/) - 在线图标生成器
2. [PWA Asset Generator](https://github.com/onderceylan/pwa-asset-generator) - CLI 工具
3. [Favicon.io](https://favicon.io/) - 免费图标生成器

### 使用 RealFaviconGenerator

1. 访问 https://realfavicongenerator.net/
2. 上传你的应用图标（建议至少 512x512 像素）
3. 配置 PWA 设置
4. 下载生成的文件
5. 将 `android-chrome-192x192.png` 重命名为 `icon-192x192.png`
6. 将 `android-chrome-512x512.png` 重命名为 `icon-512x512.png`
7. 将这两个文件复制到 `public/` 目录

## 2. 生成 VAPID Keys

VAPID（Voluntary Application Server Identification）密钥用于 Web Push 通知。

### 安装 web-push CLI

```bash
npm install -g web-push
```

### 生成密钥

```bash
web-push generate-vapid-keys
```

### 配置环境变量

将生成的密钥添加到 `.env.local` 文件：

```env
NEXT_PUBLIC_VAPID_PUBLIC_KEY=你的公钥
VAPID_PRIVATE_KEY=你的私钥
VAPID_EMAIL=mailto:your-email@example.com
```

**重要提示：**
- `NEXT_PUBLIC_VAPID_PUBLIC_KEY` 是公开的，可以安全地暴露在客户端代码中
- `VAPID_PRIVATE_KEY` 必须保密，只能在服务器端使用
- 不要将 `.env.local` 文件提交到版本控制系统

## 3. 测试 PWA 功能

### 本地 HTTPS 测试

推送通知需要 HTTPS 连接。在本地开发时，使用：

```bash
npm run dev -- --experimental-https
```

或者：

```bash
next dev --experimental-https
```

### 浏览器设置

确保浏览器允许通知：

1. Chrome/Edge: 设置 > 隐私和安全 > 网站设置 > 通知
2. Firefox: 设置 > 隐私与安全 > 权限 > 通知
3. Safari: 系统偏好设置 > 通知

### 测试清单

- [ ] 应用可以安装到主屏幕
- [ ] Service Worker 已注册
- [ ] 可以订阅推送通知
- [ ] 可以接收推送通知
- [ ] 点击通知可以打开应用

## 4. 生产环境注意事项

### 数据库存储

当前实现使用内存存储订阅信息。在生产环境中，你应该：

1. 将订阅信息存储在数据库中
2. 为每个用户管理多个订阅（多设备支持）
3. 实现订阅过期和清理机制

### 示例数据库模式（Prisma）

```prisma
model PushSubscription {
  id        String   @id @default(cuid())
  endpoint String   @unique
  keys      Json
  userId    String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### 批量发送通知

在生产环境中，你可能需要向多个用户发送通知。确保：

1. 使用队列系统处理大量通知
2. 实现重试机制
3. 处理无效订阅（410 状态码）

## 5. 自定义配置

### 修改 Manifest

编辑 `src/app/manifest.ts` 来自定义应用名称、描述、主题色等。

### 修改 Service Worker

编辑 `public/sw.js` 来自定义通知行为和离线功能。

### 添加离线支持

考虑使用 [Serwist](https://github.com/serwist/serwist) 来添加离线缓存功能。

## 6. 故障排除

### Service Worker 未注册

- 确保 `public/sw.js` 文件存在
- 检查浏览器控制台是否有错误
- 确保应用通过 HTTPS 或 localhost 访问

### 推送通知不工作

- 检查 VAPID 密钥是否正确配置
- 确保浏览器允许通知权限
- 检查 Service Worker 是否正常运行
- 查看浏览器控制台的错误信息

### 安装提示不显示

- 确保 manifest.json 配置正确
- 确保应用通过 HTTPS 访问
- 检查浏览器是否支持 PWA 安装

## 7. 参考资源

- [Next.js PWA 文档](https://nextjs.org/docs/app/building-your-application/configuring/progressive-web-apps)
- [Web Push API](https://developer.mozilla.org/en-US/docs/Web/API/Push_API)
- [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest)
- [What PWA Can Do Today](https://whatpwacando.today/)

