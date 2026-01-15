<script setup lang="ts">
import { useScrollParent } from '@preflower/vue-use'
import { onMounted, useTemplateRef, watch } from 'vue'

import { useScrollTabs } from './useScrollTabs'

const el = useTemplateRef('el')
const scroller = useScrollParent(el)
const { setContainer, setScroller } = useScrollTabs()

watch(scroller, (val) => {
  if (val)
    setScroller(val)
}, { immediate: true })

onMounted(() => {
  if (el.value != null)
    setContainer(el.value)
})
</script>

<template>
  <div
    ref="el"
  >
    <slot />
  </div>
</template>
