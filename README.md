# Draft UI

A shadcn/ui-inspired component library for Vue and React, built with pnpm monorepo.

## 🚀 Features

- **Monorepo**: Powered by pnpm workspaces.
- **Copy-Paste Architecture**: Components are imported directly into your project files (no `node_modules` bloating).
- **Multi-Framework**: First-class support for both **Vue 3** and **React**.
- **CLI Utility**: Easy component management with `draft-vue` and `draft-react`.
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

### Usage (Local Debugging)

To use the CLI in your project during development:

1. **Initialize** your project:
   ```bash
   # In your test project directory
   pnpm draft-vue init
   ```

2. **Add** a component:
   ```bash
   pnpm draft-vue add button
   ```

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

Run the documentation site locally:

```bash
pnpm dev
```

## License

MIT
