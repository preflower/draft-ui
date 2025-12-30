import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{md,html,vue,js,ts,jsx,tsx}',
    '../../packages/vue/src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {}
  },
  plugins: []
}
export default config
