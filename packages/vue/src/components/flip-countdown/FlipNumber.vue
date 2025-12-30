<template>
  <!-- 翻页数字容器 -->
  <div
    ref="flipNumber"
    class="flip-number"
  >
    <!-- 上半部分 - 显示下一个数字 -->
    <div
      class="flip-number__half flip-number__half--top"
      :style="{
        lineHeight: `${height}px`
      }"
    >
      {{ nextValue }}
    </div>
    <!-- 翻页动画层 -->
    <div
      class="flip-number__fold"
      :class="[
        isFlipping ? 'flip-number__fold--flipping' : 'flip-number__fold--end'
      ]"
    >
      <!-- 翻页前面 - 显示当前数字 -->
      <div
        class="flip-number__fold-side flip-number__fold-side--front"
        :style="{
          lineHeight: `${height}px`
        }"
      >
        {{ currentValue }}
      </div>
      <!-- 翻页背面 - 显示下一个数字 -->
      <div class="flip-number__fold-side flip-number__fold-side--back">
        {{ nextValue }}
      </div>
    </div>
    <!-- 下半部分 - 显示当前数字 -->
    <div class="flip-number__half flip-number__half--bottom">
      {{ currentValue }}
    </div>
  </div>
</template>
<script setup lang="ts">
import { useElementSize } from '@vueuse/core'
import { ref, watch } from 'vue'
interface Props {
  value: string
}
const props = defineProps<Props>()
const currentValue = ref(props.value)
const nextValue = ref(props.value)
const isFlipping = ref(false)
watch(() => props.value, (newValue) => {
  if (newValue !== currentValue.value) {
    // 设置下一个值
    nextValue.value = newValue
    // 触发翻页动画
    isFlipping.value = true
    // 动画结束后更新当前值
    setTimeout(() => {
      currentValue.value = newValue
      isFlipping.value = false
    }, 600)
  }
})
const flipNumber = ref<HTMLElement | null>(null)
const { height } = useElementSize(flipNumber)
</script>
<style>
@layer base {
  .flip-number {
    --flip-bg-color: #171717;
    --flip-text-color: #fff;
    --flip-font-size: 16px;
    --flip-top-border-radius: 6px 6px 0 0;
    --flip-bottom-border-radius: 0 0 6px 6px;
    --flip-duration: 0.6s;

    position: relative;
    display: inline-block;
    box-sizing: border-box;
  }
  .flip-number::before {
    z-index: 1;
    position: absolute;
    content: '';
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 100%;
    height: 1px;
    background-color: var(--flip-bg-color);
  }
  .flip-number__half {
    width: 100%;
    height: 50%;
    background-color: var(--flip-bg-color);
    overflow: hidden;
    font-size: var(--flip-font-size);
    color: var(--flip-text-color);
    text-align: center;
  }
  .flip-number__half--top {
    position: relative;
    border-radius: var(--flip-top-border-radius);
  }
  .flip-number__half--bottom {
    line-height: 0;
    border-radius: var(--flip-bottom-border-radius);
  }
  .flip-number__fold {
    position: absolute;
    top: 0;
    width: 100%;
    height: 50%;
    transform-style: preserve-3d;
    transform-origin: bottom;
  }
  .flip-number__fold--flipping {
    transition: transform var(--flip-duration) ease-in-out;
    transform: perspective(200px) rotateX(-180deg);
  }
  .flip-number__fold--end {
    transition: transform 0s;
    transform: perspective(200px) rotateX(0);
  }
  .flip-number__fold-side {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    overflow: hidden;
    font-size: var(--flip-font-size);
    color: var(--flip-text-color);
    text-align: center;
  }
  .flip-number__fold-side--front {
    background-color: var(--flip-bg-color);
    border-radius: var(--flip-top-border-radius);
  }
  .flip-number__fold-side--back {
    background-color: var(--flip-bg-color);
    transform: rotateX(0deg) rotateY(-180deg) scale(-1);
    line-height: 0;
    border-radius: var(--flip-bottom-border-radius);
  }
}
</style>
