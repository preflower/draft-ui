import { resolve } from 'node:path'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vitepress'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  vite: {
    resolve: {
      alias: {
        '@': resolve(__dirname, '../../../../packages/vue/src'),
      },
    },
  },
  title: 'Draft UI',
  description: 'A shadcn-like component library for Vue and React',
  base: '/draft-ui/',

  locales: {
    root: {
      label: 'English',
      lang: 'en',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/' },
          { text: 'Vue', link: '/vue/flip-number' },
          { text: 'React', link: '/react/' },
        ],
        sidebar: {
          '/vue/': [
            {
              text: 'Introduction',
              items: [
                { text: 'What is Draft UI?', link: '/' },
                { text: 'Getting Started', link: '/getting-started' },
              ],
            },
            {
              text: 'Vue Components',
              items: [
                { text: 'Dotted Glow Background', link: '/vue/dotted-glow-background' },
                { text: 'Flip Number', link: '/vue/flip-number' },
                { text: 'Scroll Tabs', link: '/vue/scroll-tabs' },
                { text: 'Star Rate', link: '/vue/star-rate' },
              ],
            },
          ],
          '/react/': [
            {
              text: 'Introduction',
              items: [
                { text: 'What is Draft UI?', link: '/' },
                { text: 'Getting Started', link: '/getting-started' },
              ],
            },
            {
              text: 'React Components',
              items: [],
            },
          ],
          '/': [
            {
              text: 'Introduction',
              items: [
                { text: 'What is Draft UI?', link: '/' },
                { text: 'Getting Started', link: '/getting-started' },
              ],
            },
          ],
        },
        socialLinks: [
          { icon: 'github', link: 'https://github.com/preflower/draft-ui' },
        ],
      },
    },
    zh: {
      label: '简体中文',
      lang: 'zh-CN',
      themeConfig: {
        nav: [
          { text: '首页', link: '/zh/' },
          { text: 'Vue', link: '/zh/vue/flip-number' },
          { text: 'React', link: '/zh/react/' },
        ],
        sidebar: {
          '/zh/vue/': [
            {
              text: '介绍',
              items: [
                { text: '什么是 Draft UI？', link: '/zh/' },
                { text: '快速开始', link: '/zh/getting-started' },
              ],
            },
            {
              text: 'Vue 组件',
              items: [
                { text: 'Dotted Glow Background', link: '/zh/vue/dotted-glow-background' },
                { text: 'Flip Number', link: '/zh/vue/flip-number' },
                { text: 'Scroll Tabs', link: '/zh/vue/scroll-tabs' },
                { text: 'Star Rate', link: '/zh/vue/star-rate' },
              ],
            },
          ],
          '/zh/react/': [
            {
              text: '介绍',
              items: [
                { text: '什么是 Draft UI？', link: '/zh/' },
                { text: '快速开始', link: '/zh/getting-started' },
              ],
            },
            {
              text: 'React 组件',
              items: [],
            },
          ],
          '/zh/': [
            {
              text: '介绍',
              items: [
                { text: '什么是 Draft UI？', link: '/zh/' },
                { text: '快速开始', link: '/zh/getting-started' },
              ],
            },
          ],
        },
        socialLinks: [
          { icon: 'github', link: 'https://github.com/preflower/draft-ui' },
        ],
        outline: {
          label: '页面导航',
        },
        docFooter: {
          prev: '上一页',
          next: '下一页',
        },
        darkModeSwitchLabel: '主题',
        sidebarMenuLabel: '菜单',
        returnToTopLabel: '回到顶部',
      },
    },
  },
})
