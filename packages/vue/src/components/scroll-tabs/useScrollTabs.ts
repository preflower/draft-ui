import type { Ref } from 'vue'
import { useEventListener } from '@vueuse/core'
import { inject, provide, ref } from 'vue'

export interface ScrollTabsContext {
  lockScroll: Ref<boolean>
  currentTab: Ref<string | null>
  setCurrentTab: (value: string) => void
  setContainer: (el: Element) => void
  setScroller: (el: Element | Window) => void
  offset?: number
}

const ScrollTabsSymbol = Symbol('ScrollTabs')

export function provideScrollTabs(options?: { offset?: number }) {
  const currentTab = ref<string | null>(null)
  const containerRef = ref<Element | null>(null)
  const scrollerRef = ref<Element | Window | null>(null)
  const offset = options?.offset ?? 16

  const lockScroll = ref(false)

  const getRect = (el: Element | Window) => {
    if (el instanceof Window) {
      return { top: 0, height: window.innerHeight, scrollHeight: document.documentElement.scrollHeight }
    }
    const rect = el.getBoundingClientRect()
    return { top: rect.top, height: el.clientHeight, scrollHeight: el.scrollHeight }
  }

  const getScrollTop = (el: Element | Window) => {
    return el instanceof Window ? window.scrollY : el.scrollTop
  }

  const scrollToValue = (value: string) => {
    const container = containerRef.value
    const scroller = scrollerRef.value ?? container
    if (!container || !scroller)
      return

    const el = container.querySelector<Element>(`[data-scroll-tabs-value="${value}"]`)

    if (!el)
      return

    let top = 0

    if (scroller instanceof Window) {
      const elRect = el.getBoundingClientRect()
      top = window.scrollY + elRect.top - offset
    }
    else {
      const scrollerRect = (scroller as Element).getBoundingClientRect()
      const elRect = el.getBoundingClientRect()
      top = (scroller as Element).scrollTop + (elRect.top - scrollerRect.top) - offset
    }

    const onScrollEnd = () => {
      lockScroll.value = false
      scroller.removeEventListener('scrollend', onScrollEnd)
    }

    scroller.addEventListener('scrollend', onScrollEnd)

    scroller.scrollTo({ top, behavior: 'smooth' })
  }

  const handleScroll = () => {
    const container = containerRef.value
    const scroller = scrollerRef.value ?? container

    if (!container || !scroller)
      return
    if (lockScroll.value)
      return

    const scrollTop = getScrollTop(scroller)
    const { height: clientHeight, scrollHeight } = getRect(scroller)

    // Calculate offset relative to the container if scroller is not the container itself
    let relativeScrollTop = scrollTop
    if (scroller !== container) {
      const containerRect = container.getBoundingClientRect()
      const scrollerRect = getRect(scroller)

      relativeScrollTop = (scrollerRect.top - containerRect.top)

      if (relativeScrollTop < 0)
        relativeScrollTop = 0
    }
    else {
      relativeScrollTop = (container as Element).scrollTop
    }

    const contents = container.querySelectorAll<HTMLElement>('[data-scroll-tabs-type="content"]')

    const getCurrentIndexOnScroll = () => {
      // If scrolled to bottom
      if (scrollTop + clientHeight >= scrollHeight - 1) {
        // Logic for bottom reached
        return contents.length - 1
      }

      let offset = relativeScrollTop

      for (let i = 0; i < contents.length; i++) {
        const h = contents[i]!.clientHeight

        if (offset >= h) {
          offset -= h
          continue
        }

        return i
      }

      return contents.length - 1
    }

    const index = getCurrentIndexOnScroll()
    const current = contents[index]?.dataset.scrollTabsValue

    if (current != null && current !== currentTab.value)
      currentTab.value = current
  }

  useEventListener(scrollerRef, 'scroll', handleScroll)

  const ctx: ScrollTabsContext = {
    lockScroll,
    currentTab,
    setCurrentTab: (value) => {
      lockScroll.value = true
      currentTab.value = value
      scrollToValue(value)
    },
    setContainer: el => (containerRef.value = el),
    setScroller: el => (scrollerRef.value = el),
    offset,
  }

  provide(ScrollTabsSymbol, ctx)
  return ctx
}

export function useScrollTabs() {
  const ctx = inject<ScrollTabsContext>(ScrollTabsSymbol)
  if (!ctx)
    throw new Error('useScrollTabs must be used within ScrollTabsRoot')
  return ctx
}
