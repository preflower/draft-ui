import type { App } from 'vue'
import { DottedGlowBackground, FlipCountdown, FlipNumber, StarRate } from '@draft-ui/vue'
import DefaultTheme from 'vitepress/theme'
import ScrollTabsDemo from '../../components/demo/ScrollTabsDemo.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }: { app: App }) {
    // Register the component globally for use in markdown
    app.component('DraftDottedGlowBackground', DottedGlowBackground)
    app.component('DraftFlipCountdown', FlipCountdown)
    app.component('DraftFlipNumber', FlipNumber)
    app.component('DraftStarRate', StarRate)
    app.component('DraftScrollTabsDemo', ScrollTabsDemo)
  },
}
