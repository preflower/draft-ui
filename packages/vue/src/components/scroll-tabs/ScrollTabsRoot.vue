<script setup lang="ts">
import { onMounted } from 'vue'

import { provideScrollTabs } from './useScrollTabs'

const props = defineProps<{
  offset?: number
  defaultValue?: string
}>()

const { currentTab } = provideScrollTabs({ offset: props.offset })

onMounted(() => {
  if (props.defaultValue != null)
    currentTab.value = props.defaultValue
})
</script>

<template>
  <slot />
</template>
