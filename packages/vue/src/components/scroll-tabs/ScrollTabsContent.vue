<script setup lang="ts">
defineProps<{ value: string }>()
</script>

<template>
  <div
    role="tabpanel"
    data-scroll-tabs-type="content"
    :data-scroll-tabs-value="value"
  >
    <slot />
  </div>
</template>
