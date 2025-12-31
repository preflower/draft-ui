# Draft UI

[![Documentation](https://img.shields.io/badge/docs-online-6366f1?style=flat-square)](https://preflower.github.io/draft-ui/) [![English](https://img.shields.io/badge/lang-English-334155?style=flat-square)](./README.md)

一个受 shadcn/ui 启发的 Vue 和 React 组件库，使用 pnpm monorepo 构建。

## 🚀 特性

- **Monorepo**: 由 pnpm workspaces 驱动。
- **复制粘贴架构**: 组件直接导入到您的项目文件中（无需安装笨重的 npm 包）。
- **多框架支持**: 原生支持 **Vue 3** 和 **React**。
- **CLI 工具**: 使用 `draft-cli` 轻松管理组件。
- **shadcn/ui 兼容**: 复用 `components.json` 进行配置。
- **文档**: 内置 VitePress 文档，包含交互式示例。

## 📁 目录结构

```text
.
├── apps
│   └── docs          # VitePress 文档
├── packages
│   ├── cli           # CLI 工具 (draft-cli)
│   ├── react         # React 组件模板
│   └── vue           # Vue 组件模板
└── test-app          # 测试工作区
```

## 🛠️ 快速开始

### 安装

```bash
pnpm install
pnpm build
```

### 使用方法

在项目中使用 CLI：

```bash
# 初始化项目
npx draft-cli init

# 添加组件 (Vue)
npx draft-cli vue add [component]

# 添加组件 (React)
npx draft-cli react add [component]
```

> 注意：`draft-cli` 是管理组件的统一入口。

## 📄 配置说明

Draft UI 使用项目根目录下的 `components.json` 来管理路径：

```json
{
  "style": "default",
  "aliases": {
    "components": "@/components",
    "ui": "@/components/ui"
  }
}
```

## 💻 文档

访问在线文档：[https://preflower.github.io/draft-ui/zh/](https://preflower.github.io/draft-ui/zh/)

本地运行文档：

```bash
pnpm dev
```

## 开源协议

MIT
