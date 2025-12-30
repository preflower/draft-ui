# Draft UI

一个受 shadcn/ui 启发的 Vue 和 React 组件库，基于 pnpm monorepo 构建。

## 🚀 特性

- **Monorepo**: 基于 pnpm workspaces 管理。
- **源码导入架构**: 组件直接导入到你的项目文件中（拒绝 `node_modules` 臃肿）。
- **多框架支持**: 同时完美支持 **Vue 3** 和 **React**。
- **CLI 工具**: 通过 `draft-vue` 和 `draft-react` 轻松管理组件。
- **兼容 shadcn/ui**: 复用 `components.json` 配置文件。
- **交互式文档**: 基于 VitePress 的内置文档，包含组件预览示例。

## 📁 项目结构

```text
.
├── apps
│   └── docs          # VitePress 文档中心
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

### 使用方法 (本地调试)

在开发过程中，你可以按照以下步骤在项目中使用 CLI：

1. **初始化** 项目:
   ```bash
   # 在你的测试项目目录下运行
   pnpm draft-vue init
   ```

2. **添加** 组件:
   ```bash
   pnpm draft-vue add button
   ```

## 📄 配置说明

Draft UI 使用项目根目录下的 `components.json` 来管理路径配置：

```json
{
  "style": "default",
  "aliases": {
    "components": "@/components",
    "ui": "@/components/ui"
  }
}
```

## 💻 文档开发

在本地启动文档站点：

```bash
pnpm dev
```

## 开源协议

MIT
