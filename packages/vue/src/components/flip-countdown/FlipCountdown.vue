<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'

import FlipNumber from './FlipNumber.vue'

interface Props {
  time: number | Date
}
const props = defineProps<Props>()
const now = ref(Date.now())
let timer: ReturnType<typeof setInterval> | null = null
const remaining = computed(() => {
  const targetTime = typeof props.time === 'number' ? props.time : props.time.getTime()
  const diff = targetTime - now.value
  return diff > 0 ? diff : 0
})
const days = computed(() => {
  return String(Math.floor(remaining.value / (1000 * 60 * 60 * 24))).padStart(2, '0')
})
const hours = computed(() => {
  return String(Math.floor((remaining.value % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0')
})
const minutes = computed(() => {
  return String(Math.floor((remaining.value % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0')
})
const seconds = computed(() => {
  return String(Math.floor((remaining.value % (1000 * 60)) / 1000)).padStart(2, '0')
})
onMounted(() => {
  timer = setInterval(() => {
    now.value = Date.now()
  }, 1000)
})
onUnmounted(() => {
  if (timer !== null) {
    clearInterval(timer)
    timer = null
  }
})
</script>

<template>
  <div class="flex justify-center gap-2 md:gap-4 font-mono text-center">
    <div class="flex flex-col gap-1">
      <FlipNumber
        class="size-10"
        :value="days"
      />
      <div class="text-xs text-gray-400">
        DAYS
      </div>
    </div>
    <div class="flex flex-col gap-1">
      <FlipNumber
        class="size-10"
        :value="hours"
      />
      <div class="text-xs text-gray-400">
        HRS
      </div>
    </div>
    <div class="flex flex-col gap-1">
      <FlipNumber
        class="size-10"
        :value="minutes"
      />
      <div class="text-xs text-gray-400">
        MINS
      </div>
    </div>
    <div class="flex flex-col gap-1">
      <FlipNumber
        class="size-10"
        :value="seconds"
      />
      <div class="text-xs text-gray-400">
        SECS
      </div>
    </div>
  </div>
</template>
