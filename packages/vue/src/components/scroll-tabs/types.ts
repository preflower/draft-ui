import type { Ref } from 'vue'

export interface Context {
  activeTab: Ref<string | undefined>
  registerContent: (value: string, el: HTMLElement | null) => void
  scrollTo: (value: string) => void
}
