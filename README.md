# WisePenView-Docs

WisePenView 与 WisePenView-Portal 的统一文档站，基于 Docusaurus 构建。

## 本地开发

```bash
pnpm install
pnpm start
```

启动后访问本地预览地址，编辑 `docs` 目录下的 MDX 文件即可实时刷新。

## 常用命令

```bash
pnpm typecheck
pnpm build
```

## 内容结构

- `docs/getting-started`：站点地图、本地开发。
- `docs/operations`：部署说明。
- `docs/contributing`：内容写作规范。

新增页面后，需要同步更新 `sidebars.ts`，并在发布前运行 `pnpm build`。
