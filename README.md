# Payload Cloudflare Template

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/payloadcms/payload/tree/main/templates/with-cloudflare-d1)

**This can only be deployed on Paid Workers right now due to size limits.** This template comes configured with the bare minimum to get started on anything you need.

## Quick start

This template can be deployed directly to Cloudflare Workers by clicking the button to take you to the setup screen.

From there you can connect your code to a git provider such Github or Gitlab, name your Workers, D1 Database and R2 Bucket as well as attach any additional environment variables or services you need.

## Quick Start - local setup

To spin up this template locally, follow these steps:

### Clone

After you click the `Deploy` button above, you'll want to have standalone copy of this repo on your machine. Cloudflare will connect your app to a git provider such as Github and you can access your code from there.

### Local Development

## How it works

Out of the box, using [`Wrangler`](https://developers.cloudflare.com/workers/wrangler/) will automatically create local bindings for you to connect to the remote services and it can even create a local mock of the services you're using with Cloudflare.

We've pre-configured Payload for you with the following:

### Collections

See the [Collections](https://payloadcms.com/docs/configuration/collections) docs for details on how to extend this functionality.

- #### Users (Authentication)

  Users are auth-enabled collections that have access to the admin panel.

  For additional help, see the official [Auth Example](https://github.com/payloadcms/payload/tree/main/examples/auth) or the [Authentication](https://payloadcms.com/docs/authentication/overview#authentication-overview) docs.

- #### Media

  This is the uploads enabled collection.

### Image Storage (R2)

Images will be served from an R2 bucket which you can then further configure to use a CDN to serve for your frontend directly.

### D1 Database

The Worker will have direct access to a D1 SQLite database which Wrangler can connect locally to, just note that you won't have a connection string as you would typically with other providers.

You can enable read replicas by adding `readReplicas: 'first-primary'` in the DB adapter and then enabling it on your D1 Cloudflare dashboard. Read more about this feature on [our docs](https://payloadcms.com/docs/database/sqlite#d1-read-replicas).

## Working with Cloudflare

Firstly, after installing dependencies locally you need to authenticate with Wrangler by running:

```bash
pnpm wrangler login
```

This will take you to Cloudflare to login and then you can use the Wrangler CLI locally for anything, use `pnpm wrangler help` to see all available options.

Wrangler is pretty smart so it will automatically bind your services for local development just by running `pnpm dev`.

## Deployments

### 构建流程概览

```
┌─────────────────────────────────────────────────────────────────────┐
│                        完整构建部署流程                               │
├─────────────────────────────────────────────────────────────────────┤
│  1. npm run build                                                   │
│     └── Next.js 编译，生成 .next 目录                                │
│                                                                     │
│  2. npm run deploy                                                  │
│     ├── deploy:database                                             │
│     │   ├── payload migrate          # 执行数据库迁移                │
│     │   └── wrangler d1 execute      # 优化数据库                    │
│     │                                                               │
│     └── deploy:app                                                  │
│         ├── opennextjs-cloudflare build                             │
│         │   └── 生成 .open-next/worker.js                           │
│         └── opennextjs-cloudflare deploy                            │
│             └── 部署到 Cloudflare Workers                           │
└─────────────────────────────────────────────────────────────────────┘
```

### 本地部署

1. **创建数据库迁移**（如果有 schema 变更）：

```bash
pnpm payload migrate:create
```

2. **执行部署**：

```bash
pnpm run deploy
```

这个命令会依次执行：

- 数据库迁移
- OpenNext 构建（生成 `.open-next/worker.js`）
- Cloudflare Workers 部署

### CI/CD 部署 (Cloudflare Pages)

在 Cloudflare Pages 或其他 CI 平台配置时：

#### main 分支（生产环境）

| 配置项         | 值               |
| -------------- | ---------------- |
| Build command  | `npm run build`  |
| Deploy command | `npm run deploy` |

#### 非 main 分支（Preview 环境）

| 配置项         | 值                       |
| -------------- | ------------------------ |
| Build command  | `npm run build`          |
| Deploy command | `npm run deploy:preview` |

> ⚠️ **重要**：
>
> - **生产部署**使用 `npm run deploy`，会执行完整部署流程
> - **Preview 部署**使用 `npm run deploy:preview`，只上传版本不激活到生产
> - 不要直接使用 `npx wrangler versions upload`，否则会因为缺少 `.open-next/worker.js` 文件而失败

### 常见问题

如果构建失败，请参考 [Cloudflare 构建失败排查指南](./docs/troubleshooting/cloudflare-build-failures.md)。

## Enabling logs

By default logs are not enabled for your API, we've made this decision because it does run against your quota so we've left it opt-in. But you can easily enable logs in one click in the Cloudflare panel, [see docs](https://developers.cloudflare.com/workers/observability/logs/workers-logs/#enable-workers-logs).

## Known issues

### GraphQL

We are currently waiting on some issues with GraphQL to be [fixed upstream in Workers](https://github.com/cloudflare/workerd/issues/5175) so full support for GraphQL is not currently guaranteed when deployed.

### Worker size limits

We currently recommend deploying this template to the Paid Workers plan due to bundle [size limits](https://developers.cloudflare.com/workers/platform/limits/#worker-size) of 3mb. We're actively trying to reduce our bundle footprint over time to better meet this metric.

This also applies to your own code, in the case of importing a lot of libraries you may find yourself limited by the bundle.

## Questions

If you have any issues or questions, reach out to us on [Discord](https://discord.com/invite/payload) or start a [GitHub discussion](https://github.com/payloadcms/payload/discussions).
