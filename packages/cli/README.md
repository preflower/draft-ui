# Draft UI CLI

[![Documentation](https://img.shields.io/badge/docs-online-6366f1?style=flat-square)](https://preflower.github.io/draft-ui/)

A command-line tool for adding components to your Vue and React projects. Inspired by [shadcn/ui](https://ui.shadcn.com/).

## Documentation

For full documentation, visit [preflower.github.io/draft-ui](https://preflower.github.io/draft-ui/).

## Installation

You can install the CLI globally or use it with your favorite package manager:

```bash
# Global installation
npm install -g draft-cli
# or
pnpm add -g draft-cli

# Or use it directly without installation
pnpm dlx draft-cli init
npx draft-cli init
```

## Usage

The CLI provides a unified entry point `draft-cli` for all operations.

### Initialize

Initialize your project and create a `components.json` file:

```bash
draft-cli init
```

### Add Components

Add a component to your project:

```bash
# For Vue
draft-cli vue add button

# For React
draft-cli react add button
```

## Configuration

The CLI uses a `components.json` file in your project root to manage paths and settings.

### Schema

```json
{
  "style": "default",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "src/index.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "draft": "@/components/draft"
  }
}
```

## Credits

This project is heavily inspired by [shadcn/ui](https://ui.shadcn.com/).

## License

MIT
