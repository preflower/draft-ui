<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'

import { cn } from '@/lib/utils'

import { useScrollTabs } from './useScrollTabs'

const props = defineProps<{ value: string, class?: HTMLAttributes['class'] }>()
const { currentTab, setCurrentTab } = useScrollTabs()

const isActive = computed(() => currentTab.value === props.value)
</script>

<template>
  <button
    role="tab"
    data-scroll-tabs-type="trigger"
    :data-state="isActive ? 'active' : 'inactive'"
    :class="cn(
      'flex-1 z-1 flex items-center justify-center gap-2 px-3 h-10 transition-colors text-sm font-semibold leading-5.5',
      props.class,
      isActive ? 'text-gray-50' : 'text-gray-800 hover:bg-gray-100 rounded-[6px]',
    )"
    @click="setCurrentTab(value)"
  >
    <slot />
  </button>
</template>
