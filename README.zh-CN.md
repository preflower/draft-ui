# Draft UI

[![Documentation](https://img.shields.io/badge/docs-online-6366f1?style=flat-square)](https://preflower.github.io/draft-ui/) [![English](https://img.shields.io/badge/lang-English-334155?style=flat-square)](./README.md)

一个受 shadcn/ui 启发的 Vue 和 React 组件库，使用 pnpm monorepo 构建。

## 🚀 特性

- **Monorepo**: 由 pnpm workspaces 驱动。
- **复制粘贴架构**: 组件直接导入到您的项目文件中（无需安装笨重的 npm 包）。
- **多框架支持**: 原生支持 **Vue 3** 和 **React**。
- **CLI 工具**: 使用 `draft-vue` 和 `draft-react` 轻松管理组件。
- **shadcn/ui 兼容**: 复用 `components.json` 进行配置。
- **文档**: 内置 VitePress 文档，包含交互式示例。

## 📁 目录结构

```text
.
├── apps
│   └── docs          # VitePress 文档
├── packages
│   ├── cli           # CLI 工具 (draft-vue / draft-react)
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

### 本地调试

开发时在项目中使用 CLI：

1. **初始化**项目：
   ```bash
   # 在您的测试项目目录中
   pnpm draft-vue init
   ```

2. **添加**组件：
   ```bash
   pnpm draft-vue add button
   ```

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

访问在线文档：[https://preflower.github.io/draft-ui/](https://preflower.github.io/draft-ui/)

本地运行文档：

```bash
pnpm dev
```

## 开源协议

MIT
