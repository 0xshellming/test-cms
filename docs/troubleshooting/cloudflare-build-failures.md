# Cloudflare 构建失败排查指南

## 常见问题

### 1. `.open-next/worker.js` 文件未找到

**错误信息：**

```
✘ [ERROR] The entry-point file at ".open-next/worker.js" was not found.
```

**原因：**
部署命令配置错误，直接使用了 `npx wrangler versions upload` 而没有先执行 OpenNext 构建。

**解决方案：**
确保部署命令使用 `npm run deploy`，而不是直接调用 wrangler。

正确的部署命令会执行：

1. `deploy:database` - 数据库迁移
2. `deploy:app` - OpenNext 构建 + Cloudflare 部署

```bash
# ✅ 正确
npm run deploy

# ❌ 错误
npx wrangler versions upload
```

---

### 2. 数据库表不存在

**错误信息：**

```
D1_ERROR: no such table: topics: SQLITE_ERROR
D1_ERROR: no such table: book_summaries: SQLITE_ERROR
D1_ERROR: no such table: collections: SQLITE_ERROR
```

**原因：**
数据库迁移没有执行，或者迁移文件未包含新表的创建语句。

**解决方案：**

1. 确保部署命令包含 `deploy:database` 步骤
2. 检查 `src/migrations` 目录下是否有对应的迁移文件
3. 手动运行迁移（如果需要）：
   ```bash
   cross-env NODE_ENV=production PAYLOAD_SECRET=ignore payload migrate
   ```

---

### 3. Payload 初始化失败 - 缺少密钥

**错误信息：**

```
Error: missing secret key. A secret key is needed to secure Payload.
```

**原因：**
在构建时 SSG (Static Site Generation) 阶段尝试访问数据库，但 `PAYLOAD_SECRET` 环境变量未设置。

**解决方案：**
这通常不会导致构建失败，因为代码中应该有 try-catch 处理。如果构建失败，检查 `generateStaticParams` 函数中的错误处理。

---

## 构建流程对比

### ✅ 正确的构建流程

```
1. npm run build          # Next.js 构建
2. npm run deploy         # 包含以下步骤：
   ├── deploy:database    # payload migrate + PRAGMA optimize
   └── deploy:app         # opennextjs-cloudflare build && deploy
       ├── 生成 .open-next/worker.js
       └── wrangler 部署到 Cloudflare
```

### ❌ 错误的构建流程

```
1. npm run build                    # Next.js 构建
2. npx wrangler versions upload     # 直接部署
   └── ❌ 找不到 .open-next/worker.js
```

---

## 排查清单

当构建失败时，按以下顺序检查：

- [ ] **部署命令是否正确？** 应该是 `npm run deploy`
- [ ] **包管理器是否一致？** 推荐使用 pnpm
- [ ] **环境变量是否配置？** 检查 `CLOUDFLARE_ENV` 等变量
- [ ] **迁移文件是否存在？** 检查 `src/migrations` 目录
- [ ] **OpenNext 版本是否兼容？** 检查 `@opennextjs/cloudflare` 版本

---

## 相关文件

- `package.json` - 查看 `scripts.deploy` 命令定义
- `wrangler.jsonc` - Cloudflare Workers 配置
- `src/migrations/` - 数据库迁移文件
- `open-next.config.ts` - OpenNext 配置
