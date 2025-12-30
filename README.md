# Draft UI

[![Documentation](https://img.shields.io/badge/docs-online-6366f1?style=flat-square)](https://preflower.github.io/draft-ui/) [![简体中文](https://img.shields.io/badge/lang-简体中文-334155?style=flat-square)](./README.zh-CN.md)

A shadcn/ui-inspired component library for Vue and React, built with pnpm monorepo.

## 🚀 Features

- **Monorepo**: Powered by pnpm workspaces.
- **Copy-Paste Architecture**: Components are imported directly into your project files (no `node_modules` bloating).
- **Multi-Framework**: First-class support for both **Vue 3** and **React**.
- **CLI Utility**: Easy component management with `draft-ui`.
- **shadcn/ui Compatible**: Reuses `components.json` for configuration.
- **Documentation**: Built-in VitePress docs with interactive examples.

## 📁 Structure

```text
.
├── apps
│   └── docs          # VitePress documentation
├── packages
│   ├── cli           # CLI tool (draft-vue / draft-react)
│   ├── react         # React component templates
│   └── vue           # Vue component templates
└── test-app          # Test workspace
```

## 🛠️ Getting Started

### Installation

```bash
pnpm install
pnpm build
```

### Usage

To use the CLI in your project:

```bash
# Initialize project
npx draft-ui init

# Add a component (Vue)
pnpm draft-vue add [component]

# Add a component (React)
pnpm draft-react add [component]
```

> Note: `draft-vue` and `draft-react` are provided as bin aliases in the `draft-ui` package.

## 📄 Configuration

Draft UI uses a `components.json` file in your project root to manage paths:

```json
{
  "style": "default",
  "aliases": {
    "components": "@/components",
    "ui": "@/components/ui"
  }
}
```

## 💻 Documentation

Online Documentation: [https://preflower.github.io/draft-ui/](https://preflower.github.io/draft-ui/)

Run the documentation site locally:

```bash
pnpm dev
```

## License

MIT
