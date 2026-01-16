import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/bin/index.ts'],
  format: ['esm'],
  clean: true,
  dts: true,
  banner: {
    js: '#!/usr/bin/env node',
  },
})
