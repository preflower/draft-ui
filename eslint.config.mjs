import antfu from '@antfu/eslint-config'

export default antfu({
  typescript: true,
  vue: true,
  react: {
    files: [
      'apps/docs/src/react/**/*.{js,jsx,ts,tsx}',
      'packages/react/**/*.{js,jsx,ts,tsx}',
    ],
  },
  ignores: [
    '**/dist',
    '**/node_modules',
    '**/coverage',
    '**/.vitepress/cache',
    '**/.vitepress/dist',
    '**/test-app/',
  ],
}, {
  files: ['packages/cli/**/*.ts'],
  rules: {
    'node/prefer-global/process': 'off',
  },
})
