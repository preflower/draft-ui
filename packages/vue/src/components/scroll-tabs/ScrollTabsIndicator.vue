<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { useEventListener } from '@vueuse/core'
import { nextTick, ref, useTemplateRef, watch } from 'vue'

import { cn } from '@/lib/utils'
import { useScrollTabs } from './useScrollTabs'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

interface IndicatorStyle {
  size: number | null
  position: number | null
}
const indicatorStyle = ref<IndicatorStyle>({
  size: null,
  position: null,
})

const target = useTemplateRef('target')
const { currentTab } = useScrollTabs()

watch(currentTab, () => {
  /**
   * Avoid DOM not update when currentTab is changed
   */
  nextTick(() => {
    updateIndicatorStyle()
  })
}, {
  immediate: true,
})

useEventListener(window, 'resize', () => {
  updateIndicatorStyle()
})

function updateIndicatorStyle() {
  if (target.value == null)
    return
  const parent = target.value.parentElement
  if (parent == null)
    return

  const active = parent.querySelector<HTMLButtonElement>('[data-scroll-tabs-type="trigger"][data-state="active"]')

  if (active == null)
    return

  indicatorStyle.value = {
    size: active.offsetWidth,
    position: active.offsetLeft,
  }
}
</script>

<template>
  <div
    ref="target"
    :class="cn(
      'absolute z-0 left-0 h-10 top-[3px] bg-gray-800 rounded-[6px] w-(--scroll-tabs-indicator-size) translate-x-(--scroll-tabs-indicator-position) translate-y-px transition-all duration-300',
      props.class,
    )"
    :style="{
      '--scroll-tabs-indicator-size': `${indicatorStyle.size}px`,
      '--scroll-tabs-indicator-position': `${indicatorStyle.position}px`,
    }"
  />
</template>
