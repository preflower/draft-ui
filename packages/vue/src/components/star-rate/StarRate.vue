<template>
  <div class="inline-flex gap-0.5">
    <div
      v-for="i in count"
      :key="i"
      class="relative size-[1em]"
    >
      <!-- filled -->
      <div
        class="absolute inset-0 overflow-hidden"
        :style="{ width: computedFillWidth(i) + '%' }"
      >
        <Star
          class="size-[1em]"
          :stroke-width="strokeWidth"
          fill="currentColor"
          stroke="currentColor"
        />
      </div>
      <!-- empty -->
      <Star
        class="absolute inset-0 size-full"
        :stroke-width="strokeWidth"
        stroke="currentColor"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Star } from 'lucide-vue-next'

interface Props {
  value: string | number // 当前评分
  count?: number // 总星数
  strokeWidth?: number
}

const props = withDefaults(defineProps<Props>(), {
  count: 5,
  strokeWidth: 1.5,
  icon: Star
})

// 计算某一颗星星应填充的百分比
function computedFillWidth (i: number) {
  const diff = Number(props.value) - (i - 1)
  if (diff >= 1) return 100
  if (diff <= 0) return 0
  return Math.round(diff * 100)
}
</script>

<style scoped>
</style>
