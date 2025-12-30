# eslint-config-ted

My Eslint Rules

- Base on [Standard](https://github.com/standard/standard/blob/HEAD/docs/README-zhcn.md)
- Provide Typescript / Vue / React Support
- Provide JSON Support

## Usage

```bash
pnpm i -D eslint eslint-config-ted
```

Config `eslint.config.ts`

```ts
import { ted } from "eslint-config-ted"

export default ted(
  [
    /* your custom config */
  ],
  {
    // Default options
    typescript: true,
    vue: true,
    react: false,
  }
)
```

## Rules

### JS

- Follow with [eslint-config-standard](https://www.npmjs.com/package/eslint-config-standard)

### JSON

- Provide `JSON` file check
- Provide `package.json` and `tsconfig.json` sort

### TS

- Follow with [typescript-eslint:recommended](https://typescript-eslint.io/rules/?=recommended) and [typescript-eslint:stylistic](https://typescript-eslint.io/rules/?=stylistic)

### Vue

- Follow with [eslint-config-vue/vue3-strongly-recommended](https://eslint.vuejs.org/rules/#priority-b-strongly-recommended-improving-readability) rules
- Default open `vue/setup-compiler-macros` config

### React

- Follow with [eslint-config-react/recommended](https://www.npmjs.com/package/eslint-plugin-react#recommended) rules
- Hooks follow with [eslint-config-react-hooks/recommended](https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks) rules

## Known Issues

## License

MIT

Inspired by

- [@antfu/eslint-config](https://github.com/antfu/eslint-config)
- [eslint-config-alloy](https://github.com/AlloyTeam/eslint-config-alloy)
- [@sxzz/eslint-config](https://github.com/sxzz/eslint-config)
